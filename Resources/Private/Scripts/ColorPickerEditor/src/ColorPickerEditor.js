import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import NeosColorPicker from './NeosColorPicker/ColorPicker';

export default class ColorPickerEditor extends PureComponent {
    static propTypes = {
        value: PropTypes.string,
        commit: PropTypes.func.isRequired,
        options: PropTypes.shape({
            picker: PropTypes.bool,
            fields: PropTypes.bool,
            presetColors: PropTypes.oneOfType([
                PropTypes.array,
                PropTypes.bool
            ])
        })
    };

    static defaultProps = {
        options: {
            picker: true,
            fields: true
        }
    };

    handleChangeColor = newColor => {
        const {mode} = this.getConfig();
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

        if (Array.isArray(this.props.options.presetColors) || this.props.options.presetColors === false) {
            presetColors = this.props.options.presetColors;
        }

        return (
            <div>
                <NeosColorPicker
                    color={this.props.value}
                    onChange={this.handleChangeColor}
                    onReset={this.handleResetColorClick}
                    width="auto"
                    picker={this.props.options.picker}
                    fields={this.props.options.fields}
                    presetColors={presetColors} />
            </div>
        );
    }
}
