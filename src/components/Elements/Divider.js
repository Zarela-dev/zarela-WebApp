import styled from 'styled-components';
import { Box } from 'rebass/styled-components';
import { variant, space, layout, color, compose, height ,width} from 'styled-system';

const Divider = styled(Box)(
	compose(space, layout, color, height, width),
	variant({
		prop: 'variant',
		variants: {
			vertical: {
				background: '#3c87aa',
				width: '1px',
				height: ['18px', '35px'],
				ml: [1, 2, 3],
				mr: [1, 2, 3],
				mt: 'auto',
				mb: 'auto',
			},
			horizontal: {
				background: '#3D5C8A',
				width: '85%',
				height: '1px',
				mt: [0, 1, 2],
				mb: [0, 1, 2],
				margin: 'auto',
			},
		},
	})
);

export const ThemeDivider = (props) => {
	return <Divider height={props.height ?? null} {...props} />;
};
