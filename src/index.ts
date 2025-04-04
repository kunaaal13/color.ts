import { RGB } from './types';
import { rgbToHex } from './utils/hex';
class Color {
  // Private property to store the color: RGBA -> Colors will be stored as RGBA and converted to other formats when needed
  private color: RGB;

  constructor(color: RGB) {
    this.color = color;
  }

  // Stringify the color
  toString() {
    return `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.color.a})`;
  }

  // Converters
  toHex() {
    return rgbToHex(this.color);
  }

  toHsl() {}
}

export default Color;
