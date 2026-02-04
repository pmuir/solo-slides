import { google } from "googleapis";
import * as fs from "node:fs";
import * as path from "node:path";
import { exec } from "node:child_process";
import { promisify } from "node:util";
import { fileURLToPath } from "node:url";
import { getGoogleAuth, isGoogleAuthConfigured } from "../lib/google-auth.js";

const execAsync = promisify(exec);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "../../../");

interface ExportToGoogleSlidesArgs {
  deckName: string;
  title?: string;
  folderId?: string;
}

/**
 * Export a Slidev deck to Google Slides
 * 
 * This tool:
 * 1. Exports the deck to PPTX format using Slidev
 * 2. Uploads the PPTX to Google Drive
 * 3. Converts it to Google Slides format
 * 4. Returns the Google Slides URL
 */
export async function exportToGoogleSlides(
  args: ExportToGoogleSlidesArgs
): Promise<string> {
  const { deckName, title, folderId } = args;

  // Check if Google OAuth is configured
  if (!isGoogleAuthConfigured()) {
    throw new Error(
      "Google OAuth not configured.\n\n" +
      "To enable Google Slides export:\n" +
      "1. Go to https://console.cloud.google.com/apis/credentials\n" +
      "2. Create an OAuth 2.0 Client ID (Desktop app type)\n" +
      "3. Add GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET to your .env file\n" +
      "4. Enable the Google Drive API at https://console.cloud.google.com/apis/library/drive.googleapis.com"
    );
  }

  // Verify the deck exists
  const deckPath = path.join(REPO_ROOT, "decks", deckName);
  if (!fs.existsSync(deckPath)) {
    throw new Error(
      `Deck "${deckName}" not found. Available decks are in the decks/ directory.`
    );
  }

  // Create temp directory for export
  const tempDir = path.join(REPO_ROOT, ".temp-export");
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
  }

  const pptxFilename = `${deckName}.pptx`;
  const pptxPath = path.join(tempDir, pptxFilename);

  try {
    // Step 1: Export to PPTX using Slidev
    console.error(`Exporting ${deckName} to PPTX...`);
    
    // Check if playwright-chromium is available
    try {
      await execAsync("npx playwright-chromium --version", { cwd: deckPath });
    } catch {
      // Install playwright-chromium if not available
      console.error("Installing playwright-chromium for export...");
      await execAsync("pnpm add -D playwright-chromium", { cwd: deckPath });
    }

    // Run Slidev export
    const exportCommand = `npx slidev export --format pptx --output "${pptxPath}"`;
    const { stdout, stderr } = await execAsync(exportCommand, { 
      cwd: deckPath,
      timeout: 120000, // 2 minute timeout for export
    });
    
    if (stderr && !stderr.includes("warn")) {
      console.error("Export stderr:", stderr);
    }

    if (!fs.existsSync(pptxPath)) {
      throw new Error("PPTX export failed - file was not created");
    }

    console.error(`PPTX exported to ${pptxPath}`);

    // Step 2: Authenticate with Google
    console.error("Authenticating with Google...");
    const auth = await getGoogleAuth();
    const drive = google.drive({ version: "v3", auth });

    // Step 3: Upload to Google Drive with conversion to Google Slides
    console.error("Uploading to Google Drive...");
    
    const slideTitle = title || `${deckName} - Solo Slides Export`;
    
    const fileMetadata: {
      name: string;
      mimeType: string;
      parents?: string[];
    } = {
      name: slideTitle,
      mimeType: "application/vnd.google-apps.presentation", // This triggers conversion
    };

    // Optionally put in a specific folder
    if (folderId) {
      fileMetadata.parents = [folderId];
    }

    const media = {
      mimeType: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      body: fs.createReadStream(pptxPath),
    };

    const response = await drive.files.create({
      requestBody: fileMetadata,
      media: media,
      fields: "id, webViewLink",
    });

    const fileId = response.data.id;
    const webViewLink = response.data.webViewLink;

    // Step 4: Clean up temp file
    fs.unlinkSync(pptxPath);
    
    // Try to remove temp dir if empty
    try {
      fs.rmdirSync(tempDir);
    } catch {
      // Directory not empty, leave it
    }

    console.error(`Successfully exported to Google Slides!`);

    return (
      `Successfully exported "${deckName}" to Google Slides!\n\n` +
      `📊 Title: ${slideTitle}\n` +
      `🔗 View: ${webViewLink}\n` +
      `📁 File ID: ${fileId}\n\n` +
      `Note: The slides are exported as images, so text is not editable.`
    );
  } catch (error) {
    // Clean up on error
    if (fs.existsSync(pptxPath)) {
      fs.unlinkSync(pptxPath);
    }

    if (error instanceof Error) {
      throw new Error(`Failed to export to Google Slides: ${error.message}`);
    }
    throw error;
  }
}
