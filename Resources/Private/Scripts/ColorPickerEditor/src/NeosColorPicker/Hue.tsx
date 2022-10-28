import React, { useCallback, useEffect, useRef, useState } from 'react';
import { calculateChange } from 'react-color/lib/helpers/hue';

import style from './Hue.module.css';

type HueProps = {
    hsl: HSLColor;
    onChange: ColorChange;
};

const Hue: React.FC<HueProps> = ({ hsl, onChange }) => {
    const container = useRef(null);
    const [isDragging, setIsDragging] = useState(false);

    const handleChange = useCallback(
        (e) => {
            const change = calculateChange(e, null, hsl, container.current);
            if (change) {
                onChange(change);
            }
        },
        [hsl, container]
    );

    const handleMouseDown = useCallback(
        (e) => {
            handleChange(e);
            setIsDragging(true);
        },
        [handleChange]
    );

    const handleMouseUp = useCallback(() => {
        setIsDragging(false);
    }, []);

    useEffect(() => {
        if (isDragging) {
            window.addEventListener('mousemove', handleChange);
            window.addEventListener('mouseup', handleMouseUp);
        } else {
            window.removeEventListener('mousemove', handleChange);
            window.removeEventListener('mouseup', handleMouseUp);
        }

        return () => {
            window.removeEventListener('mousemove', handleChange);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging]);

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
