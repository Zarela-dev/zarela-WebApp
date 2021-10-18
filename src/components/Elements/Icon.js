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
				maxWidth: ['24px', '33px'],
				maxHeight: ['24px', '33px'],
			},
			small: {
				maxWidth: ['16px', '21px'],
				maxHeight: ['17px', '22px'],
			},
		},
	})
);

export const ThemeIcon = (props) => {
	return <IconWrapper ml={[0, 1, 2]} mr={[0, 1, 2]} {...props} />;
};
