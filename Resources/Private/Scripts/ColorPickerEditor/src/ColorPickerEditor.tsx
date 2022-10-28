import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import NeosColorPicker from './NeosColorPicker/ColorPicker';

type ColorPickerOptions = {
    presetColors: PresetList | boolean;
};

type ColorPickerProps = {
    value: string;
    commit: (value: string) => void;
    options: {
        mode: ColorPickerMode;
        picker: boolean;
        fields: boolean;
        allowEmpty: boolean;
        presetColors: PresetList | boolean;
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

        private presetColors: ColorDefinition[];

        handleChangeColor = (newColor) => {
            const { commit, options } = this.props;
            
            switch (options.mode) {
                // In the mode "preset", the value to be stored might can be defined in the color definition value
                case 'preset': {
                    const matchingPreset = this.presetColors.find((preset) => preset.color === newColor.hex);
                    if (matchingPreset) {
                        commit(matchingPreset.value);
                    }
                    break;
                }
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
            const presetsOnly = options.mode === 'preset';
            let currentValue = value;

            let presetColors = defaults.presetColors;
            if (Array.isArray(options.presetColors) || options.presetColors === false) {
                presetColors = options.presetColors;
            }

            if (Array.isArray(presetColors)) {
                presetColors = presetColors
                    .map((preset: string | ColorDefinition) => {
                        if (typeof preset === 'string') {
                            return {
                                color: preset,
                                title: preset,
                                value: preset,
                            };
                        }
                        if (!preset.color) {
                            console.error('Invalid preset color definition for ColorPicker', preset);
                            return null;
                        }
                        return {
                            color: preset.color,
                            title: preset.title || preset.color,
                            value: preset.value || preset.color,
                        };
                    })
                    .filter((preset) => preset !== null);
            } else {
                presetColors = [];
            }
            this.presetColors = presetColors;

            console.debug('Presets', presetColors);

            // If the current value matches the value of a ColorDefinition in the presetColors, use its color instead
            if (currentValue && options.mode === 'preset' && presetColors.length > 0) {
                const selectedColorDefinition = presetColors.find((color) => color.value === currentValue);
                currentValue = selectedColorDefinition.color;
            }

            return (
                <div className="neos-color-picker">
                    <NeosColorPicker
                        mode={options.mode}
                        color={currentValue ?? ''}
                        onChange={this.handleChangeColor}
                        onReset={this.handleResetColorClick}
                        picker={!presetsOnly && options.picker}
                        fields={!presetsOnly && options.fields}
                        presetColors={presetColors}
                        allowEmpty={options.allowEmpty}
                    />
                </div>
            );
        }
    };
}
