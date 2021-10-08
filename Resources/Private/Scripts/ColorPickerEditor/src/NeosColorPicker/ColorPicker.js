import React from 'react';
import PropTypes from 'prop-types';
import reactCSS from 'reactcss';
import merge from 'lodash/merge';
import {ColorWrap, Saturation, Checkboard} from 'react-color/lib/components/common';
import {IconButton} from '@neos-project/react-ui-components';

import Alpha from './Alpha';
import Hue from './Hue';
import Fields from './Fields';
import PresetColors from './PresetColors';

export const ColorPicker = ({width, rgb, hex, hsv, hsl, onChange, onReset, onSwatchHover, picker, fields, presetColors, allowEmpty, renderers, styles: passedStyles = {}, className = ''}) => {
    const styles = reactCSS(merge({
        'default': {
            picker: {
                padding: '0',
                boxSizing: 'initial',
                width,
                background: 'transparent',
                borderRadius: '0'
            },
            saturation: {
                position: 'relative',
                marginBottom: '10px',
                paddingBottom: '75%',
                overflow: 'hidden',
                width: '100%',
                borderRadius: '2px'
            },
            Saturation: {
                radius: '2px'
            },
            controls: {
                display: 'flex',
                paddingBottom: '10px'
            },
            sliders: {
                display: 'flex',
                flex: '1',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '1px 0'
            },
            color: {
                position: 'relative',
                overflow: 'hidden',
                width: '41px',
                height: '41px',
                background: '#fff',
                border: '1px solid #323232',
                borderRadius: '2px'
            },
            colorWide: {
                position: 'relative',
                overflow: 'hidden',
                width: '100%',
                height: '41px',
                background: '#fff',
                border: '1px solid #323232',
                borderRadius: '2px'
            },
            activeColor: {
                absolute: '0px 0px 0px 0px',
                background: `rgba(${rgb.r},${rgb.g},${rgb.b},${rgb.a})`,
                boxShadow: 'none'
            },
            hue: {
                position: 'relative',
                marginRight: '10px',
                height: '15px',
                borderRadius: '2px'
            },
            Hue: {
                radius: '2px',

                slider: {
                    marginTop: '-2px',
                    height: '2px',
                    background: '#fff',
                    boxShadow: 'none',
                    borderRadius: '2px'
                }
            },

            alpha: {
                position: 'relative',
                marginRight: '10px',
                height: '15px',
                overflow: 'visible',
                borderRadius: '2px',
                background: '#fff'
            },
            Alpha: {
                radius: '0',

                slider: {
                    marginTop: '-2px',
                    height: '19px',
                    background: '#fff',
                    boxShadow: 'none',
                    borderRadius: '2px'
                }
            },

            reset: {
                marginLeft: '10px'
            },
            ...passedStyles
        }
    }, passedStyles));

    function renderPicker() {
        if (picker) {
            return (
                <div>
                    <div style={ styles.saturation }>
                        <Saturation
                            style={ styles.Saturation }
                            hsl={ hsl }
                            hsv={ hsv }
                            onChange={ onChange }
                        />
                    </div>
                    <div style={ styles.controls } className="flexbox-fix">
                        <div style={ styles.sliders }>
                            <div style={ styles.hue }>
                                <Hue
                                    style={ styles.Hue }
                                    hsl={ hsl }
                                    onChange={ onChange }
                                />
                            </div>
                            <div style={ styles.alpha }>
                                <Alpha
                                    style={ styles.Alpha }
                                    rgb={ rgb }
                                    hsl={ hsl }
                                    renderers={ renderers }
                                    onChange={ onChange }
                                />
                            </div>
                        </div>
                        <div style={ styles.color }>
                            <Checkboard />
                            <div style={ styles.activeColor } />
                        </div>
                        {allowEmpty && (
                            <div style={ styles.reset }>
                                <IconButton style="lighter" icon="times" title="Reset" onClick={ onReset }/>
                            </div>
                        )}
                    </div>
                </div>
            );
        }

        return (
            <div style={ styles.controls } className="flexbox-fix">
                <div style={ styles.colorWide }>
                    <Checkboard />
                    <div style={ styles.activeColor } />
                </div>
                <div style={ styles.reset }>
                    <IconButton style="lighter" icon="times" title="Reset" onClick={ onReset }/>
                </div>
            </div>
        );
    }

    function renderFields() {
        if (fields) {
            return (
                <Fields
                    rgb={ rgb }
                    hsl={ hsl }
                    hex={ hex }
                    onChange={ onChange }
                />
            );
        }
    }

    function renderPresetColor() {
        if (Array.isArray(presetColors)) {
            return (
                <PresetColors
                    colors={ presetColors }
                    onClick={ onChange }
                    onSwatchHover={ onSwatchHover }
                />
            );
        }
    }

    return (
        <div style={ styles.picker } className={ `neos-color-picker ${className}` }>
            {renderPicker()}
            {renderFields()}
            {renderPresetColor()}
        </div>
    );
};

ColorPicker.propTypes = {
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    styles: PropTypes.object,
    picker: PropTypes.bool,
    fields: PropTypes.bool,
    presetColors: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.bool
    ])
};

ColorPicker.defaultProps = {
    width: 'auto',
    styles: {},
    presetColors: ['#D0021B', '#F5A623', '#F8E71C', '#8B572A', '#7ED321', '#417505', '#BD10E0', '#9013FE', '#4A90E2', '#50E3C2', '#B8E986', '#000000', '#4A4A4A', '#9B9B9B', '#FFFFFF']
};

export default ColorWrap(ColorPicker);
