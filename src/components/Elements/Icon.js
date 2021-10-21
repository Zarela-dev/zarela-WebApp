import styled from 'styled-components';
import { Image } from 'rebass/styled-components';
import {
	variant,
	space,
	layout,
	color,
	compose,
	fontWeight,
	padding,
} from 'styled-system';

const IconWrapper = styled(Image)(
	compose(space, layout, color, fontWeight, padding),
	variant({
		prop: 'variant',
		variants: {
			big: {
				height: ['32px', '24px'],
				width: ['32px', '24px'],
			},
			normal: {
				height: ['24px', '16px'],
				width: ['24px', '16px'],
			},
			small: {
				height: ['16px', '16px'],
				width: ['16px', '16px'],
			},
		},
	})
);

export const ThemeIcon = (props) => {
	return <IconWrapper mr={[0, 1, 2]} {...props} />;
};