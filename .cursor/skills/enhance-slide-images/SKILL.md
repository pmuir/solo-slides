---
name: enhance-slide-images
description: Analyze slides and suggest comprehensive visual enhancements including background images, decorative elements, and content graphics. Use when enhancing slides visually, adding backgrounds, brainstorming visual improvements, or making presentations more engaging.
---

# Enhance Slide Images

A comprehensive workflow for analyzing slides and suggesting multiple visual enhancements.

## Workflow Overview

```
Task Progress:
- [ ] Step 1: Select and capture the slide
- [ ] Step 2: Comprehensive slide analysis
- [ ] Step 3: Present enhancement recommendations
- [ ] Step 4: User selects enhancements to implement
- [ ] Step 5: Generate and place images
```

## Step 1: Select and Capture the Slide

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

### Initial Slide Inventory
For the selected slide, capture:
- **Raw markdown content**: The full slide markdown
- **Layout type**: `cover`, `two-cols`, `section`, `default`, etc.
- **Existing visual elements**: Any `<img>` tags, `![](...)` references, or inline styles

### Screenshot the Slide (Required)

**Always capture a screenshot of the rendered slide.** This screenshot enables comprehensive visual analysis and is sent to the AI image generation tool as context.

For detailed screenshot instructions, see [slide-screenshots skill](../slide-screenshots/SKILL.md).

#### Automated Screenshot Workflow

**Important:** Always start a dedicated dev server on a random high port to avoid conflicts with any server the user may already have running.

1. **Start dev server on random port:**
   ```bash
   PORT=$((30000 + RANDOM % 10000))
   cd decks/{deckName} && pnpm exec slidev --port $PORT --open=false
   ```
   Wait 3-5 seconds for the server to start.

2. **Navigate to the specific slide** using the browser MCP (note: hash-based routing):
   ```
   Tool: browser_navigate (cursor-ide-browser)
   Arguments:
     url: "http://localhost:{PORT}/#/{slideNumber}"
   ```

3. **Lock the browser** before taking screenshot:
   ```
   Tool: browser_lock (cursor-ide-browser)
   Arguments: {}
   ```

4. **Take a screenshot:**
   ```
   Tool: browser_take_screenshot (cursor-ide-browser)
   Arguments:
     filename: "decks/{deckName}/public/slide-{slideNumber}-screenshot.png"
   ```

5. **Unlock the browser** when done:
   ```
   Tool: browser_unlock (cursor-ide-browser)
   ```

6. **Copy screenshot** from temp directory to deck's public folder:
   ```bash
   cp "/var/folders/.../cursor/screenshots/decks/{deckName}/public/slide-{slideNumber}-screenshot.png" \
      "decks/{deckName}/public/slide-{slideNumber}-screenshot.png"
   ```

7. **Stop the dev server** (kill the process by PID).

#### User-Provided Screenshot (Fallback)

If the dev server cannot be started, ask the user to provide a screenshot:
- "Please provide a screenshot of the current slide. I'll use it as visual context for generating images that complement the slide."
- The user can paste a screenshot or provide a file path
- Save it to `decks/{deckName}/public/slide-{slideNumber}-screenshot.png`

## Step 2: Comprehensive Slide Analysis

With the screenshot and markdown captured, perform a thorough analysis of the slide's visual state.

### Analysis Framework

Evaluate each of these enhancement categories:

#### 1. Background Treatment
- **Current state**: Solid color? Gradient? Image?
- **Opportunity**: Would a subtle background image add depth or reinforce the message?
- **Considerations**: Text readability, visual hierarchy, theme consistency

#### 2. Decorative/Ambient Elements
- **Current state**: Any corner graphics, edge accents, or floating elements?
- **Opportunity**: Subtle graphics that add visual interest without competing with content
- **Considerations**: Balance, restraint, professional appearance

