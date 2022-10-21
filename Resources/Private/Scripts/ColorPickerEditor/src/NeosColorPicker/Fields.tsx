import React, { useCallback } from 'react';
import { isValidHex } from 'react-color/lib/helpers/color';
import { EditableInput } from 'react-color/lib/components/common';

import style from './Fields.module.css';

type FieldsProps = {
    rgb: RGBAColor;
    hsl: HSLColor;
    hex: HEXColor;
    onChange: ColorChange;
};

const Fields: React.FC<FieldsProps> = ({ onChange, rgb, hsl, hex }) => {
    const handleChange = useCallback(
        ({ hex, a, r, g, b }) => {
            if (hex) {
                if (isValidHex(hex)) {
                    onChange({
                        hex,
                        source: 'hex',
                    });
                }
            } else if (r || g || b) {
                onChange({
                    r: r || rgb.r,
                    g: g || rgb.g,
                    b: b || rgb.b,
                    a: rgb.a,
                    source: 'rgb',
                });
            } else if (a) {
                if (a < 0) {
                    a = 0;
                } else if (a > 100) {
                    a = 100;
                }
                onChange({
                    h: hsl.h,
                    s: hsl.s,
                    l: hsl.l,
                    a: a / 100,
                    source: 'rgb',
                });
            }
        },
        [onChange]
    );

    return (
        <div className={style.fields}>
            <div className={style.double}>
                <EditableInput label="hex" value={hex.replace('#', '')} onChange={handleChange} />
            </div>
            <div className={style.single}>
                <EditableInput label="r" value={rgb.r} onChange={handleChange} dragLabel="true" dragMax="255" />
            </div>
            <div className={style.single}>
                <EditableInput label="g" value={rgb.g} onChange={handleChange} dragLabel="true" dragMax="255" />
            </div>
            <div className={style.single}>
                <EditableInput label="b" value={rgb.b} onChange={handleChange} dragLabel="true" dragMax="255" />
            </div>
            <div className={style.alpha}>
                <EditableInput
                    label="a"
                    value={Math.round(rgb.a * 100)}
                    onChange={handleChange}
                    dragLabel="true"
                    dragMax="100"
                />
            </div>
        </div>
    );
};

export default Fields;
