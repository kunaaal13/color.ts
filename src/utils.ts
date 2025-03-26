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

export function cleanColorString(color: string): string {
	// remove all whitespace and convert to lowercase so we can easily compare the color
	return color.trim().toLowerCase();
}

export function parseHexColor(color: string): RGB {
	// remove the # from the color and check for 3 or 6 digits
	let hex = color.slice(1);

	// if we have 3 digits, we need to repeat each digit twice
	if (hex.length === 3) {
		// repeat each digit twice
		hex = hex
			.split('')
			.map((char) => char + char)
			.join('');
	}

	// Check with regex if we have a valid hex color
	if (!/^[0-9a-f]{6}$/.test(hex)) {
		throw new Error('Invalid hex color format');
	}

	// convert the hex color to rgb
	const r = parseInt(hex.slice(0, 2), 16);
	const g = parseInt(hex.slice(2, 4), 16);
	const b = parseInt(hex.slice(4, 6), 16);
	const a = 1;

	return { r, g, b, a };
}

export function parseRGBColor(color: string): RGB {
	// remove the rgb or rgba from the color
	let cleanedColor = color.slice(4);

	// check if we have a valid rgb or rgba color
	if (!cleanedColor.startsWith('(') || !cleanedColor.endsWith(')')) {
		throw new Error('Invalid rgb or rgba color format');
	}

	// remove the parentheses
	cleanedColor = cleanedColor.slice(1, -1);

	// split the color by commas
	const colorParts = cleanedColor.split(',');

	// check if we have 3 or 4 parts
	if (colorParts.length !== 3 && colorParts.length !== 4) {
		throw new Error('Invalid rgb or rgba color format');
	}

	// parse the color parts
	const r = parseInt(colorParts[0]);
	const g = parseInt(colorParts[1]);
	const b = parseInt(colorParts[2]);
	const a = colorParts[3] ? parseInt(colorParts[3]) : 1;

	return { r, g, b, a };
}

function hslToRgb(h: number, s: number, l: number): RGB {
	const hh = h % 360;
	const ss = clamp(s / 100, 0, 1);
	const ll = clamp(l / 100, 0, 1);

	const c = (1 - Math.abs(2 * ll - 1)) * ss;
	const x = c * (1 - Math.abs(((hh / 60) % 2) - 1));
	const m = ll - c / 2;

	let r = 0;
	let g = 0;
	let b = 0;

	if (hh >= 0 && hh < 60) {
		r = c;
		g = x;
		b = 0;
	} else if (hh < 120) {
		r = x;
		g = c;
		b = 0;
	} else if (hh < 180) {
		r = 0;
		g = c;
		b = x;
	} else if (hh < 240) {
		r = 0;
		g = x;
		b = c;
	} else if (hh < 300) {
		r = x;
		g = 0;
		b = c;
	} else if (hh < 360) {
		r = c;
		g = 0;
		b = x;
	}

	return {
		r: Math.round((r + m) * 255),
		g: Math.round((g + m) * 255),
		b: Math.round((b + m) * 255),
	};
}

export function parseHSLColor(color: string): RGB {
	// remove the hsl or hsla from the color
	let cleanedColor = color.slice(4);

	// check if we have a valid hsl or hsla color
	if (!cleanedColor.startsWith('(') || !cleanedColor.endsWith(')')) {
		throw new Error('Invalid hsl or hsla color format');
	}

	// remove the parentheses
	cleanedColor = cleanedColor.slice(1, -1);

	// split the color by commas
	const colorParts = cleanedColor.split(',');

	// check if we have 3 or 4 parts
	if (colorParts.length !== 3 && colorParts.length !== 4) {
		throw new Error('Invalid hsl or hsla color format');
	}

	// parse the color parts
	const h = parseInt(colorParts[0]);
	const s = parseInt(colorParts[1]);
	const l = parseInt(colorParts[2]);
	const a = colorParts[3] ? parseInt(colorParts[3]) : 1;

	// convert the hsl color to rgb
	const rgb = hslToRgb(h, s, l);

	return { r: rgb.r, g: rgb.g, b: rgb.b, a };
}

// Parse a color from the string, using this function i can parse the color from the string and return the rgba values
export function parseColor(color: string): RGB {
	// check if we have a valid color
	if (!color || typeof color !== 'string') {
		throw new Error('Invalid input, expected color as a string');
	}

	// Clean up the color string
	const cleanedColor = cleanColorString(color);

	// Check if the color is a hex color
	if (cleanedColor.startsWith('#')) {
		return parseHexColor(cleanedColor);
	}

	// rgb or rgba check
	if (cleanedColor.startsWith('rgb') || cleanedColor.startsWith('rgba')) {
		return parseRGBColor(cleanedColor);
	}

	// hsl or hsla check
	if (cleanedColor.startsWith('hsl') || cleanedColor.startsWith('hsla')) {
		return parseHSLColor(cleanedColor);
	}

	throw new Error(`Unable to parse color: ${color}`);
}
