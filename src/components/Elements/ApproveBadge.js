import styled from 'styled-components';
import { Box } from 'rebass/styled-components';
import { color, space, compose, layout, borderColor } from 'styled-system';
import fulfilledIcon from './../../assets/icons/check-green.svg';
import { ThemeIcon } from './Icon';

const ApproveBadgeComponent = styled(Box)(
	compose(space, layout, color, borderColor),
	{
		border: '2px solid ',
		borderColor: (props) => props.theme.colors.primary,
		background: 'transparent',
		minWidth: (props) => props.theme.space[5] + 'px',
		height: (props) => props.theme.space[5] + 'px',
		padding: '5px 6px',
		borderRadius: '5px',
		textAlign: 'center',
		fontWeight: 'bold',
		fontSize: (props) => props.theme.fontSizes[6] + 'px',
		lineHeight: (props) => props.theme.lineHeights[12],
		color: (props) => props.theme.colors.primary,
	}
);

export const ApproveBadge = (props) => {
	if (props.fulfilled) {
		return <ThemeIcon variant='big' mr={0} src={fulfilledIcon} />;
	} else {
		return (
			<ApproveBadgeComponent src={fulfilledIcon}>
				{props.value}
			</ApproveBadgeComponent>
		);
	}
};
