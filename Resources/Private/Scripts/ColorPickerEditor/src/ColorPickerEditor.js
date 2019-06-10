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
        this.props.commit('rgba(' + newColor.rgb.r + ',' + newColor.rgb.g + ',' + newColor.rgb.b + ',' + newColor.rgb.a + ')');
    };

    handleResetColorClick = () => {
        this.props.commit('');
    };

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
