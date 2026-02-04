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

# Export to PDF
make pdf DECK=sample
```

## Creating a New Deck

```bash
make new-deck NAME=my-presentation
```

## Development

See [DEVELOPMENT.md](DEVELOPMENT.md) for framework documentation, theme customization, and tooling details.
