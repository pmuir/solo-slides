#!/usr/bin/env node
/**
 * CLI script to export a Slidev deck to Google Slides
 * 
 * Usage: npx tsx src/export-google-slides.ts <deck-name> [--title "Custom Title"] [--folder-id <id>]
 */

import { config } from "dotenv";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

// Load .env from the repo root
const __dirname = dirname(fileURLToPath(import.meta.url));
config({ path: resolve(__dirname, "../../.env") });

import { google } from "googleapis";
import * as fs from "node:fs";
import * as path from "node:path";
import { exec } from "node:child_process";
import { promisify } from "node:util";
import { getGoogleAuth, isGoogleAuthConfigured } from "./lib/google-auth.js";

const execAsync = promisify(exec);
const REPO_ROOT = resolve(__dirname, "../../");

interface ExportOptions {
  deckName: string;
  title?: string;
  folderId?: string;
}

function parseArgs(): ExportOptions {
  const args = process.argv.slice(2);
  
  if (args.length === 0 || args[0] === "--help" || args[0] === "-h") {
    console.log(`
Usage: make google-slides DECK=<deck-name> [TITLE="Custom Title"] [FOLDER_ID=<id>]

Export a Slidev deck to Google Slides.

Arguments:
  DECK        Name of the deck (folder name in decks/)
  TITLE       Optional title for the Google Slides presentation
  FOLDER_ID   Optional Google Drive folder ID to save the presentation in

Examples:
  make google-slides DECK=sample
  make google-slides DECK=sample TITLE="Q1 Review 2025"

Setup:
  1. Create OAuth credentials at https://console.cloud.google.com/apis/credentials
  2. Enable Google Drive API at https://console.cloud.google.com/apis/library/drive.googleapis.com
  3. Add to .env:
     GOOGLE_CLIENT_ID=your_client_id
     GOOGLE_CLIENT_SECRET=your_client_secret
`);
    process.exit(0);
  }

  const options: ExportOptions = {
    deckName: args[0],
  };

  for (let i = 1; i < args.length; i++) {
    if (args[i] === "--title" && args[i + 1]) {
      options.title = args[++i];
    } else if (args[i] === "--folder-id" && args[i + 1]) {
      options.folderId = args[++i];
    }
  }

  return options;
}

async function exportToGoogleSlides(options: ExportOptions): Promise<void> {
  const { deckName, title, folderId } = options;

  // Check if Google OAuth is configured
  if (!isGoogleAuthConfigured()) {
    console.error(`
❌ Google OAuth not configured.

To enable Google Slides export:
1. Go to https://console.cloud.google.com/apis/credentials
2. Create an OAuth 2.0 Client ID (Desktop app type)
3. Enable the Google Drive API at https://console.cloud.google.com/apis/library/drive.googleapis.com
4. Add GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET to your .env file
`);
    process.exit(1);
  }

  // Verify the deck exists
  const deckPath = path.join(REPO_ROOT, "decks", deckName);
  if (!fs.existsSync(deckPath)) {
    console.error(`❌ Deck "${deckName}" not found.`);
    console.error(`Available decks:`);
    const decks = fs.readdirSync(path.join(REPO_ROOT, "decks"));
    decks.forEach(d => console.error(`  - ${d}`));
    process.exit(1);
  }

  // Slidev exports to slides-export.pptx by default (based on slides.md filename)
  const pptxPath = path.join(deckPath, "slides-export.pptx");

  try {
    // Step 1: Export to PPTX using Slidev
    console.log(`📊 Exporting ${deckName} to PPTX...`);
    
    // Let Slidev use its default output name to avoid path issues
    const exportCommand = `pnpm exec slidev export --format pptx`;
    try {
      const { stdout, stderr } = await execAsync(exportCommand, { 
        cwd: deckPath,
        timeout: 180000, // 3 minute timeout for export
      });
      if (stderr && !stderr.includes("WARN")) {
        console.error("Export stderr:", stderr);
      }
    } catch (error: unknown) {
      const execError = error as { stderr?: string; stdout?: string; message?: string };
      if (execError.message?.includes("playwright") || execError.stderr?.includes("playwright")) {
        console.error("⚠️  playwright-chromium is required for PPTX export.");
        console.error("Installing it now...");
        await execAsync("pnpm add -D playwright-chromium", { cwd: deckPath });
        await execAsync(exportCommand, { cwd: deckPath, timeout: 180000 });
      } else {
        // Log the actual error details
        if (execError.stderr) console.error("stderr:", execError.stderr);
        if (execError.stdout) console.error("stdout:", execError.stdout);
        throw error;
      }
    }

    if (!fs.existsSync(pptxPath)) {
      throw new Error("PPTX export failed - file was not created");
    }

    console.log(`✅ PPTX exported successfully`);

    // Step 2: Authenticate with Google
    console.log(`🔐 Authenticating with Google...`);
    const auth = await getGoogleAuth();
    const drive = google.drive({ version: "v3", auth });

    // Step 3: Upload to Google Drive with conversion to Google Slides
    console.log(`☁️  Uploading to Google Drive...`);
    
    const slideTitle = title || `${deckName} - Solo Slides Export`;
    
    const fileMetadata: {
      name: string;
      mimeType: string;
      parents?: string[];
    } = {
      name: slideTitle,
      mimeType: "application/vnd.google-apps.presentation", // Triggers conversion
    };

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

    // Step 4: Clean up export file
    try {
      fs.unlinkSync(pptxPath);
    } catch {
      // Ignore cleanup errors
    }

    console.log(`
✅ Successfully exported to Google Slides!

📊 Title: ${slideTitle}
🔗 View:  ${webViewLink}
📁 ID:    ${fileId}

Note: Slides are exported as images (text is not editable).
`);

    // Explicitly exit - Google API keeps connections open otherwise
    process.exit(0);

  } catch (error) {
    // Clean up on error (don't let cleanup failure hide the real error)
    try {
      if (fs.existsSync(pptxPath)) {
        fs.unlinkSync(pptxPath);
      }
    } catch {
      // Ignore cleanup errors
    }

    if (error instanceof Error) {
      console.error(`❌ Export failed: ${error.message}`);
    } else {
      console.error(`❌ Export failed:`, error);
    }
    process.exit(1);
  }
}

// Run the export
const options = parseArgs();
exportToGoogleSlides(options);
