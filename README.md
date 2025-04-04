# color.ts

A TypeScript library for color manipulation and conversion.

## Installation

```bash
npm install color.ts
```

## Usage

```typescript
import { Color } from 'color.ts'

// Create a color from hex
const color = new Color('#ff0000')

// Create a color from RGB
const rgbColor = new Color(255, 0, 0)

// Convert to different formats
console.log(color.toHex()) // '#ff0000'
console.log(color.toRgb()) // { r: 255, g: 0, b: 0 }
console.log(color.toHsl()) // { h: 0, s: 100, l: 50 }

// Manipulate colors
const lighter = color.lighten(20)
const darker = color.darken(20)

// Create from HSL
const hslColor = Color.fromHsl(0, 100, 50)
```

## Development

```bash
# Install dependencies
npm install

# Run in development mode with hot reload
npm run dev

# Build the project
npm run build

# Run the example
npm start
```

## Features

- Color creation from hex, RGB, and HSL
- Conversion between color formats
- Color manipulation (lighten/darken)
- TypeScript support with type definitions
- Zero dependencies

## License

ISC
