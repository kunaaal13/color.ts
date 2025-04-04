import { RGB } from '../types';

const HEX_REGEX = /^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

// Parse a hex color to RGB
export function parseHex(hex: string): RGB {
  // Check if the hex is valid
  if (!HEX_REGEX.test(hex)) {
    throw new Error('Invalid hex color');
  }

  // Remove whitespace and hash
  let cleanHex = hex.replace(/\s/g, '').replace('#', '');

  // Check if the hex is 3 or 6 characters
  if (cleanHex.length === 3) {
    // Convert 3 character hex to 6 character hex by repeating each character
    cleanHex = cleanHex
      .split('')
      .map((char) => char + char)
      .join('');
  }

  // Convert the hex to RGB
  const r = parseInt(cleanHex.slice(0, 2), 16);
  const g = parseInt(cleanHex.slice(2, 4), 16);
  const b = parseInt(cleanHex.slice(4, 6), 16);

  return { r, g, b };
}

// Convert a color to hex
export function rgbToHex(color: RGB) {
  return `#${color.r.toString(16).padStart(2, '0')}${color.g.toString(16).padStart(2, '0')}${color.b.toString(16).padStart(2, '0')}`;
}
