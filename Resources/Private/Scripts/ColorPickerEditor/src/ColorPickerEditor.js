import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {SketchPicker} from 'react-color';
import {IconButton} from '@neos-project/react-ui-components';

export default class ColorPickerEditor extends PureComponent {

    static propTypes = {
        value: PropTypes.string,
        commit: PropTypes.func.isRequired,
    };

    handleChangeColor = newColor => {
        const {mode} = this.getConfig();
        switch (mode) {
            case 'hsla':
                const h = +newColor.hsl.h.toFixed(3);
                const s = +newColor.hsl.s.toFixed(3);
                const l = +newColor.hsl.l.toFixed(3);
                this.props.commit('hsla(' + h + ',' + s * 100 + '%,' + l * 100 + '%,' + newColor.hsl.a + ')');
                break;
            case 'hex':
                this.props.commit(newColor.hex);
                break;
            case 'rgba':
            default:
                this.props.commit('rgba(' + newColor.rgb.r + ',' + newColor.rgb.g + ',' + newColor.rgb.b + ',' + newColor.rgb.a + ')');
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
        const customStyles = {
            'default': {
                picker: {
                    background: '#5a5a5a'
                }
            }
        };

        return (
            <div>
                <SketchPicker color={this.props.value} onChange={this.handleChangeColor} styles={customStyles}
                              width="auto"/>
                <IconButton style="lighter" icon="times" title="Reset" onClick={this.handleResetColorClick}/>
            </div>
        );
    }
}
