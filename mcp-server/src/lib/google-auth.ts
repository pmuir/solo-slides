import { google, Auth } from "googleapis";
import * as fs from "node:fs";
import * as path from "node:path";
import * as http from "node:http";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "../../../");

// Token storage path
const TOKEN_PATH = path.join(REPO_ROOT, ".google-token.json");

// Scopes required for Google Drive file upload
const SCOPES = ["https://www.googleapis.com/auth/drive.file"];

interface StoredToken {
  access_token: string;
  refresh_token?: string;
  scope?: string;
  token_type?: string;
  expiry_date?: number;
}

/**
 * Get OAuth2 client with stored credentials or initiate auth flow
 */
export async function getGoogleAuth(): Promise<Auth.OAuth2Client> {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error(
      "Google OAuth credentials not configured.\n" +
      "Please set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET in your .env file.\n" +
      "Get these from: https://console.cloud.google.com/apis/credentials"
    );
  }

  const oauth2Client = new google.auth.OAuth2(
    clientId,
    clientSecret,
    "http://localhost:3847/oauth2callback"
  );

  // Try to load existing token
  if (fs.existsSync(TOKEN_PATH)) {
    const token = JSON.parse(fs.readFileSync(TOKEN_PATH, "utf-8")) as StoredToken;
    oauth2Client.setCredentials(token);
    
    // Check if token is expired and refresh if needed
    if (token.expiry_date && token.expiry_date < Date.now()) {
      try {
        const { credentials } = await oauth2Client.refreshAccessToken();
        saveToken(credentials as StoredToken);
        oauth2Client.setCredentials(credentials);
      } catch (error) {
        // Token refresh failed, need to re-authenticate
        fs.unlinkSync(TOKEN_PATH);
        return await authenticateWithBrowser(oauth2Client);
      }
    }
    
    return oauth2Client;
  }

  // No token exists, need to authenticate
  return await authenticateWithBrowser(oauth2Client);
}

/**
 * Open browser for OAuth flow and wait for callback
 */
async function authenticateWithBrowser(
  oauth2Client: Auth.OAuth2Client
): Promise<Auth.OAuth2Client> {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
    prompt: "consent", // Force consent to get refresh token
  });

  // Create a simple HTTP server to receive the OAuth callback
  return new Promise((resolve, reject) => {
    const server = http.createServer(async (req, res) => {
      try {
        if (req.url?.startsWith("/oauth2callback")) {
          const url = new URL(req.url, "http://localhost:3847");
          const code = url.searchParams.get("code");
          
          if (!code) {
            res.writeHead(400);
            res.end("No authorization code received");
            reject(new Error("No authorization code received"));
            server.close();
            return;
          }

          // Exchange code for tokens
          const { tokens } = await oauth2Client.getToken(code);
          oauth2Client.setCredentials(tokens);
          saveToken(tokens as StoredToken);

          res.writeHead(200, { "Content-Type": "text/html" });
          res.end(`
            <html>
              <body style="font-family: system-ui; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0;">
                <div style="text-align: center;">
                  <h1 style="color: #4a5568;">✓ Authorization Successful</h1>
                  <p style="color: #718096;">You can close this window and return to your terminal.</p>
                </div>
              </body>
            </html>
          `);

          server.close();
          resolve(oauth2Client);
        }
      } catch (error) {
        res.writeHead(500);
        res.end("Authorization failed");
        reject(error);
        server.close();
      }
    });

    server.listen(3847, async () => {
      console.error("\n🔐 Google authorization required.");
      console.error("Opening browser for authentication...\n");
      console.error(`If browser doesn't open, visit:\n${authUrl}\n`);
      
      // Dynamically import 'open' to open browser
      try {
        const open = (await import("open")).default;
        await open(authUrl);
      } catch {
        // If open fails, user will need to manually open the URL
        console.error("Could not open browser automatically. Please open the URL above manually.");
      }
    });

    // Timeout after 5 minutes
    setTimeout(() => {
      server.close();
      reject(new Error("Authorization timed out. Please try again."));
    }, 5 * 60 * 1000);
  });
}

/**
 * Save token to file for reuse
 */
function saveToken(token: StoredToken): void {
  fs.writeFileSync(TOKEN_PATH, JSON.stringify(token, null, 2));
  console.error("Token saved to .google-token.json");
}

/**
 * Check if Google OAuth is configured
 */
export function isGoogleAuthConfigured(): boolean {
  return !!(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET);
}

/**
 * Revoke stored token and delete token file
 */
export async function revokeGoogleAuth(): Promise<void> {
  if (fs.existsSync(TOKEN_PATH)) {
    fs.unlinkSync(TOKEN_PATH);
    console.error("Google token revoked and deleted");
  }
}
