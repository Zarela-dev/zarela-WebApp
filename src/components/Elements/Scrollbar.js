import { css } from 'styled-components';

export const Scrollbar = css`
	&::-webkit-scrollbar {
		width: 5px;
		background: transparent;
	}
	&::-webkit-scrollbar-track {
		width: 5px;
		background: #F5F5F5;
	}
	&::-webkit-scrollbar-track-piece {
		background: transparent;
	}
	&::-webkit-scrollbar-thumb {
		width: 2.5px;
		background: #96C1D1;
		border-radius: 4px;
	}
`;