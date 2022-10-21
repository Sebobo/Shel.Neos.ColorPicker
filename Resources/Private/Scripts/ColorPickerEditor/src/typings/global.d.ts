declare module '*.module.css';

type ColorPickerMode = 'hex' | 'rgba' | 'hsla';

type HSLColor = {
    h: number;
    s: number;
    l: number;
    a: number;
};

type RGBAColor = {
    r: number;
    g: number;
    b: number;
    a: number;
};

type HEXColor = string;
type HSVColor = string;

type ColorValue = string;
type ColorDefinition = { color: ColorValue; title: string };

type ColorChange = (color: HSLColor | RGBAColor | { hex?: string; source: string }) => void;
