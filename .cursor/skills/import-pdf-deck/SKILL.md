---
name: import-pdf-deck
description: Import a PDF slide deck into Slidev format. Converts PDF pages to images, analyzes content with AI vision, and generates editable Slidev markdown. Use when importing PDF presentations, converting PowerPoint exports, or migrating existing decks to Slidev.
---

# Import PDF Deck

Convert a PDF presentation into an editable Slidev deck. This skill extracts each page, analyzes the content using AI vision, and generates Slidev markdown that recreates the slide content.

## Prerequisites

**Required tool: `pdftoppm`** (part of poppler-utils)

Run `make install` to check if dependencies are present. If `pdftoppm` is missing:

```bash
# macOS
brew install poppler

# Ubuntu/Debian
apt-get install poppler-utils
```

## Workflow Overview

```
Task Progress:
- [ ] Step 1: Validate inputs and create deck structure
- [ ] Step 2: Convert PDF pages to images
- [ ] Step 3: Analyze each page and generate slides
- [ ] Step 4: Review and refine generated slides
```

## Step 1: Validate Inputs and Create Deck Structure

### Required Information

Gather from user:
- **PDF path**: Absolute path to the source PDF file
- **Deck name**: Name for the new deck (lowercase, hyphens for spaces)
- **Title** (optional): Presentation title (defaults to deck name)

### Validate PDF Exists

```bash
# Check PDF exists and is readable
ls -la "{pdfPath}"
```

### Create Deck Structure

If the deck doesn't exist, create it using the template:

```bash
# Create deck directory
mkdir -p decks/{deckName}/public

# Create package.json
cat > decks/{deckName}/package.json << 'EOF'
{
  "name": "{deckName}",
  "private": true,
  "scripts": {
    "dev": "slidev --open",
    "build": "slidev build",
    "export:pdf": "slidev export",
    "export:pptx": "slidev export --format pptx"
  }
}
EOF
```

## Step 2: Convert PDF Pages to Images

Use `pdftoppm` to convert each PDF page to a high-resolution PNG:

```bash
# Convert all pages to PNG images
# Output: decks/{deckName}/public/page-01.png, page-02.png, etc.
pdftoppm -png -r 300 "{pdfPath}" "decks/{deckName}/public/page"
```

**Parameters:**
- `-png`: Output format
- `-r 300`: Resolution (300 DPI for good quality)

After conversion, list the generated images:

```bash
ls -la decks/{deckName}/public/page-*.png
```

Count the pages to know how many slides to process.

## Step 3: Analyze Each Page and Generate Slides

For each page image, analyze and generate Slidev markdown.

### Page Analysis Workflow

For each page (1 to N):

#### 3a. Read the Page Image

Use the Read tool to view the page image:
```
Read: decks/{deckName}/public/page-{NN}.png
```

The image will be displayed, allowing you to analyze its content.

#### 3b. Analyze Content

Examine the page and identify:

| Element | What to Look For |
|---------|-----------------|
| **Layout type** | Title slide (cover), section divider, content slide, two-column |
| **Title** | Main heading text |
| **Subtitle** | Secondary heading or tagline |
| **Body content** | Bullet points, paragraphs, key messages |
| **Images/Graphics** | Diagrams, photos, icons (describe for potential regeneration) |
| **Layout structure** | Single column, two columns, centered, etc. |

#### 3c. Generate Slide Markdown

Based on the analysis, generate Slidev markdown for the slide.

**First slide (cover):**
```markdown
---
theme: ../../theme
title: "{Title}"
info: |
  ## {Title}
  Imported from PDF
drawings:
  persist: false
transition: slide-left
mdc: true
routerMode: hash
---

# {Title}

{Subtitle if any}
```

**Section slides:**
```markdown
---
layout: section
---

# {Section Title}

{Optional subtitle}
```

**Content slides:**
```markdown
---
layout: default
---

# {Slide Title}

{Content as bullet points or paragraphs}

- Point 1
- Point 2
- Point 3
```

**Two-column slides:**
```markdown
---
layout: two-cols
---

# {Title}

{Left column content}

::right::

{Right column content}
```

#### 3d. Handle Images and Graphics

For complex graphics in the PDF:

**Option A: Use PDF page as background**

If the slide has complex graphics that can't be easily recreated:
```markdown
---
layout: default
---

<img src="/page-{NN}.png" alt="" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; object-fit: contain; z-index: 0; pointer-events: none;" />

<div style="position: relative; z-index: 10;">

<!-- Overlay key text content here if needed -->

</div>
```

**Option B: Describe for regeneration**

