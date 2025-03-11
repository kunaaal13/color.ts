import Color from './color';

const color = new Color({ r: 2, g: 2, b: 2 });

color.setRed(10).setGreen(10).setBlue(10).lighten(0.1).toHex();
