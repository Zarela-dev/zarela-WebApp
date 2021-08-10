import React from 'react';
import styled, { css } from 'styled-components';

/* credits to  https://codepen.io/rukos85/pen/gOpPWLx */
const spinnerStyles = css`
	.dot {
		position: relative;
		flex: 1;
		display: flex;
		justify-content: center;
		align-content: center;
		margin: 0 5px;
		height: 20px;
		width: 2px;
	}

	.dot:first-of-type 
	{ margin-left: 0 }

	.dot:last-of-type 
	{ margin-right: 0 }

	.dot::before,
	.dot::after {
		content: "";
		position: absolute;
		bottom: -5px;
		display: block;
		width: 4px;
		height: 4px;
		background: #A48CFB;
		border-radius: 4px;
		box-shadow: 1px 1px 4px rgba(0,0,0,.15);
		animation: helix 1.25s ease-in-out infinite;
		z-index: 2;
	}

	.dot::after {
		bottom: 100%;
		animation: helix-reversed 1.25s ease-in-out infinite;
	}

	.dot i {
		position: absolute;
		z-index: 25;
		align-self: center;
		width: 2px;
		height: 10px;
		background: #84D1ED;
		animation: helix-bar 1.25s ease-in-out infinite;
		z-index: 0;
	}

	.dot2::before, .dot2::after, .dot2 i
	{ animation-delay: 0.05s }

	.dot3::before, .dot3::after, .dot3 i
	{ animation-delay: 0.10s }

	.dot4::before, .dot4::after, .dot4 i
	{ animation-delay: 0.15s }

	.dot5::before, .dot5::after, .dot5 i
	{ animation-delay: 0.20s }

	.dot6::before, .dot6::after, .dot6 i
	{ animation-delay: 0.25s }

	.dot7::before, .dot7::after, .dot7 i
	{ animation-delay: 0.30s }

	.dot8::before, .dot8::after, .dot8 i
	{ animation-delay: 0.35s }

	.dot9::before, .dot9::after, .dot9 i
	{ animation-delay: 0.40s }

	@keyframes helix {
		0% { width: 5px; height: 5px; bottom: -5px; z-index: 10 }
		25% { width: 2px; height: 2px }
		50% { width: 5px; height: 5px; bottom: 100%; z-index: 20 }
		75% { width: 8px; height: 8px }
		100% { width: 5px; height: 5px; bottom: -5px }
	}

	@keyframes helix-reversed {
		0% { width: 5px; height: 5px; bottom: 100%; z-index: 20 }
		25% { width: 8px; height: 8px }
		50% { width: 5px; height: 5px; bottom: -5px; z-index: 10 }
		75% { width: 2px; height: 2px }
		100% { width: 5px; height: 5px; bottom: 100% }
	}

	@keyframes helix-bar {
		0% { height: 15px }
		25% { height:  8px }
		50% { height: 15px }
		75% { height:  8px }
		100% { height: 15px }
	}

`;

const Wrapper = styled.div`
	${spinnerStyles};
	position: relative;
	display: flex;
	justify-content: center;
	align-content: center;
	width: 120px;
	height: 60px;
	z-index: ${props => props.theme.z_spinner};
`;

const Spinner = () => {
	return (
		<Wrapper>
			<div className="dot dot1"><i></i></div>
			<div className="dot dot2"><i></i></div>
			<div className="dot dot3"><i></i></div>
			<div className="dot dot4"><i></i></div>
			<div className="dot dot5"><i></i></div>
			<div className="dot dot6"><i></i></div>
			<div className="dot dot7"><i></i></div>
			<div className="dot dot8"><i></i></div>
			<div className="dot dot9"><i></i></div>
		</Wrapper>
	);
};

export default Spinner;
