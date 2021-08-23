import { css } from 'styled-components';

export const Scrollbar = css`
	&::-webkit-scrollbar {
		width: 5px;
		background: transparent;
	}
	&::-webkit-scrollbar-track {
		width: 5px;
		background: #f5f5f5;
	}
	&::-webkit-scrollbar-track-piece {
		background: transparent;
	}
	&::-webkit-scrollbar-thumb {
		width: 2.5px;
		background: #96c1d1;
		border-radius: 4px;
	}
`;