If the graphic is simple enough to regenerate with AI:
- Note the graphic description in comments
- Consider using the `generate_slide_image` MCP tool later to create a fresh version

**Option C: Extract key text only**

For slides where the visual isn't critical:
- Extract the text content into clean Slidev markdown
- Let the Slidev theme handle styling

### Slide Content Extraction Guidelines

| PDF Element | Slidev Equivalent |
|-------------|------------------|
| Large centered text | `layout: cover` or `layout: section` |
| Title + bullets | `layout: default` with `# Title` and `- bullets` |
| Side-by-side content | `layout: two-cols` with `::right::` |
| Diagram with labels | Consider keeping as background image |
| Photo with caption | `<img>` tag with caption below |
| Quote or callout | `> blockquote` or styled `<div>` |

### Progress Tracking

After processing each page, update progress:

```
Slide Import Progress:
- [x] Page 1: Cover slide - "Presentation Title"
- [x] Page 2: Content - "Introduction"
- [ ] Page 3: Two-column - "Overview"
...
```

## Step 4: Review and Refine Generated Slides

### Compile the Deck

After processing all pages, write the complete `slides.md`:

```bash
# The file should now exist at:
decks/{deckName}/slides.md
```

### Preview the Deck

Start the dev server to preview:

```bash
cd decks/{deckName} && pnpm exec slidev --port 3030 --open=false
```

### Review Checklist

| Check | Status |
|-------|--------|
| All slides imported | ☐ |
| Text content accurate | ☐ |
| Layouts appropriate | ☐ |
| Images/backgrounds working | ☐ |
| Navigation between slides works | ☐ |

### Common Refinements

After initial import, suggest enhancements:

1. **Replace PDF backgrounds** with themed backgrounds using the `enhance-slide-images` skill
2. **Regenerate diagrams** using AI image generation for consistent style
3. **Adjust layouts** to better match Slidev capabilities
4. **Add transitions** between slides

## Quick Reference

### PDF to Images
```bash
pdftoppm -png -r 300 "{pdfPath}" "decks/{deckName}/public/page"
```

### Layout Selection Guide

| PDF Slide Characteristics | Recommended Layout |
|--------------------------|-------------------|
| Single large title, centered | `cover` |
| Section header, minimal content | `section` |
| Title with bullet points | `default` |
| Two columns of content | `two-cols` |
| Comparison/before-after | `two-cols` or custom |

### Frontmatter Template

```yaml
---
theme: ../../theme
title: "{Title}"
info: |
  ## {Title}
  Imported from PDF
drawings:
  persist: false
transition: slide-left
mdc: true
routerMode: hash
---
```

### Using Original PDF Page as Background

```markdown
<img src="/page-{NN}.png" alt="" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; object-fit: contain; z-index: 0; pointer-events: none;" />

<div style="position: relative; z-index: 10;">
<!-- Content overlay -->
</div>
```

## Troubleshooting

### pdftoppm not found

Install poppler:
```bash
# macOS
brew install poppler

# Linux
apt-get install poppler-utils
```

### Poor image quality

Increase resolution:
```bash
pdftoppm -png -r 600 "{pdfPath}" "decks/{deckName}/public/page"
```

### PDF pages have wrong aspect ratio

Slidev expects 16:9. If PDF is 4:3 or other ratio:
- Use `object-fit: contain` to preserve aspect ratio
- Or crop/pad images to 16:9 using ImageMagick

### Large PDF (many pages)

For PDFs with 20+ pages:
1. Process in batches of 5-10 slides
2. Show user progress after each batch
3. Ask if they want to continue or review

### Password-protected PDF

If the PDF is encrypted:
```bash
# Use qpdf to decrypt first (if you have the password)
qpdf --decrypt --password="password" input.pdf decrypted.pdf
```

## Example Session

**User**: "Import my-presentation.pdf as the q1-review deck"

**Agent**:

1. **Validates inputs**:
   - Confirms `/path/to/my-presentation.pdf` exists
   - Creates `decks/q1-review/` structure

2. **Converts PDF**:
   ```bash
   pdftoppm -png -r 300 "/path/to/my-presentation.pdf" "decks/q1-review/public/page"
   ```
   Result: 12 pages converted

3. **Processes each page**:
   - Page 1: Cover slide → `layout: cover`, title "Q1 Review 2025"
   - Page 2: Content → `layout: default`, bullet points about goals
   - Page 3: Complex chart → Keep as background image
   - ...

4. **Generates slides.md** with all content

5. **Offers refinements**:
   - "I've imported 12 slides. Would you like me to:
     - Preview the deck?
     - Regenerate any diagrams with AI?
     - Enhance slides with themed backgrounds?"
