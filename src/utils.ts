import { HSL, RGB } from './types';

export function clamp(value: number, min: number, max: number): number {
	return Math.max(min, Math.min(max, value));
}

// Conversions
export function rgbToHex(r: number, g: number, b: number): string {
	return `#${r.toString(16).padStart(2, '0')}${g
		.toString(16)
		.padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

export function rgbToHSL(r: number, g: number, b: number): HSL {
	const max = Math.max(r, g, b);
	const min = Math.min(r, g, b);
	const delta = max - min;

	const h =
		delta === 0
			? 0
			: max === r
			  ? (g - b) / delta
			  : max === g
				  ? 2 + (b - r) / delta
				  : 4 + (r - g) / delta;
	const l = (max + min) / 2;
	const s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

	return {
		h: h * 60,
		s,
		l,
		a: 1,
	};
}

// Parse a color from the string, using this function i can parse the color from the string and return the rgba values
export function parseColor(color: string): RGB {
	// If we are not able to parse the color, we throw an error
	// Color can be of any format, rgb, rgba, hex, hsl, hsla, etc.

	// Hex color check
	if (color.startsWith('#')) {
		const hex = color.slice(1);
		return {
			r: parseInt(hex.slice(0, 2), 16),
			g: parseInt(hex.slice(2, 4), 16),
			b: parseInt(hex.slice(4, 6), 16),
		};
	}

	return { r: 0, g: 0, b: 0, a: 1 };
}
