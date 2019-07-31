import React, {Component, PureComponent} from 'react';
import reactCSS from 'reactcss';
import {calculateChange} from 'react-color/lib/helpers/hue';

export class Hue extends (PureComponent || Component) {
    componentWillUnmount() {
        this.unbindEventListeners();
    }

    handleChange = e => {
        const change = calculateChange(e, 'horizontal', this.props, this.container);
        if (change && typeof this.props.onChange === 'function') {
            this.props.onChange(change, e);
        }
    };

    handleMouseDown = e => {
        this.handleChange(e);
        window.addEventListener('mousemove', this.handleChange);
        window.addEventListener('mouseup', this.handleMouseUp);
    };

    handleMouseUp = () => {
        this.unbindEventListeners();
    };

    unbindEventListeners() {
        window.removeEventListener('mousemove', this.handleChange);
        window.removeEventListener('mouseup', this.handleMouseUp);
    }

    render() {
        const styles = reactCSS({
            'default': {
                hue: {
                    absolute: '0px 0px 0px 0px',
                    borderRadius: this.props.radius,
                    boxShadow: this.props.shadow
                },
                container: {
                    padding: '0 2px',
                    position: 'relative',
                    height: '100%',
                    borderRadius: '2px',
                    background: 'linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%)'
                },
                pointer: {
                    position: 'absolute',
                    left: `${(this.props.hsl.h * 100) / 360}%`,
                    borderRadius: '2px'
                },
                slider: {
                    marginTop: '-2px',
                    width: '4px',
                    height: '19px',
                    background: '#fff',
                    borderRadius: '2px',
                    transform: 'translateX(-2px)'
                }
            }
        });

        return (
            <div style={ styles.hue }>
                <div
                    style={ styles.container }
                    ref={
                        container => {
                            this.container = container;
                        }
                    }
                    onMouseDown={ this.handleMouseDown }
                    onTouchMove={ this.handleChange }
                    onTouchStart={ this.handleChange }
                    role="slider">
                    <div style={ styles.pointer }>
                        { this.props.pointer ? (<this.props.pointer { ...this.props } />) : (<div style={ styles.slider } />) }
                    </div>
                </div>
            </div>
        );
    }
}

export default Hue;
