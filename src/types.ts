export interface RGB {
	r: number; // Red: 0-255
	g: number; // Green: 0-255
	b: number; // Blue: 0-255
	a?: number; // Alpha: 0-1
}

export interface HSL {
	h: number; // Hue: 0-360
	s: number; // Saturation: 0-100
	l: number; // Lightness: 0-100
	a?: number; // Alpha: 0-1
}
