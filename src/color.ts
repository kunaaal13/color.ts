import { RGB } from './types';
import { clamp } from './utils';

/**
 * Color class: This class is used to create a color object. It is the main class of the package.
 */
class Color {
	private values: RGB;

	/**
	 * Constructor: This constructor is used to create a color object.
	 * @param r - Red value: 0-255
	 * @param g - Green value: 0-255
	 * @param b - Blue value: 0-255
	 * @param a - Alpha value: 0-1
	 */
	constructor(r: number, g: number, b: number, a = 1) {
		this.values = {
			r: clamp(r, 0, 255),
			g: clamp(g, 0, 255),
			b: clamp(b, 0, 255),
			a: clamp(a, 0, 1),
		};
	}

	/**
	 * Create a Color instance from RGB values
	 * @param r - Red value: 0-255
	 * @param g - Green value: 0-255
	 * @param b - Blue value: 0-255
	 * @param a - Alpha value: 0-1
	 */
	static rgb(r: number, g: number, b: number, a = 1): Color {
		return new Color(r, g, b, a);
	}

	/**
	 * Create a Color instance from an RGB string
	 * @param rgbString - RGB string: rgb(r, g, b)
	 */
	static parse(rgbString: string): Color {
		const match = rgbString.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/i);
		if (!match) throw new Error('Invalid RGB string');
		const [, r, g, b] = match.map(Number);
		return new Color(r, g, b);
	}

	// CHAINABLE METHODS
	/**
	 * Set the red value of the color
	 * @param r - Red value: 0-255
	 */
	setRed(r: number): Color {
		return new Color(r, this.values.g, this.values.b, this.values.a);
	}

	/**
	 * Set the green value of the color
	 * @param g - Green value: 0-255
	 */
	setGreen(g: number): Color {
		return new Color(this.values.r, g, this.values.b, this.values.a);
	}

	/**
	 * Set the blue value of the color
	 * @param b - Blue value: 0-255
	 */
	setBlue(b: number): Color {
		return new Color(this.values.r, this.values.g, b, this.values.a);
	}

	/**
	 * Set the alpha value of the color
	 * @param a - Alpha value: 0-1
	 */
	setAlpha(a: number): Color {
		return new Color(this.values.r, this.values.g, this.values.b, a);
	}

	/**
	 * Brighten the color
	 * @param amount - Amount to brighten: 0-100
	 */
	brighten(amount: number): Color {
		return new Color(
			this.values.r,
			this.values.g,
			this.values.b,
			this.values.a ? this.values.a + amount : 0
		);
	}

	/**
	 * Darken the color
	 * @param amount - Amount to darken: 0-100
	 */
	darken(amount: number): Color {
		return new Color(
			this.values.r,
			this.values.g,
			this.values.b,
			this.values.a ? this.values.a - amount : 0
		);
	}

	// Output methods
	/**
	 * Get the color as an RGB string
	 */
	toRgb(): string {
		return `rgb(${this.values.r}, ${this.values.g}, ${this.values.b})`;
	}

	/**
	 * Get the color as an RGBA string
	 */
	toRgba(): string {
		return `rgba(${this.values.r}, ${this.values.g}, ${this.values.b}, ${this.values.a})`;
	}

	/**
	 * Get the color as a hex string
	 */
	toHex(): string {
		return `#${this.values.r.toString(16).padStart(2, '0')}${this.values.g
			.toString(16)
			.padStart(2, '0')}${this.values.b.toString(16).padStart(2, '0')}`;
	}
}
export default Color;
