import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import NeosColorPicker from './NeosColorPicker/ColorPicker';

export default class ColorPickerEditor extends PureComponent {
    static propTypes = {
        value: PropTypes.string,
        commit: PropTypes.func.isRequired,
        options: PropTypes.shape({
            mode: PropTypes.string,
            picker: PropTypes.bool,
            fields: PropTypes.bool,
            allowEmpty: PropTypes.bool,
            presetColors: PropTypes.oneOfType([
                PropTypes.array,
                PropTypes.bool
            ])
        })
    };

    static defaultProps = {
        options: {
            picker: true,
            fields: true,
            allowEmpty: true
        }
    };

    handleChangeColor = newColor => {
        let {mode} = this.getConfig();
        mode = (this.props.options.mode) ? this.props.options.mode : mode;

        switch (mode) {
            case 'hsla': {
                const h = Number(newColor.hsl.h.toFixed(3));
                const s = Number(newColor.hsl.s.toFixed(3));
                const l = Number(newColor.hsl.l.toFixed(3));
                this.props.commit('hsla(' + h + ',' + (s * 100) + '%,' + (l * 100) + '%,' + newColor.hsl.a + ')');
                break;
            }
            case 'hex': {
                this.props.commit(newColor.hex);
                break;
            }
            case 'rgba':
            default: {
                this.props.commit('rgba(' + newColor.rgb.r + ',' + newColor.rgb.g + ',' + newColor.rgb.b + ',' + newColor.rgb.a + ')');
            }
        }
    };

    handleResetColorClick = () => {
        this.props.commit('');
    };

    getConfig() {
        return {
            mode: 'rgba'
        };
    }

    render() {
        let {presetColors} = this.getConfig();
        const {value, options} = this.props;

        if (Array.isArray(options.presetColors) || options.presetColors === false) {
            presetColors = options.presetColors;
        }

        return (
            <div>
                <NeosColorPicker
                    color={value}
                    onChange={this.handleChangeColor}
                    onReset={this.handleResetColorClick}
                    width="auto"
                    picker={options.picker}
                    fields={options.fields}
                    presetColors={presetColors}
                    allowEmpty={options.allowEmpty}
                />
            </div>
        );
    }
}
