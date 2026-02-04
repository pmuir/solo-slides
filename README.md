# Solo.io Slides

Presentation decks for Solo.io.

## Available Decks

| Deck | Description |
|------|-------------|
| [sample](decks/sample/) | Demo deck showcasing theme and layouts |

## Quick Start

```bash
# Install dependencies
make install

# Start a deck in dev mode
make dev DECK=sample
```

## Creating a New Deck

```bash
make new-deck NAME=my-presentation
```

## Importing from PDF

Import an existing PDF presentation into Slidev format using Cursor:

1. Ensure `pdftoppm` is installed (`make install` will check for this)
2. Ask Cursor: "Import my-slides.pdf as the quarterly-review deck"

Cursor will:
- Convert each PDF page to an image
- Analyze content using AI vision
- Generate editable Slidev markdown
- Offer to enhance slides with the theme

**Requires poppler:**
```bash
# macOS
brew install poppler

# Linux
apt-get install poppler-utils
```

## Exporting Decks

### Export to PDF

```bash
make pdf DECK=sample
```

Exports the deck to `decks/sample/slides-export.pdf`.

### Export to PPTX (PowerPoint)

```bash
make pptx DECK=sample
```

Exports the deck to `decks/sample/slides-export.pptx`. Note that slides are exported as images, so text is not editable in PowerPoint.

### Export to Google Slides

```bash
# Basic export
make google-slides DECK=sample

# With custom title
make google-slides DECK=sample TITLE="Q1 Review 2025"
```

This exports the deck to PPTX, uploads it to Google Drive, and converts it to Google Slides format.

**Setup required:**

1. Create OAuth credentials at [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
   - Create an OAuth 2.0 Client ID (Desktop app type)
2. Enable the [Google Drive API](https://console.cloud.google.com/apis/library/drive.googleapis.com)
3. Add credentials to `.env`:
   ```
   GOOGLE_CLIENT_ID=your_client_id
   GOOGLE_CLIENT_SECRET=your_client_secret
   ```

On first run, a browser window will open for OAuth authorization. Note that slides are exported as images, so text is not editable in Google Slides.

## AI Image Generation

This project includes an MCP server with AI-powered image generation tools for enhancing slides. When using Cursor with the MCP server enabled, you can generate custom images for your presentations.

### Available Tools

| Tool | Description |
|------|-------------|
| `generate_slide_image` | Generate a new image from a text prompt |
| `improve_slide_image` | Modify an existing image with instructions |
| `list_deck_images` | List all images in a deck's public folder |

### Usage with Cursor

Ask Cursor to enhance your slides with images:

- "Add an image to the microservices slide in the sample deck"
- "Generate an architecture diagram for slide 3"
- "Create a hero image for the cover slide"

Cursor will guide you through:
1. Selecting and analyzing the target slide
2. Brainstorming image concepts
3. Refining the generation prompt
4. Generating and placing the image

### Image Placement

Generated images are saved to `decks/{deckName}/public/` and can be referenced in slides:

```markdown
<img src="/my-image.png" alt="description" style="max-height: 320px; width: auto;" />
```

### Setup

The MCP server requires an OpenAI API key for image generation:

```bash
# Add to .env
OPENAI_API_KEY=your_api_key
```

## Development

See [DEVELOPMENT.md](DEVELOPMENT.md) for framework documentation, theme customization, and tooling details.
