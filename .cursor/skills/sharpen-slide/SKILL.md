---
name: sharpen-slide
description: Comprehensively improve a slide's visual polish by enhancing images and then iteratively refining HTML/CSS to match. Use when sharpening, polishing, or improving the overall look of a slide.
---

# Sharpen Slide

A comprehensive workflow for improving a slide's visual polish through iterative enhancement. This skill orchestrates image generation and then refines HTML/CSS based on visual feedback.

## Workflow Overview

```
Task Progress:
- [ ] Step 1: Identify the target slide
- [ ] Step 2: Enhance slide images (using enhance-slide-images skill)
- [ ] Step 3: Take comparison screenshot
- [ ] Step 4: Refine HTML/CSS to match generated images
- [ ] Step 5: Visual comparison and iteration
- [ ] Step 6: Final review
```

## Step 1: Identify the Target Slide

### If the user specifies a slide
Proceed with that slide. Parse the slide reference which may be:
- Slide number (e.g., "slide 3", "slide 2")
- Slide title (e.g., "the perimeter slide")
- Deck + slide (e.g., "slide 3 in agentic deck")

### If no slide is specified
**Ask the user before proceeding:**

> Which slide would you like me to sharpen? Please provide either:
> - A slide number (e.g., "slide 3")
> - A slide title or keyword
> - Or tell me which deck to look at and I'll list the slides

**Do not proceed until you know which slide to work on.**

### Resolve the slide location
1. Determine the deck (ask if unclear)
2. Read `decks/{deckName}/slides.md`
3. Locate the slide by counting `---` separators (slides are 1-indexed)
4. Capture the slide's current markdown content

## Step 2: Enhance Slide Images

**Follow the [enhance-slide-images skill](../enhance-slide-images/SKILL.md) completely.**

This includes:
1. Taking a screenshot of the current slide
2. Performing comprehensive visual analysis
3. Presenting enhancement recommendations
4. Generating images based on user selections
5. Placing images in the slide markdown

**Important:** Complete the entire enhance-slide-images workflow before proceeding. This ensures the slide has appropriate visual assets before CSS refinement begins.

### Transition to CSS Refinement

After images are placed, inform the user:

> Images have been generated and placed. Now I'll refine the HTML/CSS to better integrate these visuals. Let me take a fresh screenshot to see how everything looks together.

## Step 3: Take Comparison Screenshot

Take a screenshot of the slide with the new images in place. This is the baseline for CSS refinement.

**Use the [slide-screenshots skill](../slide-screenshots/SKILL.md) workflow:**

1. Start dev server on random port (if not already running)
2. Navigate to the slide: `http://localhost:{PORT}/#/{slideNumber}`
3. Lock, screenshot, unlock
4. Copy to deck's public folder as `slide-{slideNumber}-post-images.png`

Review the screenshot to identify CSS/HTML refinements needed.

## Step 4: Refine HTML/CSS to Match Generated Images

Analyze the screenshot and slide markdown to identify improvements. Focus on making the HTML/CSS work harmoniously with the new images.

### Common Refinement Areas

#### 1. Color Harmony
- **Check:** Do text colors, accents, and borders complement the new images?
- **Fix:** Adjust inline styles to use colors from the generated images
- **Example:** If background has purple tones, ensure accents use matching `#a855f7` or similar

```markdown
<!-- Before -->
<div style="border: 1px solid var(--solo-border);">

<!-- After - matching image tones -->
<div style="border: 1px solid rgba(168, 85, 247, 0.4);">
```

#### 2. Opacity and Layering
- **Check:** Is the background image too prominent or too faint?
- **Fix:** Adjust opacity values (typically 0.25-0.5 for backgrounds)
- **Check:** Are decorative elements competing with content?
- **Fix:** Reduce opacity or adjust positioning

```markdown
<!-- Adjust background opacity -->
<img src="/bg.png" alt="" style="... opacity: 0.35 ..." />

<!-- Adjust to 0.25 if too prominent -->
<img src="/bg.png" alt="" style="... opacity: 0.25 ..." />
```

#### 3. Spacing and Layout
- **Check:** Is there enough breathing room around content?
- **Fix:** Adjust margins, padding, gap values
- **Check:** Does content align with the visual composition?
- **Fix:** Adjust positioning and alignment

```markdown
<!-- Add more space above content graphic -->
<img src="/diagram.png" style="... margin: 2rem auto ..." />
```

#### 4. Typography Adjustments
- **Check:** Is text readable over the new background?
- **Fix:** Add text shadows, adjust font weight, or add backdrop
- **Check:** Do headings have appropriate visual weight?

```markdown
<!-- Add subtle text shadow for readability -->
<h1 style="text-shadow: 0 2px 4px rgba(0,0,0,0.5);">Title</h1>

<!-- Or add a subtle backdrop to text area -->
<div style="background: rgba(0, 0, 0, 0.3); padding: 1rem; border-radius: 0.5rem;">
```

#### 5. Card and Container Backgrounds
- **Check:** Are cards/containers appearing correctly over the background?
- **Fix:** Ensure cards use opaque backgrounds (not semi-transparent CSS variables)

```markdown
<!-- Replace semi-transparent variable -->
<div style="background: var(--solo-bg-card); ...">

<!-- With solid rgba -->
<div style="background: rgba(30, 30, 40, 0.95); ...">
```

#### 6. Decorative Element Positioning
- **Check:** Are corner/edge elements positioned correctly?
- **Fix:** Adjust positioning values (right, bottom, etc.)
- **Check:** Are decorative elements cropped appropriately?
- **Fix:** Use negative positioning to partially hide edges

