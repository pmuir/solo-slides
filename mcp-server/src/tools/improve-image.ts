import { GoogleGenAI } from "@google/genai";
import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "../../../");

interface ImproveImageArgs {
  imagePath: string;
  modifications: string;
  outputFilename?: string;
}

export async function improveSlideImage(
  args: ImproveImageArgs
): Promise<string> {
  const { imagePath, modifications, outputFilename } = args;

  const apiKey = process.env.GOOGLE_API_KEY;
  if (!apiKey) {
    throw new Error(
      "GOOGLE_API_KEY not found. Please set it in the .env file in the repo root."
    );
  }

  const fullImagePath = path.join(REPO_ROOT, imagePath);

  // Verify the image exists
  if (!fs.existsSync(fullImagePath)) {
    throw new Error(`Image not found: ${imagePath}`);
  }

  // Read the existing image
  const imageBuffer = fs.readFileSync(fullImagePath);
  const base64Image = imageBuffer.toString("base64");

  // Determine the mime type from the extension
  const ext = path.extname(imagePath).toLowerCase();
  const mimeTypes: Record<string, string> = {
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".gif": "image/gif",
    ".webp": "image/webp",
  };
  const mimeType = mimeTypes[ext] || "image/png";

  // Determine output path
  const outputPath = outputFilename
    ? path.join(path.dirname(fullImagePath), outputFilename)
    : fullImagePath;

  // Build the prompt
  const prompt = `Based on this image, create a new version with these modifications: ${modifications}. The image should be suitable for a presentation slide.`;

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-image",
      contents: [
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
              text: prompt,
            },
          ],
        },
      ],
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
        const buffer = Buffer.from(imageData, "base64");
        fs.writeFileSync(outputPath, buffer);

        const relativePath = path.relative(REPO_ROOT, outputPath);
        return `Improved image saved to ${relativePath}`;
      }
    }

    throw new Error("No image data found in response");
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to improve image: ${error.message}`);
    }
    throw error;
  }
}
