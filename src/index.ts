/**
 * Core color interfaces and types
 */

export interface RGB {
  r: number;
  g: number;
  b: number;
  a?: number;
}

export interface HSL {
  h: number;
  s: number;
  l: number;
  a?: number;
}

export interface HSV {
  h: number;
  s: number;
  v: number;
  a?: number;
}

export type ColorSpace = 'rgb' | 'hsl' | 'hsv' | 'hex';

/**
 * Main Color class
 */
export class Color {
  private values: RGB;

  constructor(r: number, g: number, b: number, a: number = 1) {
    this.values = { r, g, b, a };
  }

  /**
   * Create a Color instance from hex string
   */
  static fromHex(hex: string): Color {
    // Remove # if present
    hex = hex.replace('#', '');
    
    // Parse hex values
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    
    return new Color(r, g, b);
  }

  /**
   * Convert color to hex string
   */
  toHex(): string {
    const { r, g, b } = this.values;
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  }

  /**
   * Get RGB values
   */
  toRgb(): RGB {
    return { ...this.values };
  }
} 