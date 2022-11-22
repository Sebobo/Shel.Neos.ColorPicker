declare module '*.module.css';

type ColorPickerMode = 'hex' | 'rgba' | 'hsla' | 'preset';

type ColorPickerOptions = {
    mode: ColorPickerMode;
    picker: boolean;
    fields: boolean;
    allowEmpty: boolean;
    presetColors: PresetList | boolean;
};

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
type ColorDefinition = {
    color: ColorValue;
    title?: string;
    value?: string;
};

type PresetList = ColorDefinition[];

type ColorChange = (color: HSLColor | RGBAColor | { hex?: string; source: string }) => void;
