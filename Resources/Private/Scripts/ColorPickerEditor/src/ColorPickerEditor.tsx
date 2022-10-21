import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import NeosColorPicker from './NeosColorPicker/ColorPicker';

type ColorPickerOptions = {
    presetColors: string[] | boolean;
};

type ColorPickerProps = {
    value: string;
    commit: (value: string) => void;
    options: {
        mode: 'hex' | 'rgba' | 'hsla';
        picker: boolean;
        fields: boolean;
        allowEmpty: boolean;
        presetColors: string[] | boolean;
    };
};

export default function makeColorPickerEditor(defaults: ColorPickerOptions) {
    return class ColorPickerEditor extends PureComponent<ColorPickerProps> {
        static propTypes = {
            value: PropTypes.string,
            commit: PropTypes.func.isRequired,
            options: PropTypes.shape({
                mode: PropTypes.string,
                picker: PropTypes.bool,
                fields: PropTypes.bool,
                allowEmpty: PropTypes.bool,
                presetColors: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
            }),
        };

        handleChangeColor = (newColor) => {
            const { commit, options } = this.props;

            switch (options.mode) {
                case 'hsla': {
                    const h = Number(newColor.hsl.h.toFixed(3));
                    const s = Number(newColor.hsl.s.toFixed(3));
                    const l = Number(newColor.hsl.l.toFixed(3));
                    commit(`hsla(${h},${s * 100}%,${l * 100}%,${newColor.hsl.a})`);
                    break;
                }
                case 'hex': {
                    commit(newColor.hex);
                    break;
                }
                case 'rgba':
                default: {
                    commit(`rgba(${newColor.rgb.r},${newColor.rgb.g},${newColor.rgb.b},${newColor.rgb.a})`);
                }
            }
        };

        handleResetColorClick = (): void => {
            this.props.commit('');
        };

        render() {
            const { value, options } = this.props;

            let presetColors = defaults.presetColors;
            if (Array.isArray(options.presetColors) || options.presetColors === false) {
                presetColors = options.presetColors;
            }

            return (
                <div className="neos-color-picker">
                    <NeosColorPicker
                        mode={options.mode}
                        color={value ?? ''}
                        onChange={this.handleChangeColor}
                        onReset={this.handleResetColorClick}
                        picker={options.picker}
                        fields={options.fields}
                        presetColors={presetColors}
                        allowEmpty={options.allowEmpty}
                    />
                </div>
            );
        }
    };
}
