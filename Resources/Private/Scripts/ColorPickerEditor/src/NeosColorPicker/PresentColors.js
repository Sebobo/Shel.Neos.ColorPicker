import React from 'react'
import PropTypes from 'prop-types'
import reactCSS from 'reactcss'

import { Swatch } from 'react-color/lib/components/common'

export const PresetColors = ({ colors, onClick = () => {}, onSwatchHover }) => {
	const styles = reactCSS({
		'default': {
			colors: {
				position: 'relative',
				display: 'grid',
				gridTemplateColumns: 'repeat(auto-fit, minmax(18px, 1fr))',
				gridGap: '10px',
				marginTop: '5px',
				paddingTop: '15px',
				borderTop: '1px solid #3f3f3f',
			},
			swatchWrap: {
				width: '18px',
				height: '18px',
			},
			swatch: {
				border: '1px solid #3f3f3f',
				borderRadius: '2px',
			},
		},
		'no-presets': {
			colors: {
				display: 'none',
			},
		},
	}, {
		'no-presets': !colors || !colors.length,
	})
	
	const handleClick = (hex, e) => {
		onClick({
			hex,
			source: 'hex',
		}, e)
	}
	
	return (
		<div style={ styles.colors } className="flexbox-fix">
			{ colors.map((colorObjOrString) => {
				const c = typeof colorObjOrString === 'string'
					? { color: colorObjOrString }
					: colorObjOrString
				const key = `${c.color}${c.title || ''}`
				return (
					<div key={ key } style={ styles.swatchWrap }>
						<Swatch
							{ ...c }
							style={ styles.swatch }
							onClick={ handleClick }
							onHover={ onSwatchHover }
							focusStyle={{
								boxShadow: `inset 0 0 0 1px rgba(0,0,0,.15), 0 0 4px ${ c.color }`,
							}}
						/>
					</div>
				)
			}) }
		</div>
	)
}

PresetColors.propTypes = {
	colors: PropTypes.arrayOf(PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.shape({
			color: PropTypes.string,
			title: PropTypes.string,
		})],
	)).isRequired,
}

export default PresetColors
