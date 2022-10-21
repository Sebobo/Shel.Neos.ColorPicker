import React, { useCallback } from 'react';
import { Swatch } from 'react-color/lib/components/common';

import style from './PresetColors.module.css';

type PresetColorsProps = {
    colors: (ColorValue | ColorDefinition)[];
    onClick: ColorChange;
    onSwatchHover: (color: string) => void;
};

const PresetColors: React.FC<PresetColorsProps> = ({ colors, onClick, onSwatchHover }) => {
    const handleClick = useCallback(
        (hex: string) => {
            onClick({
                hex,
                source: 'hex',
            });
        },
        [onClick]
    );

    if (!colors || !colors.length) {
        return null;
    }

    return (
        <div className={style.colors}>
            {colors.map((colorObjOrString) => {
                const c =
                    typeof colorObjOrString === 'string' ? { color: colorObjOrString, title: '' } : colorObjOrString;
                const key = `${c.color}${c.title || ''}`;

                return (
                    <div key={key} className={style.swatchWrap}>
                        <Swatch
                            {...c}
                            className={style.swatch}
                            onClick={handleClick}
                            onHover={onSwatchHover}
                            focusStyle={{
                                boxShadow: `inset 0 0 0 1px rgba(0,0,0,.15), 0 0 4px ${c.color}`,
                            }}
                        />
                    </div>
                );
            })}
        </div>
    );
};

export default React.memo(PresetColors);
