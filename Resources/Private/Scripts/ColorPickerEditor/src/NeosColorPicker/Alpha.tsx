import React, { useCallback, useEffect, useRef, useState } from 'react';
import { calculateChange } from 'react-color/lib/helpers/alpha';
import Checkboard from 'react-color/lib/components/common/Checkboard';

import style from './Alpha.module.css';

type AlphaProps = {
    hsl: HSLColor;
    rgb: RGBAColor;
    renderers: any;
    onChange: ColorChange;
};

const Alpha: React.FC<AlphaProps> = ({ hsl, rgb, renderers, onChange }) => {
    const container = useRef(null);
    const [isDragging, setIsDragging] = useState(false);

    const handleChange = useCallback(
        (e) => {
            const change = calculateChange(e, hsl, null, rgb.a, container.current);
            if (change) {
                onChange(change);
            }
        },
        [hsl, rgb, container]
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
        <div className={style.alpha}>
            <div className={style.checkboard}>
                <Checkboard renderers={renderers} />
            </div>
            <div
                style={{
                    background: `linear-gradient(to right, rgba(${rgb.r},${rgb.g},${rgb.b}, 0) 0%, rgba(${rgb.r},${rgb.g},${rgb.b}, 1) 100%)`,
                }}
                className={style.gradient}
            />
            <div
                className={style.container}
                ref={container}
                onMouseDown={handleMouseDown}
                onTouchMove={handleChange}
                onTouchStart={handleChange}
                aria-valuenow={rgb.a}
                role="slider"
            >
                <div style={{ left: `${rgb.a * 100}%` }} className={style.pointer}>
                    {<div className={style.slider} />}
                </div>
            </div>
        </div>
    );
};

export default React.memo(Alpha);
