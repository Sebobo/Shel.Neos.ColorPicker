import * as React from 'react';
import { ColorWrap, Saturation, Checkboard } from 'react-color/lib/components/common';
import { IconButton } from '@neos-project/react-ui-components';

import Alpha from './Alpha';
import Hue from './Hue';
import Fields from './Fields';
import PresetColors from './PresetColors';

import style from './ColorPicker.module.css';

type ColorPickerProps = {
    mode: ColorPickerMode;
    color: string;
    onChange: ColorChange;
    onReset: () => void;
    width: string | number;
    picker: boolean;
    fields: boolean;
    presetColors: string[] | boolean;
    allowEmpty: boolean;
    // Props from ColorWrap
    rgb?: RGBAColor;
    hex?: HEXColor;
    hsv?: HSVColor;
    hsl?: HSLColor;
    onSwatchHover?: (color: string) => void;
    // FIXME: Set correct type
    renderers?: any;
    passedStyles?: Record<string, any>;
};

const ColorPicker: React.FC<ColorPickerProps> = ({
    mode = 'rgba',
    color, // Used by ColorWrap
    rgb, // Provided by ColorWrap
    hex, // Provided by ColorWrap
    hsv, // Provided by ColorWrap
    hsl, // Provided by ColorWrap
    onChange,
    onReset,
    onSwatchHover, // Provided by ColorWrap
    picker,
    fields,
    presetColors = [],
    allowEmpty,
    renderers,
}) => {
    const activeColor = `rgba(${rgb.r},${rgb.g},${rgb.b},${rgb.a})`;

    return (
        <div className={style.picker}>
            {picker ? (
                <div>
                    <div className={style.saturation}>
                        <Saturation hsl={hsl} hsv={hsv} onChange={onChange} />
                    </div>
                    <div className={style.controls}>
                        <div className={style.sliders}>
                            <div className={style.hue}>
                                <Hue hsl={hsl} onChange={onChange} />
                            </div>
                            {mode !== 'hex' && (
                                <div className={style.alpha}>
                                    <Alpha rgb={rgb} hsl={hsl} renderers={renderers} onChange={onChange} />
                                </div>
                            )}
                        </div>
                        <div className={style.color}>
                            <Checkboard />
                            <div style={{ background: activeColor }} className={style.activeColor} />
                        </div>
                        {allowEmpty && (
                            <div className={style.reset}>
                                <IconButton style="lighter" icon="times" title="Reset" onClick={onReset} />
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <div className={style.controls}>
                    <div className={style.colorWide}>
                        <Checkboard />
                        <div style={{ background: activeColor }} className={style.activeColor} />
                    </div>
                    {allowEmpty && (
                        <div className={style.reset}>
                            <IconButton style="lighter" icon="times" title="Reset" onClick={onReset} />
                        </div>
                    )}
                </div>
            )}
            {fields && <Fields rgb={rgb} hsl={hsl} hex={hex} mode={mode} onChange={onChange} />}
            {Array.isArray(presetColors) && (
                <PresetColors colors={presetColors} onClick={onChange} onSwatchHover={onSwatchHover} />
            )}
        </div>
    );
};

export default ColorWrap(ColorPicker);
