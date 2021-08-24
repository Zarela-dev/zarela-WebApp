import { css } from 'styled-components';

const maxWidthWrapper = css`
	max-width: ${(props) => props.theme.maxWidth};
	margin: 0 auto;
`;

export default maxWidthWrapper;
