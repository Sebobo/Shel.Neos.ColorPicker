import React, { useCallback } from 'react';
import { Swatch } from 'react-color/lib/components/common';

import style from './PresetColors.module.css';

type PresetColorsProps = {
    colors: PresetList;
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
            {colors.map((preset) => {
                const key = `${preset.color}${preset.title || ''}`;

                return (
                    <div key={key} className={style.swatchWrap}>
                        <Swatch
                            {...preset}
                            className={style.swatch}
                            onClick={handleClick}
                            onHover={onSwatchHover}
                            focusStyle={{
                                boxShadow: `inset 0 0 0 1px rgba(0,0,0,.15), 0 0 4px ${preset.color}`,
                            }}
                        />
                    </div>
                );
            })}
        </div>
    );
};

export default React.memo(PresetColors);