#### 3. Content-Supporting Graphics
- **Current state**: Any diagrams, illustrations, or conceptual visuals?
- **Opportunity**: Graphics that directly illustrate or reinforce the main points
- **Considerations**: Clarity, relevance, size relative to text

#### 4. Hero/Focal Images
- **Current state**: Any prominent imagery?
- **Opportunity**: A striking image that becomes the visual anchor of the slide
- **Considerations**: Layout implications, message alignment

#### 5. Icon/Symbol Opportunities
- **Current state**: Bullet points or lists that could use icons?
- **Opportunity**: Replace or augment text with meaningful icons
- **Considerations**: Consistency, recognition, simplicity

### Visual Gap Analysis Template

```
## Slide Analysis: [Title]

**Content Summary:** [Brief description of what the slide communicates]
**Current Layout:** [layout type]
**Visual Density:** [sparse / balanced / dense]

### Enhancement Opportunities

| Category | Current State | Enhancement Potential | Priority |
|----------|---------------|----------------------|----------|
| Background | [solid dark] | [high - slide feels flat] | ⭐⭐⭐ |
| Decorative | [none] | [medium - could use accent] | ⭐⭐ |
| Content Graphics | [none] | [high - concept needs visualization] | ⭐⭐⭐ |
| Hero Image | [none] | [low - text-focused slide] | ⭐ |
| Icons | [bullet list] | [medium - 3 items could use icons] | ⭐⭐ |
```

## Step 3: Present Enhancement Recommendations

Present a prioritized set of enhancement recommendations, with multiple options in the highest-value categories.

### Recommendation Format

```
# Enhancement Recommendations for: [Slide Title]

Based on my analysis, here are the visual enhancements that would most improve this slide:

---

## 🎨 BACKGROUND (High Priority)

The slide currently has a solid dark background. Adding a subtle background image would add depth and reinforce the theme.

**Option A: [Name]**
- Description: [what it looks like]
- Effect: [what it adds to the slide]
- Prompt concept: "[brief prompt idea]"

**Option B: [Name]**
- Description: [alternative approach]
- Effect: [what it adds]
- Prompt concept: "[brief prompt idea]"

---

## 🖼️ CONTENT GRAPHIC (High Priority)

The slide discusses [concept] but lacks a visual representation.

**Option A: [Name]**
- Description: [what it illustrates]
- Placement: [where it would go]
- Prompt concept: "[brief prompt idea]"

---

## ✨ DECORATIVE ELEMENTS (Medium Priority)

A subtle accent element could add polish.

**Option A: [Name]**
- Description: [what it is]
- Placement: [where - e.g., bottom-right corner]
- Prompt concept: "[brief prompt idea]"

---

## Summary

| Enhancement | Recommended? | Notes |
|-------------|--------------|-------|
| Background image | ✅ Yes | Would significantly improve visual depth |
| Content graphic | ✅ Yes | Would clarify the main concept |
| Decorative accent | ⚡ Optional | Nice polish but not essential |
| Hero image | ❌ Skip | Would compete with existing layout |
| Icons | ❌ Skip | Text is already concise |

**Which enhancements would you like me to generate?** You can select:
- Individual items (e.g., "Background Option A")
- Categories (e.g., "All high priority")
- Everything recommended
```

### Background Image Styles (Common Patterns)

| Style | Best For | Prompt Elements |
|-------|----------|-----------------|
| Abstract gradient | Modern, tech-focused | "abstract gradient background, dark with [color] accents, subtle, atmospheric" |
| Geometric pattern | Technical, structured | "geometric pattern, low opacity, dark theme, subtle mesh or grid" |
| Conceptual atmosphere | Story-driven | "atmospheric [scene], dark moody lighting, cinematic, subtle" |
| Tech texture | Infrastructure, systems | "digital circuit pattern, network nodes, dark background, subtle glow" |
| Organic abstract | Softer, human topics | "organic flowing shapes, gradient, dark with [color] highlights" |

