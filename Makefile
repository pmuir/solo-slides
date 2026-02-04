.PHONY: install dev dev-all build build-all pdf pptx google-slides mcp-build mcp-dev deploy new-deck help ensure-playwright

# Default target
help:
	@echo "Solo Slides - Makefile Targets"
	@echo ""
	@echo "Development:"
	@echo "  make dev DECK=<name>     Start dev server for a specific deck"
	@echo "  make dev-all             List available decks"
	@echo ""
	@echo "Building:"
	@echo "  make build DECK=<name>   Build a specific deck"
	@echo "  make build-all           Build all decks for deployment"
	@echo ""
	@echo "Export:"
	@echo "  make pdf DECK=<name>     Export deck to PDF"
	@echo "  make pptx DECK=<name>    Export deck to PPTX"
	@echo "  make google-slides DECK=<name> [TITLE=\"...\"]  Export to Google Slides"
	@echo ""
	@echo "MCP Server:"
	@echo "  make mcp-build           Build the MCP server"
	@echo "  make mcp-dev             Run MCP server in dev mode"
	@echo ""
	@echo "Deployment:"
	@echo "  make deploy              Build all and prepare for GitHub Pages"
	@echo ""
	@echo "Setup:"
	@echo "  make install             Install all dependencies"
	@echo "  make new-deck NAME=<name> Scaffold a new deck"

# Install all dependencies
install:
	@command -v pnpm >/dev/null 2>&1 || { echo "Installing pnpm via corepack..."; corepack enable; }
	pnpm install
	@echo ""
	@echo "Checking system dependencies..."
	@command -v pdftoppm >/dev/null 2>&1 && echo "✓ pdftoppm (poppler) installed" || { \
		echo "⚠️  pdftoppm not found, installing..."; \
		if [ "$$(uname)" = "Darwin" ]; then \
			brew install poppler; \
		elif command -v apt-get >/dev/null 2>&1; then \
			sudo apt-get install -y poppler-utils; \
		else \
			echo "❌ Could not auto-install poppler. Please install manually:"; \
			echo "   macOS: brew install poppler"; \
			echo "   Linux: apt-get install poppler-utils"; \
		fi; \
	}

# Development - specific deck
dev:
ifndef DECK
	$(error DECK is required. Usage: make dev DECK=my-deck)
endif
	cd decks/$(DECK) && pnpm run dev

# Development - list decks
dev-all:
	@echo "Available decks:"
	@ls -1 decks/
	@echo ""
	@echo "Run: make dev DECK=<deck-name>"

# Build a specific deck
build:
ifndef DECK
	$(error DECK is required. Usage: make build DECK=my-deck)
endif
	cd decks/$(DECK) && pnpm run build

# Build all decks
build-all:
	@mkdir -p dist
	@echo "Building all decks..."
	@for deck in decks/*/; do \
		name=$$(basename $$deck); \
		echo "Building $$name..."; \
		cd $$deck && pnpm run build --base /solo-slides/$$name/ --out ../../dist/$$name && cd ../..; \
	done
	@echo "Creating index page..."
	@./scripts/create-index.sh

# Ensure Playwright browsers are installed
ensure-playwright:
	@pnpm exec playwright install chromium --only-shell >/dev/null 2>&1 || true

# Export to PDF
pdf: ensure-playwright
ifndef DECK
	$(error DECK is required. Usage: make pdf DECK=my-deck)
endif
	cd decks/$(DECK) && pnpm run export:pdf

# Export to PPTX
pptx: ensure-playwright
ifndef DECK
	$(error DECK is required. Usage: make pptx DECK=my-deck)
endif
	cd decks/$(DECK) && pnpm run export:pptx

# Export to Google Slides
google-slides: ensure-playwright
ifndef DECK
	$(error DECK is required. Usage: make google-slides DECK=my-deck)
endif
ifdef TITLE
	cd mcp-server && pnpm exec tsx src/export-google-slides.ts $(DECK) --title "$(TITLE)"
else
	cd mcp-server && pnpm exec tsx src/export-google-slides.ts $(DECK)
endif

# MCP Server - build
mcp-build:
	cd mcp-server && pnpm run build

# MCP Server - dev mode
mcp-dev:
	cd mcp-server && pnpm run dev

# Deploy - build all for GitHub Pages
deploy: build-all
	@echo "Deployment ready in dist/"
	@echo "Push to main branch to trigger GitHub Pages deployment"

# Create a new deck
new-deck:
ifndef NAME
	$(error NAME is required. Usage: make new-deck NAME=my-new-deck)
endif
	@mkdir -p decks/$(NAME)/public
	@cp -r templates/deck/* decks/$(NAME)/
	@sed -i '' 's/{{DECK_NAME}}/$(NAME)/g' decks/$(NAME)/package.json decks/$(NAME)/slides.md 2>/dev/null || \
		sed -i 's/{{DECK_NAME}}/$(NAME)/g' decks/$(NAME)/package.json decks/$(NAME)/slides.md
	@echo "Created new deck: decks/$(NAME)"
	@echo "Run: make dev DECK=$(NAME)"
