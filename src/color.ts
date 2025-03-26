import { RGB } from './types';
import { parseColor, rgbToHSL, rgbToHex } from './utils';

class Color {
	// In the core of the package, we use the RGB color model, any other color model is converted to RGB and stored in this property
	private values: RGB;

	constructor(values: RGB) {
		this.values = values;
	}

	// Parse a color from a string
	static parse(color: string) {
		return new Color(parseColor(color));
	}

	toString() {
		return `rgb(${this.values.r}, ${this.values.g}, ${this.values.b})`;
	}

	toHex() {
		return rgbToHex(this.values.r, this.values.g, this.values.b);
	}

	toHSL() {
		return rgbToHSL(this.values.r, this.values.g, this.values.b);
	}

	toRGB() {
		return this.values;
	}

	// Chainable methods
	setRed(r: number) {
		this.values.r = r;
		return this;
	}

	setGreen(g: number) {
		this.values.g = g;
		return this;
	}

	setBlue(b: number) {
		this.values.b = b;
		return this;
	}

	setAlpha(a: number) {
		this.values.a = a;
		return this;
	}

	lighten(amount: number) {
		this.values.r += amount;
		this.values.g += amount;
		this.values.b += amount;
		return this;
	}

	darken(amount: number) {
		this.values.r -= amount;
		this.values.g -= amount;
		this.values.b -= amount;
		return this;
	}

	brighten(amount: number) {
		this.values.r += amount;
		this.values.g += amount;
		this.values.b += amount;
		return this;
	}

	desaturate(amount: number) {
		this.values.r -= amount;
		this.values.g -= amount;
		this.values.b -= amount;
		return this;
	}
}

export default Color;

export function formatColor(color: string, format: 'hex' | 'rgb' | 'hsl') {
	const colorObject = new Color(parseColor(color));

	switch (format) {
		case 'hex':
			return colorObject.toHex();
		case 'rgb':
			return colorObject.toRGB();
		case 'hsl':
			return colorObject.toHSL();
		default:
			throw new Error(`Invalid format: ${format}`);
	}
}
