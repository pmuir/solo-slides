import { GoogleGenAI } from "@google/genai";
import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "../../../");

// Slide background color from theme - used for seamless blending
const SLIDE_BG_COLOR = { r: 26, g: 31, b: 46 }; // #1a1f2e

// Color distance threshold for background replacement
const COLOR_TOLERANCE = 60;

function colorDistance(r1: number, g1: number, b1: number, r2: number, g2: number, b2: number): number {
  return Math.sqrt((r1 - r2) ** 2 + (g1 - g2) ** 2 + (b1 - b2) ** 2);
}

async function replaceBackground(inputBuffer: Buffer): Promise<Buffer> {
  const image = sharp(inputBuffer);
  const { width, height, channels } = await image.metadata();
  
  if (!width || !height) {
    throw new Error("Could not get image dimensions");
  }

  // Get raw pixel data
  const { data, info } = await image
    .raw()
    .toBuffer({ resolveWithObject: true });

  // Sample corners to detect background color (average of corner pixels)
  const cornerSamples: { r: number; g: number; b: number }[] = [];
  const sampleSize = 5; // Sample 5x5 pixels from each corner
  
  for (let dy = 0; dy < sampleSize; dy++) {
    for (let dx = 0; dx < sampleSize; dx++) {
      // Top-left
      let idx = (dy * info.width + dx) * info.channels;
      cornerSamples.push({ r: data[idx], g: data[idx + 1], b: data[idx + 2] });
      
      // Top-right
      idx = (dy * info.width + (info.width - 1 - dx)) * info.channels;
      cornerSamples.push({ r: data[idx], g: data[idx + 1], b: data[idx + 2] });
      
      // Bottom-left
      idx = ((info.height - 1 - dy) * info.width + dx) * info.channels;
      cornerSamples.push({ r: data[idx], g: data[idx + 1], b: data[idx + 2] });
      
      // Bottom-right
      idx = ((info.height - 1 - dy) * info.width + (info.width - 1 - dx)) * info.channels;
      cornerSamples.push({ r: data[idx], g: data[idx + 1], b: data[idx + 2] });
    }
  }

  // Calculate average background color from corners
  const avgBg = {
    r: Math.round(cornerSamples.reduce((sum, c) => sum + c.r, 0) / cornerSamples.length),
    g: Math.round(cornerSamples.reduce((sum, c) => sum + c.g, 0) / cornerSamples.length),
    b: Math.round(cornerSamples.reduce((sum, c) => sum + c.b, 0) / cornerSamples.length),
  };

  // Replace pixels similar to detected background with target background
  const newData = Buffer.from(data);
  for (let i = 0; i < data.length; i += info.channels) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    
    if (colorDistance(r, g, b, avgBg.r, avgBg.g, avgBg.b) < COLOR_TOLERANCE) {
      newData[i] = SLIDE_BG_COLOR.r;
      newData[i + 1] = SLIDE_BG_COLOR.g;
      newData[i + 2] = SLIDE_BG_COLOR.b;
    }
  }

  // Reconstruct image
  return sharp(newData, {
    raw: {
      width: info.width,
      height: info.height,
      channels: info.channels,
    },
  })
    .png()
    .toBuffer();
}

interface GenerateImageArgs {
  prompt: string;
  deckName: string;
  filename: string;
  style?: string;
  referenceImagePath?: string;
}

export async function generateSlideImage(
  args: GenerateImageArgs
): Promise<string> {
  const { prompt, deckName, filename, style, referenceImagePath } = args;

  const apiKey = process.env.GOOGLE_API_KEY;
  if (!apiKey) {
    throw new Error(
      "GOOGLE_API_KEY not found. Please set it in the .env file in the repo root."
    );
  }

  // Construct the output path
  const deckPath = path.join(REPO_ROOT, "decks", deckName);
  const publicPath = path.join(deckPath, "public");
  const outputPath = path.join(publicPath, filename);

  // Verify the deck exists
  if (!fs.existsSync(deckPath)) {
    throw new Error(
      `Deck "${deckName}" not found. Available decks are in the decks/ directory.`
    );
  }

  // Create public directory if it doesn't exist
  if (!fs.existsSync(publicPath)) {
    fs.mkdirSync(publicPath, { recursive: true });
  }

  // Build the full prompt with style hints
  let fullPrompt = prompt;
  if (style) {
    fullPrompt = `${prompt}. Style: ${style}`;
  }

  // Request a solid, uniform background (easier to detect and replace)
  fullPrompt = `${fullPrompt}. Use a solid, uniform dark background color with no gradients or patterns. The background should be a single flat color.`;

  try {
    const ai = new GoogleGenAI({ apiKey });
    
    // Build contents - either text-only or with reference image
    let contents: Parameters<typeof ai.models.generateContent>[0]["contents"];
    
    if (referenceImagePath) {
      // Load the reference image
      const fullRefPath = path.join(REPO_ROOT, referenceImagePath);
      if (!fs.existsSync(fullRefPath)) {
        throw new Error(`Reference image not found: ${referenceImagePath}`);
      }
      
      const imageBuffer = fs.readFileSync(fullRefPath);
      const base64Image = imageBuffer.toString("base64");
      
      // Determine mime type from extension
      const ext = path.extname(referenceImagePath).toLowerCase();
      const mimeTypes: Record<string, string> = {
        ".png": "image/png",
        ".jpg": "image/jpeg",
        ".jpeg": "image/jpeg",
        ".gif": "image/gif",
        ".webp": "image/webp",
      };
      const mimeType = mimeTypes[ext] || "image/png";
      
      // Include reference image with the prompt
      contents = [
        {
          role: "user",
          parts: [
            {
              inlineData: {
                mimeType,
                data: base64Image,
              },
            },
            {
              text: `This is a screenshot of the current slide. Generate an image that will complement this slide: ${fullPrompt}`,
            },
          ],
        },
      ];
    } else {
      contents = fullPrompt;
    }
    
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-image",
      contents,
    });

    // Extract the image from the response
    const candidate = response.candidates?.[0];
    if (!candidate?.content?.parts) {
      throw new Error("No image generated in response");
    }

    for (const part of candidate.content.parts) {
      if ("inlineData" in part && part.inlineData) {
        const imageData = part.inlineData.data;
        if (!imageData) {
          throw new Error("Image data is empty");
        }
        const rawBuffer = Buffer.from(imageData, "base64");
        
        // Post-process to replace background with exact slide background color
        const processedBuffer = await replaceBackground(rawBuffer);
        fs.writeFileSync(outputPath, processedBuffer);

        return `Image saved to ${path.relative(REPO_ROOT, outputPath)}\n\nTo use in your slides:\n![${filename}](/${filename})`;
      }
    }

    throw new Error("No image data found in response");
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to generate image: ${error.message}`);
    }
    throw error;
  }
}
