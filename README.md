# color.ts

A comprehensive TypeScript library for color manipulation and conversion.

## Features

- Color space conversions (RGB, HSL, HEX, etc.)
- Color manipulation (lighten, darken, saturate, etc.)
- Color parsing and validation
- Type-safe color operations
- Zero dependencies

## Installation

```bash
npm install color.ts
```

## Usage

```typescript
import { Color } from 'color.ts';

// Create a color from hex
const color = Color.fromHex('#ff0000');

// Convert to different formats
console.log(color.toRgb()); // { r: 255, g: 0, b: 0 }
console.log(color.toHsl()); // { h: 0, s: 100, l: 50 }

// Manipulate colors
const lighter = color.lighten(0.2);
const darker = color.darken(0.2);
```

## Development

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run tests:
   ```bash
   npm test
   ```
4. Build the project:
   ```bash
   npm run build
   ```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License 