import styled from 'styled-components';
import { Image } from 'rebass/styled-components';
import { variant, space, layout, color, compose, fontWeight, padding } from 'styled-system';

const IconWrapper = styled(Image)(
	compose(space, layout, color, fontWeight, padding),
	variant({
		prop: 'variant',
		variants: {
			bigger: {
				height: ['36px'],
				width: ['36px'],
				minWidth: ['36px'],
			},
			layout: {
				height: '30px',
				width: ['30px'],
			},
			big: {
				height: ['32px', '24px'],
				width: ['32px', '24px'],
				minWidth: ['32px', '24px'],
			},
			normal: {
				height: ['auto', 'auto'],
				width: ['24px', '16px'],
				minWidth: ['24px', '16px'],
			},
			brief: {
				height: ['16px', '20px'],
				width: ['16px', '20px'],
				minWidth: ['16px', '20px'],
			},
			small: {
				height: ['16px', '16px'],
				width: ['16px', '16px'],
				minWidth: ['16px', '16px'],
			},
		},
	})
);

export const ThemeIcon = (props) => {
	return <IconWrapper mr={[0, 1, 2]} {...props} />;
};
