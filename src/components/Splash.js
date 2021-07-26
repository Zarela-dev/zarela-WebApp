import React from 'react';
import styled from 'styled-components';
import logo from '../assets/icons/logo-white.svg';

const Wrapper = styled.div`
	position: fixed;
	z-index: ${props => props.theme.z_modal};
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	display: flex;
	transform: translateX(${({ isVisible }) => (isVisible ? '0' : '100%')});
	transition: transform 0.5s ease-in-out;
	justify-content: center;
	align-items: center;
	background: linear-gradient(
		179.8deg,
		#7246d0 -14.91%,
		#3a3c8a -14.91%,
		#4d2898 4.54%,
		#581d9f 15.02%,
		#7246d0 49.27%,
		#06173c 109.57%
	);
`;

const Logo = styled.img`
	width: 240px;
`;

const Splash = ({isVisible}) => {
	return (
		<Wrapper isVisible={isVisible}>
			<Logo src={logo} />
		</Wrapper>
	);
};

export default Splash;