### Ask the User

After presenting recommendations:
- "Which enhancements would you like me to generate?"
- "Should I adjust any of these concepts?"
- "Would you like me to prioritize differently?"

## Step 4: User Selects Enhancements

Based on user feedback, confirm which enhancements to generate. Track selections:

```
Selected Enhancements:
- [ ] Background: [Option selected]
- [ ] Content Graphic: [Option selected]
- [ ] Decorative: [Option selected]
```

### Refine Prompts for Each Selection

For each selected enhancement, build a complete prompt using this structure:

```
[Subject/Content] + [Style] + [Composition] + [Color/Mood] + [Slide Context]
```

#### Background Image Prompts

Background images need special attention to ensure text readability:

```
# Good background prompt
"Abstract dark atmospheric background with subtle purple and blue gradient fog, 
low contrast, slightly blurred, cinematic lighting, leaves clear space for 
text overlay, 1920x1080 presentation slide background"

# Include these elements:
- "dark" or "low contrast" for text readability
- "subtle" or "atmospheric" to not compete with content
- "background for presentation" to set context
- Color hints that match the slide theme
```

#### Content Graphic Prompts

```
# Good content graphic prompt
"Microservices architecture diagram showing 5 interconnected services with 
API gateway, flat vector illustration style, blue and purple accent colors, 
clean lines, minimal detail, transparent or dark background"
```

#### Decorative Element Prompts

```
# Good decorative prompt
"Subtle geometric accent shape, glowing edges, purple and blue gradient, 
minimal, modern, suitable for corner placement, transparent background"
```

### Style Reference Table

| Style | Best For | Prompt Keywords |
|-------|----------|-----------------|
| Flat illustration | Diagrams, concepts | "flat vector style, minimal, clean lines" |
| Isometric | Architecture, infrastructure | "isometric 3D illustration, technical" |
| Atmospheric | Backgrounds | "atmospheric, subtle, low contrast, cinematic" |
| Abstract geometric | Backgrounds, accents | "abstract geometric, modern, gradient" |
| Tech texture | Infrastructure slides | "digital, circuit, network, subtle glow" |

### Present All Prompts

Show the user all draft prompts before generating:

```
I'll generate the following images:

1. **Background: Atmospheric Tech**
   - Prompt: "[full prompt]"
   - Filename: `slide-{n}-bg-atmospheric-tech.png`

2. **Content: Architecture Diagram**
   - Prompt: "[full prompt]"
   - Filename: `architecture-diagram.png`

Should I adjust any of these before generating?
```

## Step 5: Generate and Place Images

### Generate All Selected Images

Generate each image using the `generate_slide_image` tool with the slide screenshot as reference:

```
Tool: generate_slide_image (user-solo-slides-images)
Arguments:
  prompt: [refined prompt]
  deckName: [deck folder name]
  filename: [descriptive-name.png]
  style: [optional style hint]
  referenceImagePath: "decks/{deckName}/public/slide-{slideNumber}-screenshot.png"
```

The `referenceImagePath` sends the slide screenshot to the AI, helping it:
- Match the slide's color scheme and visual style
- Understand the existing layout and content
- Generate images that complement rather than clash with the slide

### Generation Workflow

For each selected enhancement:
1. Generate the image
2. Confirm it was saved to `decks/{deckName}/public/{filename}`
3. Show the user the result
4. Offer iteration if needed:
   ```
   Tool: improve_slide_image
   Arguments:
     imagePath: decks/{deckName}/public/{filename}
     modifications: [what to change]
   ```

### Batch Review

After generating all images, present a summary:

```
## Generated Images

| Image | Status | Preview |
|-------|--------|---------|
| Background: atmospheric-tech.png | ✅ Generated | [thumbnail] |
| Content: architecture-diagram.png | ✅ Generated | [thumbnail] |

Would you like to:
- Regenerate any of these?
- Proceed to placement?
```

