import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import NeosColorPicker from './NeosColorPicker/ColorPicker';

export default class ColorPickerEditor extends PureComponent {
    static propTypes = {
        value: PropTypes.string,
        commit: PropTypes.func.isRequired,
        options: PropTypes.objectOf(PropTypes.bool)
    };

    static defaultProps = {
        options: {
            disablePicker: false,
            disableFields: false,
            disablePresetColors: false
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
        const {presetColors} = this.getConfig();

        return (
            <div>
                <NeosColorPicker
                    color={this.props.value}
                    onChange={this.handleChangeColor}
                    onReset={this.handleResetColorClick}
                    width="auto"
                    disablePicker={this.props.options.disablePicker}
                    disableFields={this.props.options.disableFields}
                    disablePresetColors={this.props.options.disablePresetColors}
                    presetColors={presetColors} />
            </div>
        );
    }
}
