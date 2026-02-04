import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "../../../");

interface ListImagesArgs {
  deckName: string;
}

const IMAGE_EXTENSIONS = [".png", ".jpg", ".jpeg", ".gif", ".webp", ".svg"];

export async function listDeckImages(args: ListImagesArgs): Promise<string> {
  const { deckName } = args;

  const deckPath = path.join(REPO_ROOT, "decks", deckName);
  const publicPath = path.join(deckPath, "public");

  // Verify the deck exists
  if (!fs.existsSync(deckPath)) {
    throw new Error(
      `Deck "${deckName}" not found. Available decks are in the decks/ directory.`
    );
  }

  // Check if public directory exists
  if (!fs.existsSync(publicPath)) {
    return `No public folder found for deck "${deckName}". Create one with images to list them.`;
  }

  // List all image files
  const files = fs.readdirSync(publicPath);
  const images = files.filter((file) => {
    const ext = path.extname(file).toLowerCase();
    return IMAGE_EXTENSIONS.includes(ext);
  });

  if (images.length === 0) {
    return `No images found in decks/${deckName}/public/`;
  }

  // Get file sizes and build the response
  const imageInfo = images.map((image) => {
    const imagePath = path.join(publicPath, image);
    const stats = fs.statSync(imagePath);
    const sizeKB = Math.round(stats.size / 1024);
    return `- ${image} (${sizeKB} KB)`;
  });

  return `Images in decks/${deckName}/public/:\n\n${imageInfo.join("\n")}\n\nTo use in slides: ![alt text](/${images[0]})`;
}