### Place All Images in the Slide

After generation is complete and approved, place all images in the slide markdown.

### Critical: Z-Index and Positioning in Slidev

**Important:** Tailwind classes like `absolute inset-0 -z-10` do NOT work reliably in Slidev. Use inline styles instead.

**Key learnings:**
- `z-index: -1` makes images disappear completely (they render behind the slide container)
- Use `position: fixed` with `z-index: 0` for background images
- Wrap ALL slide content in a div with `position: relative; z-index: 10` to ensure it renders above backgrounds
- Always use inline styles, not Tailwind classes, for positioning

### Placement Patterns by Enhancement Type

#### Background Images (Full-Slide) - CORRECT APPROACH

Add background images with `position: fixed` and wrap content in a z-index container:

```markdown
---
layout: default
---

<img src="/slide-3-bg-atmospheric.png" alt="" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; opacity: 0.35; z-index: 0; pointer-events: none;" />

<div style="position: relative; z-index: 10;">

# Slide Title

Content goes here...

</div>
```

**Key background properties:**
- `position: fixed` - ensures the image covers the full viewport
- `z-index: 0` - places behind content (NOT -1, which hides it completely)
- `opacity: 0.35` - ensures text readability (adjust 0.25-0.5 as needed)
- `pointer-events: none` - prevents the image from blocking interactions
- Content wrapper with `z-index: 10` - ensures all content renders above

#### Decorative Corner/Edge Elements

```markdown
<img src="/corner-glow-accent.png" alt="" style="position: fixed; right: -50px; bottom: -50px; height: 400px; opacity: 0.5; z-index: 0; pointer-events: none;" />
```

Position options (adjust `right`/`bottom`/`left`/`top` values):
- `right: -50px; bottom: -50px` - bottom right, partially off-screen
- `left: 0; bottom: 0` - bottom left corner
- Use `opacity: 0.4` to `opacity: 0.6` for subtlety

### Card/Content Background Transparency Fix

**Problem:** CSS variables like `var(--solo-bg-card)` may be semi-transparent, causing background images to show through content cards.

**Solution:** Replace semi-transparent backgrounds with nearly-opaque rgba values:

```markdown
<!-- BEFORE (semi-transparent, background shows through) -->
<div style="background: var(--solo-bg-card); ...">

<!-- AFTER (solid, clean appearance) -->
<div style="background: rgba(30, 30, 40, 0.95); ...">
```

Use `rgba(30, 30, 40, 0.95)` or similar dark colors with 95% opacity for cards that should appear solid.

#### Content Graphics (Inline)

**Centered below content:**
```markdown
<img src="/{filename}" alt="description" style="max-height: 320px; width: auto; margin: 0 auto; display: block;" />
```

**In two-column layout:**
```markdown
---
layout: two-cols
---

# Content

Text on the left...

::right::

<img src="/{filename}" alt="description" style="max-height: 400px;" />
```

#### Multiple Enhancements Example

A slide with background + decorative element + content wrapper:

```markdown
---
layout: default
---

<img src="/slide-3-bg-atmospheric.png" alt="" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; opacity: 0.35; z-index: 0; pointer-events: none;" />

<img src="/corner-glow-accent.png" alt="" style="position: fixed; right: -50px; bottom: -50px; height: 400px; opacity: 0.5; z-index: 0; pointer-events: none;" />

<div style="position: relative; z-index: 10;">

# Understanding Microservices

Modern applications are built from small, independent services...

<div style="background: rgba(30, 30, 40, 0.95); border: 1px solid var(--solo-border); border-radius: 0.5rem; padding: 1rem;">
  Card content here - background won't show through
</div>

<img src="/microservices-arch.png" alt="Microservices architecture diagram" style="max-height: 256px; margin: 1rem auto; display: block;" />

</div>
```

### Improving Text Arrows with SVG

Plain text arrows (↓) can be replaced with polished SVG arrows:

