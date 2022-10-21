import React, { useCallback, useEffect, useRef } from 'react';
import { calculateChange } from 'react-color/lib/helpers/hue';

import style from './Hue.module.css';

type HueProps = {
    hsl: HSLColor;
    onChange: ColorChange;
};

const Hue: React.FC<HueProps> = ({ hsl, onChange }) => {
    const container = useRef(null);

    const handleChange = useCallback(
        (e) => {
            const change = calculateChange(e, null, hsl, container.current);
            if (change) {
                onChange(change);
            }
        },
        [hsl, container]
    );

    const unbindEventListeners = useCallback(() => {
        window.removeEventListener('mousemove', handleChange);
        window.removeEventListener('mouseup', handleMouseUp);
    }, [handleChange]);

    const handleMouseDown = useCallback(
        (e) => {
            handleChange(e);
            window.addEventListener('mousemove', handleChange);
            window.addEventListener('mouseup', handleMouseUp);
        },
        [handleChange]
    );

    const handleMouseUp = useCallback(() => {
        unbindEventListeners();
    }, []);

    useEffect(() => {
        return unbindEventListeners;
    }, [unbindEventListeners]);

    return (
        <div className={style.hue}>
            <div
                className={style.container}
                ref={container}
                onMouseDown={handleMouseDown}
                onTouchMove={handleChange}
                onTouchStart={handleChange}
                role="slider"
            >
                <div style={{ left: `${(hsl.h * 100) / 360}%` }} className={style.pointer}>
                    <div className={style.slider} />
                </div>
            </div>
        </div>
    );
};

export default React.memo(Hue);
