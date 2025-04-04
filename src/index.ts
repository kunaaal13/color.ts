import { RGB } from './types';

class Color {
  // Private property to store the color: RGBA -> Colors will be stored as RGBA and converted to other formats when needed
  private color: RGB;

  constructor(color: RGB) {
    this.color = color;
  }
}

export default Color;
