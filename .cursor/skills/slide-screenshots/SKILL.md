---
name: slide-screenshots
description: Capture screenshots of Slidev slides for visual context. Use when taking slide screenshots, capturing slide previews, or providing visual context for image generation.
---

# Slide Screenshots

Capture screenshots of rendered Slidev slides. Used to provide visual context when generating images that complement existing slide content.

## Key Principle: Avoid Port Conflicts

Always start a dedicated dev server on a random high port to avoid conflicts with any server the user may already have running.

## Screenshot Workflow

### Step 1: Start Dev Server on Random Port

Generate a random high port (e.g., 30000-39999) and start the server:

```bash
# Generate random port between 30000-39999
PORT=$((30000 + RANDOM % 10000))
echo "Starting on port $PORT"

# Start slidev on that port (runs in background)
cd decks/{deckName} && pnpm exec slidev --port $PORT
```

Or use the Makefile with a port override if available:

```bash
PORT=$((30000 + RANDOM % 10000))
cd decks/{deckName} && pnpm exec slidev --port $PORT --open=false
```

Wait 3-5 seconds for the server to start before proceeding.

### Step 2: Navigate to the Slide

Use the browser MCP to navigate. Slidev uses hash-based routing:

```
Tool: browser_navigate (cursor-ide-browser)
Arguments:
  url: "http://localhost:{PORT}/#/{slideNumber}"
```

Note: Slide numbers are 1-indexed.

### Step 3: Lock Browser and Take Screenshot

```
Tool: browser_lock (cursor-ide-browser)
Arguments: {}

Tool: browser_take_screenshot (cursor-ide-browser)
Arguments:
  filename: "decks/{deckName}/public/slide-{slideNumber}-screenshot.png"
```

### Step 4: Cleanup

Unlock the browser and stop the dev server:

```
Tool: browser_unlock (cursor-ide-browser)
Arguments: {}
```

Kill the dev server process (use the PID from the terminal output).

## Copy Screenshot to Deck

The browser MCP saves screenshots to a temp directory. Copy to the deck's public folder:

```bash
cp "/var/folders/.../cursor/screenshots/decks/{deckName}/public/slide-{slideNumber}-screenshot.png" \
   "decks/{deckName}/public/slide-{slideNumber}-screenshot.png"
```

## Quick Reference

| Step | Tool/Command | Notes |
|------|--------------|-------|
| Start server | `pnpm exec slidev --port {PORT}` | Random port 30000-39999 |
| Navigate | `browser_navigate` | URL: `http://localhost:{PORT}/#/{slideNumber}` |
| Lock | `browser_lock` | Required before screenshot |
| Screenshot | `browser_take_screenshot` | Save to deck public folder |
| Unlock | `browser_unlock` | Release browser for user |
| Stop server | Kill process by PID | Check terminal for PID |

## Common Issues

### Port Already in Use

If you see "port already in use", the random port collided with something. Try a different port:

```bash
PORT=$((30000 + RANDOM % 10000))
```

### Screenshot Saved to Wrong Location

The browser MCP saves to a temp directory. Always copy to the deck's `public/` folder for use with image generation tools.

### Server Not Ready

If the page doesn't load, wait longer. Slidev can take 3-5 seconds to start. Check the terminal output for "public slide show" message.
