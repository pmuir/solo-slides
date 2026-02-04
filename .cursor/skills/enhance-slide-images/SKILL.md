---
name: enhance-slide-images
description: Enhance slides with AI-generated images through a guided workflow. Use when the user wants to add images to a slide, brainstorm visual ideas, improve a slide with graphics, or mentions slide enhancement, visual brainstorming, or image generation for presentations.
---

# Enhance Slide Images

A collaborative workflow for enhancing slides with AI-generated images.

## Workflow Overview

```
Task Progress:
- [ ] Step 1: Select and analyze the slide
- [ ] Step 2: Brainstorm image ideas
- [ ] Step 3: Refine prompts for generation
- [ ] Step 4: Generate images
- [ ] Step 5: Place images in the slide
```

## Step 1: Select and Analyze the Slide

### If the user specifies a slide
Read the deck's `slides.md` file and locate the slide by:
- Slide number (count `---` separators, slides are 1-indexed)
- Title text (search for `# Title`)
- Content keywords

### If no slide is specified
1. List available decks: `ls decks/`
2. Ask which deck to work with
3. Read `decks/{deckName}/slides.md`
4. Present a summary of slides with titles
5. Ask which slide to enhance

### Slide Analysis
For the selected slide, identify:
- **Current content**: Title, text, code, diagrams
- **Layout**: `cover`, `two-cols`, `section`, `default`, etc.
- **Existing images**: Any `<img>` tags or `![](...)` references
- **Visual gaps**: Where images would add value

## Step 2: Brainstorm Image Ideas

Present 3-5 image concepts that would enhance the slide:

### Brainstorming Template

```
Slide: [title]
Current content summary: [brief description]

Image Ideas:

1. **[Concept Name]**
   - Purpose: [what it adds to the slide]
   - Placement: [where it would go - e.g., right column, background, inline]
   - Style suggestion: [flat illustration, diagram, photorealistic, icon]

2. **[Concept Name]**
   ...
```

### Good Image Ideas For Common Slide Types

| Slide Type | Image Ideas |
|------------|-------------|
| Technical concept | Architecture diagram, flowchart, component visualization |
| Feature overview | Icon set, product screenshot mockup, comparison visual |
| Roadmap/timeline | Timeline graphic, milestone icons, progress indicators |
| Data/metrics | Stylized chart, infographic, data visualization |
| Cover/section | Hero image, branded graphic, abstract background |

### Ask the User
- "Which of these ideas appeals to you?"
- "Any modifications or different direction?"
- "Should I combine any concepts?"

## Step 3: Refine Prompts for Generation

### Prompt Engineering for Slide Images

Build prompts using this structure:

```
[Subject/Content] + [Style] + [Composition] + [Color/Mood]
```

**Example prompts:**

```
# Good: Specific and descriptive
"A microservices architecture diagram showing 5 interconnected services with 
API gateways, using a modern flat illustration style with blue and purple 
accent colors, clean lines, minimal detail"

# Bad: Too vague
"microservices diagram"
```

### Style Options

| Style | Best For | Prompt Keywords |
|-------|----------|-----------------|
| Flat illustration | Diagrams, concepts | "flat vector style, minimal, clean lines" |
| Isometric | Architecture, infrastructure | "isometric 3D illustration, technical" |
| Photorealistic | Hero images, backgrounds | "photorealistic, high quality" |
| Icon set | Feature lists | "icon, simple, single color" |
| Abstract | Backgrounds, sections | "abstract geometric, modern" |

### Present the Prompt
Show the user the draft prompt and ask for adjustments:
- "Here's the prompt I'll use: [prompt]. Should I adjust anything?"
- Suggest the filename based on the concept

## Step 4: Generate Images

### Use the MCP Tools

Generate images using the `generate_slide_image` tool:

```
Tool: generate_slide_image
Arguments:
  prompt: [refined prompt]
  deckName: [deck folder name]
  filename: [descriptive-name.png]
  style: [optional style hint]
```

### After Generation
1. Confirm the image was saved to `decks/{deckName}/public/{filename}`
2. If the user wants to see iterations, use `improve_slide_image` to refine:
   ```
   Tool: improve_slide_image
   Arguments:
     imagePath: decks/{deckName}/public/{filename}
     modifications: [what to change]
   ```

### Iteration Loop
Ask: "Does this look good, or should I try a variation?"
- If no: Adjust prompt or use `improve_slide_image`
- If yes: Proceed to placement

## Step 5: Place Images in the Slide

### Image Placement Patterns

**Inline image (centered):**
```markdown
<img src="/{filename}" alt="description" style="max-height: 320px; width: auto; margin: 0 auto; display: block;" />
```

**Two-column layout (image in right column):**
```markdown
---
layout: two-cols
---

# Content

Text on the left...

::right::

<img src="/{filename}" alt="description" style="max-height: 400px; width: auto;" />
```

**Background/decorative:**
```markdown
<div style="position: absolute; right: 2rem; bottom: 2rem; opacity: 0.8;">
  <img src="/{filename}" alt="" style="max-height: 200px;" />
</div>
```

### Update the Slide
1. Read the current `slides.md`
2. Find the target slide by counting `---` separators
3. Add the image markup in the appropriate location
4. Preserve existing content and formatting

### Verify
- Show the user the updated slide markdown
- Suggest running `make dev DECK={deckName}` to preview

## Quick Reference

### List existing images
```
Tool: list_deck_images
Arguments:
  deckName: [deck folder name]
```

### Image file conventions
- Use lowercase, hyphenated names: `microservices-arch.png`
- Be descriptive: `hero-gradient-abstract.png` not `image1.png`
- Images are served from root: `src="/filename.png"`

### Common layouts reference
| Layout | Image Placement |
|--------|-----------------|
| `default` | Inline below content |
| `two-cols` | Right column with `::right::` |
| `cover` | Background or centered hero |
| `section` | Small decorative or none |

## Example Session

**User**: "Add an image to the microservices slide in the sample deck"

**Agent**:
1. Reads `decks/sample/slides.md`
2. Finds the relevant slide (e.g., slide about architecture)
3. Proposes: "I could add a microservices architecture diagram showing connected services with an API gateway. Flat illustration style would match the theme. Sound good?"
4. Generates with prompt: "Microservices architecture diagram with 5 services connected through an API gateway, flat vector illustration, blue and purple accents, dark background"
5. Places the image and shows the updated markdown
