#!/usr/bin/env node

import { config } from "dotenv";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

// Load .env from the repo root (parent of mcp-server)
const __dirname = dirname(fileURLToPath(import.meta.url));
config({ path: resolve(__dirname, "../../.env") });

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { generateSlideImage } from "./tools/generate-image.js";
import { improveSlideImage } from "./tools/improve-image.js";
import { listDeckImages } from "./tools/list-images.js";

const server = new Server(
  {
    name: "solo-slides-images",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// List available tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "generate_slide_image",
        description:
          "Generate an image using Gemini AI and save it to a slide deck's public folder",
        inputSchema: {
          type: "object",
          properties: {
            prompt: {
              type: "string",
              description: "Description of the image to generate",
            },
            deckName: {
              type: "string",
              description: "Name of the deck (folder name in decks/)",
            },
            filename: {
              type: "string",
              description: "Output filename (e.g., 'hero.png')",
            },
            style: {
              type: "string",
              description:
                "Optional style hints (e.g., 'flat illustration', 'photorealistic', 'diagram')",
            },
          },
          required: ["prompt", "deckName", "filename"],
        },
      },
      {
        name: "improve_slide_image",
        description:
          "Take an existing image and generate an improved version based on modification instructions",
        inputSchema: {
          type: "object",
          properties: {
            imagePath: {
              type: "string",
              description:
                "Path to the existing image (relative to repo root)",
            },
            modifications: {
              type: "string",
              description: "Description of how to improve or modify the image",
            },
            outputFilename: {
              type: "string",
              description:
                "Optional new filename. If not provided, will overwrite the original",
            },
          },
          required: ["imagePath", "modifications"],
        },
      },
      {
        name: "list_deck_images",
        description: "List all images in a specific deck's public folder",
        inputSchema: {
          type: "object",
          properties: {
            deckName: {
              type: "string",
              description: "Name of the deck (folder name in decks/)",
            },
          },
          required: ["deckName"],
        },
      },
    ],
  };
});

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      case "generate_slide_image": {
        const result = await generateSlideImage(
          args as {
            prompt: string;
            deckName: string;
            filename: string;
            style?: string;
          }
        );
        return {
          content: [{ type: "text", text: result }],
        };
      }

      case "improve_slide_image": {
        const result = await improveSlideImage(
          args as {
            imagePath: string;
            modifications: string;
            outputFilename?: string;
          }
        );
        return {
          content: [{ type: "text", text: result }],
        };
      }

      case "list_deck_images": {
        const result = await listDeckImages(
          args as {
            deckName: string;
          }
        );
        return {
          content: [{ type: "text", text: result }],
        };
      }

      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return {
      content: [{ type: "text", text: `Error: ${message}` }],
      isError: true,
    };
  }
});

// Start the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Solo Slides MCP server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
