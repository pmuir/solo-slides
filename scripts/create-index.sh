#!/bin/bash
# Creates an index.html page listing all decks

cat > dist/index.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Solo Slides</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem;
    }
    .container {
      background: white;
      border-radius: 1rem;
      padding: 2rem;
      max-width: 600px;
      width: 100%;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    }
    h1 {
      font-size: 2rem;
      margin-bottom: 1.5rem;
      color: #1a202c;
    }
    .deck-list {
      list-style: none;
    }
    .deck-list li {
      margin-bottom: 0.75rem;
    }
    .deck-list a {
      display: block;
      padding: 1rem 1.25rem;
      background: #f7fafc;
      border-radius: 0.5rem;
      color: #4a5568;
      text-decoration: none;
      font-weight: 500;
      transition: all 0.2s;
    }
    .deck-list a:hover {
      background: #667eea;
      color: white;
      transform: translateX(4px);
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Slide Decks</h1>
    <ul class="deck-list">
EOF

# Add each deck as a list item
for deck in dist/*/; do
  if [ -d "$deck" ]; then
    name=$(basename "$deck")
    echo "      <li><a href=\"./$name/\">$name</a></li>" >> dist/index.html
  fi
done

cat >> dist/index.html << 'EOF'
    </ul>
  </div>
</body>
</html>
EOF

echo "Index page created at dist/index.html"
