import styled from 'styled-components';
import { Box } from 'rebass/styled-components';
import {
	space,
	layout,
	color,
	compose,
	fontWeight,
	padding,
} from 'styled-system';
import { BodyText } from './Typography';

const BadgeWrapper = styled(Box)(
	compose(space, layout, color, fontWeight, padding),
	{
		boxSizing: 'border-box',
		fontFamily: 'Krub',
		backgroundColor: '#D13ADE',
		minWidth: '25px',
		maxHeight: '25px',
		minHeight: '25px',
		borderRadius: '12.5px',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		padding: '5px',
	},
	{
		'@media screen and (max-width: 64em)': {
			minWidth: '21px',
			minHeight: '21px',
			borderRadius: '10.5px',
		},
	}
);

export const Badge = (props) => {
	return (
		<BadgeWrapper {...props}>
			<BodyText
				variant='small'
				fontWeight='semiBold'
				color='white'
				fontSize={[7, 5]}
				lineHeight={[15, 12]}
			>
				{props.children}
			</BodyText>
		</BadgeWrapper>
	);
};
