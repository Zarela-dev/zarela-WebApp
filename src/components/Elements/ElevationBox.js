import styled from 'styled-components';
import { Box } from 'rebass/styled-components';
import {
	variant,
	color,
	space,
	compose,
	layout,
	borderColor,
	boxShadow,
} from 'styled-system';
import fulfilledIcon from './../../assets/icons/check-green.svg';

const Elevation = styled(Box)(
	compose(space, layout, color, borderColor, boxShadow),
	{
		padding: 0,
		margin: 0,
		border: 'none',
		borderRadius: '8px',
		backgroundColor: (props) => props.theme.elevations.e3,
	},
	variant({
		prop: 'variant',
		variants: {
			one: {
				boxShadow: '0px -3px 14px red',
				background: 'red',
			},
		},
	})
);

export const ElevationBox = (props) => {
	return <Elevation src={fulfilledIcon}>{props.children}</Elevation>;
};