```markdown
<!-- BEFORE (plain text) -->
<div style="display: flex; justify-content: space-around; color: var(--solo-purple);">
  <span>↓</span>
  <span>↓</span>
</div>

<!-- AFTER (SVG with gradient and glow) -->
<div style="display: flex; justify-content: space-around; padding: 0.5rem 0;">
  <svg width="40" height="40" viewBox="0 0 40 40" style="filter: drop-shadow(0 0 6px rgba(168, 85, 247, 0.8));">
    <defs>
      <linearGradient id="arrowGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:#a855f7;stop-opacity:0.6" />
        <stop offset="100%" style="stop-color:#a855f7;stop-opacity:1" />
      </linearGradient>
    </defs>
    <line x1="20" y1="5" x2="20" y2="30" stroke="url(#arrowGrad1)" stroke-width="3" stroke-linecap="round"/>
    <polyline points="10,22 20,35 30,22" fill="none" stroke="#a855f7" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
</div>
```

**SVG arrow features:**
- Gradient from lighter to darker as it points down
- Drop-shadow glow effect matching the purple theme
- Proper arrow shape with stem and chevron head

### Update the Slide

1. Read the current `slides.md`
2. Find the target slide by counting `---` separators
3. Add images in the correct order:
   - Background images first (top of slide content)
   - Decorative elements (positioned absolutely)
   - Content graphics (inline where appropriate)
4. Preserve existing content and formatting

### Verify

- Show the user the complete updated slide markdown
- Summarize what was added
- Suggest running `make dev DECK={deckName}` to preview

## Quick Reference

### Screenshot a slide

See [slide-screenshots skill](../slide-screenshots/SKILL.md) for full details.

**Important:** Before starting a new dev server, check if one is already running:
1. List the terminals folder to see running processes
2. Check for existing Slidev servers (usually on port 3030)
3. Reuse existing server if available

```bash
# 1. Start server (use required_permissions: ["all"] to avoid EMFILE errors)
cd decks/{deckName} && pnpm exec slidev --port 3030 --open=false
```

```
# 2. Navigate (use hash routing: /#/{slideNumber})
Tool: browser_navigate
  url: "http://localhost:3030/#/{slideNumber}"

# 3. Lock, screenshot, unlock
Tool: browser_lock
Tool: browser_take_screenshot
  filename: "slide-{slideNumber}-screenshot.png"
Tool: browser_unlock
```

```bash
# 4. Copy from temp dir to deck public folder
cp "/var/folders/.../cursor/screenshots/slide-{slideNumber}-screenshot.png" \
   "decks/{deckName}/public/slide-{slideNumber}-screenshot.png"
```

### Generate image with slide context
```
Tool: generate_slide_image (user-solo-slides-images)
Arguments:
  prompt: [image description]
  deckName: [deck folder name]
  filename: [output-name.png]
  style: [optional: flat illustration, photorealistic, etc.]
  referenceImagePath: "decks/{deckName}/public/slide-{slideNumber}-screenshot.png"
```

### List existing images
```
Tool: list_deck_images
Arguments:
  deckName: [deck folder name]
```

### Filename conventions by type
| Type | Naming Pattern | Example |
|------|----------------|---------|
| Background | `slide-{n}-bg-{descriptor}.png` | `slide-3-bg-atmospheric-tech.png` |
| Decorative | `{descriptor}-accent.png` | `corner-glow-accent.png` |
| Content | `{descriptive-name}.png` | `microservices-arch.png` |

### Background placement (quick copy) - USE INLINE STYLES
```markdown
<img src="/{filename}" alt="" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; opacity: 0.35; z-index: 0; pointer-events: none;" />

<div style="position: relative; z-index: 10;">
<!-- All slide content goes inside this wrapper -->
</div>
```

