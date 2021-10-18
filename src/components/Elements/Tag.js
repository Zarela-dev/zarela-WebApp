import styled from 'styled-components';
import { Box } from 'rebass/styled-components';
import {
	variant,
	space,
	layout,
	color,
	compose,
	fontWeight,
	padding,
} from 'styled-system';
import { BodyText } from './Typography';

const TagWrapper = styled(Box)(
	compose(space, layout, color, fontWeight, padding),
	{
		borderRadius: '4px',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		margin: '0 5px',
		padding: '2px 5px',
	},
	variant({
		prop: 'variant',
		variants: {
			selected: {
        background: '',
			},
			selectList: {
				background: '',
			},
			display: {
				background: 'white',
				border: '1px solid #E1E5F5',
			},
		},
	})
);

export const ThemeTag = (props) => {
	return (
		<TagWrapper key={props.item} {...props}>
			<BodyText variant='tag'>#{props.item}</BodyText>
		</TagWrapper>
	);
};