```markdown
<!-- Adjust corner element to be more subtle -->
<img src="/corner-glow.png" style="... right: -80px; bottom: -80px; opacity: 0.4 ..." />
```

### Apply Refinements

1. Edit `decks/{deckName}/slides.md`
2. Make targeted CSS/HTML changes to the slide
3. Keep changes focused and incremental

## Step 5: Visual Comparison and Iteration

After making CSS refinements, take another screenshot to verify improvements.

### Comparison Loop

```
Iteration Checklist:
- [ ] Take fresh screenshot
- [ ] Compare with previous version
- [ ] Identify remaining issues
- [ ] Make targeted fixes
- [ ] Repeat until polished
```

### Screenshot Comparison Process

1. Take a new screenshot: `slide-{slideNumber}-refined-{iteration}.png`
2. Compare visually with the post-images screenshot
3. Identify what improved and what still needs work

### When to Stop Iterating

Stop when:
- Content is clearly readable
- Colors are harmonious
- Layout is balanced
- No obvious visual issues remain

Typically 1-3 iterations are sufficient.

### Presenting Progress

After each iteration, show the user what changed:

> **Iteration {n} changes:**
> - Reduced background opacity from 0.35 to 0.28 for better text readability
> - Added subtle text shadow to heading
> - Adjusted card background to solid rgba for cleaner appearance
>
> [Screenshot shows improvement in X, Y, Z]
>
> Would you like me to continue refining or is this looking good?

## Step 6: Final Review

Present a summary of all changes made:

```
## Sharpen Slide Complete: [Slide Title]

### Images Added
| Image | Type | Filename |
|-------|------|----------|
| [description] | Background | slide-{n}-bg-{name}.png |
| [description] | Decorative | corner-glow-accent.png |

### CSS Refinements Made
- Background opacity: adjusted to 0.28 for text readability
- Card backgrounds: converted to solid rgba(30, 30, 40, 0.95)
- Heading: added text-shadow for depth
- Margins: increased spacing around content graphic

### Before/After
- Before: `slide-{n}-screenshot.png` (initial state)
- After: `slide-{n}-refined-final.png` (polished state)

Run `make dev DECK={deckName}` to preview the final result.
```

## Quick Reference

### Screenshot naming convention
| Stage | Filename |
|-------|----------|
| Initial (before enhancement) | `slide-{n}-screenshot.png` |
| After images placed | `slide-{n}-post-images.png` |
| After CSS refinement | `slide-{n}-refined-{iteration}.png` |
| Final approved | `slide-{n}-refined-final.png` |

### Common CSS fixes (quick copy)

**Reduce background prominence:**
```markdown
opacity: 0.25
```

**Add text shadow for readability:**
```markdown
style="text-shadow: 0 2px 4px rgba(0,0,0,0.5);"
```

**Solid card background:**
```markdown
style="background: rgba(30, 30, 40, 0.95);"
```

**Matching purple accent:**
```markdown
style="border-color: rgba(168, 85, 247, 0.4);"
```

**Subtle glow effect:**
```markdown
style="box-shadow: 0 0 20px rgba(168, 85, 247, 0.3);"
```

### Skills to reference
- [enhance-slide-images](../enhance-slide-images/SKILL.md) - For image generation workflow
- [slide-screenshots](../slide-screenshots/SKILL.md) - For screenshot capture

## Example Session

**User**: "Sharpen slide 2 in the agentic deck"

**Agent**:

### Step 1: Identify
- Target: Slide 2 in `decks/agentic-solo-connect-2026/`
- Reads slide content: "The Challenge" with bullet points about security

### Step 2: Enhance Images
- Follows enhance-slide-images skill completely
- Screenshots current state
- Analyzes: needs background and content graphic
- User selects: "fragmented shield" background + "broken perimeter" illustration
- Generates images and places in slide

### Step 3: Comparison Screenshot
- Takes screenshot with images in place: `slide-2-post-images.png`
- Reviews: background looks good, but text is slightly hard to read

### Step 4: CSS Refinement
- Reduces background opacity from 0.35 to 0.28
- Adds text shadow to main heading
- Adjusts card backgrounds to solid rgba

### Step 5: Iteration
- Takes new screenshot: `slide-2-refined-1.png`
- Compares: text is now readable, but decorative element is too prominent
- Reduces corner glow opacity from 0.5 to 0.35
- Takes final screenshot: `slide-2-refined-final.png`
- User approves

### Step 6: Summary
> **Slide 2 sharpened!**
> - Added atmospheric fragmented shield background
> - Added broken perimeter illustration
> - Refined: opacity, text shadows, card backgrounds
> - Run `make dev DECK=agentic-solo-connect-2026` to preview

## Troubleshooting

### Text is hard to read over background
- Reduce background opacity (try 0.2-0.3)
- Add text shadow to headings
- Add subtle backdrop blur or dark overlay to text areas

### Colors look mismatched
- Sample colors from generated images
- Use matching accent colors in borders and highlights
- Ensure consistent purple (#a855f7) or brand color usage

### Layout feels cramped
- Increase margins around content graphics
- Reduce image sizes if they're too dominant
- Add more padding to cards and containers

### Iteration loop feels endless
- Limit to 3 iterations maximum
- Focus on the most impactful changes
- Accept "good enough" if diminishing returns
- Ask user for direction if stuck

### Dev server issues
- Use random high port (30000+) to avoid conflicts
- Use `required_permissions: ["all"]` if EMFILE errors occur
- Check terminal for existing servers before starting new ones