### Decorative placement (quick copy)
```markdown
<img src="/{filename}" alt="" style="position: fixed; right: -50px; bottom: -50px; height: 400px; opacity: 0.5; z-index: 0; pointer-events: none;" />
```

### Card with solid background (prevents bleed-through)
```markdown
<div style="background: rgba(30, 30, 40, 0.95); border: 1px solid var(--solo-border); border-radius: 0.5rem; padding: 1rem;">
  Content here
</div>
```

### Enhancement priority by slide type
| Layout | Background | Decorative | Content Graphic |
|--------|------------|------------|-----------------|
| `cover` | ⭐⭐⭐ High | ⭐⭐ Medium | ⭐ Low |
| `default` | ⭐⭐ Medium | ⭐ Low | ⭐⭐⭐ High |
| `two-cols` | ⭐ Low | ⭐ Low | ⭐⭐⭐ High (right col) |
| `section` | ⭐⭐⭐ High | ⭐⭐ Medium | ⭐ Low |

## Example Session

**User**: "Enhance slide 3 in the agentic deck"

**Agent**:

### Step 1: Capture
1. Reads `decks/agentic-solo-connect-2026/slides.md`
2. Finds slide 3 (e.g., "The Perimeter Has Changed")
3. Screenshots the slide for visual context

### Step 2: Analyze
4. Presents comprehensive analysis:

```
## Slide Analysis: The Perimeter Has Changed

**Content Summary:** Discusses how traditional security perimeters have dissolved
**Current Layout:** default
**Visual Density:** Sparse - mostly text

### Enhancement Opportunities

| Category | Current State | Enhancement Potential | Priority |
|----------|---------------|----------------------|----------|
| Background | solid dark | high - slide feels flat | ⭐⭐⭐ |
| Decorative | none | medium - corner accent could help | ⭐⭐ |
| Content Graphics | one small image | high - could use larger visual | ⭐⭐⭐ |
```

### Step 3: Recommend
5. Presents options:

```
## 🎨 BACKGROUND (High Priority)

**Option A: Broken Castle Wall**
- Atmospheric image of a crumbling fortress, symbolizing broken perimeter
- Dark, moody, cinematic lighting

**Option B: Dissolving Grid**  
- Abstract digital grid fading at edges
- Tech-focused, subtle

## 🖼️ CONTENT GRAPHIC (High Priority)

**Option A: Perimeter Diagram**
- Before/after showing traditional vs. modern perimeter
- Flat illustration style

Which enhancements would you like?
```

### Step 4: User Selects
**User**: "Background A and the content graphic"

### Step 5: Generate and Place
6. Generates both images with slide context
7. Updates slide with background + content graphic (using inline styles):

```markdown
---
layout: default
---

<img src="/slide-3-bg-broken-fortress.png" alt="" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; opacity: 0.35; z-index: 0; pointer-events: none;" />

<div style="position: relative; z-index: 10;">

# The Perimeter Has Changed

Traditional security boundaries have dissolved...

<img src="/perimeter-evolution-diagram.png" alt="Perimeter evolution" style="max-height: 288px; margin: 1rem auto; display: block;" />

</div>
```

8. Shows final result and suggests preview command

## Troubleshooting

### Background images not visible
- **Cause:** Using `z-index: -1` or Tailwind classes like `-z-10`
- **Fix:** Use `z-index: 0` with inline styles and wrap content in `z-index: 10` container

### Background showing through cards/content boxes
- **Cause:** CSS variable backgrounds like `var(--solo-bg-card)` are semi-transparent
- **Fix:** Replace with `rgba(30, 30, 40, 0.95)` or similar nearly-opaque color

### Dev server won't start (EMFILE error)
- **Cause:** Too many file watchers open
- **Fix:** Use `required_permissions: ["all"]` when starting the server

### Tailwind classes not working
- **Cause:** Slidev doesn't always process Tailwind classes in HTML
- **Fix:** Use inline styles instead of Tailwind classes for positioning and z-index
