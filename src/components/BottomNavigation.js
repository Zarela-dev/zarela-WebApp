import React from 'react';
import styled from 'styled-components';
import { LinkButton } from './Elements/Button';
import { Link } from 'react-router-dom';
import homeIcon_active from '../assets/icons/nav/home-active.svg';
import inboxIcon from '../assets/icons/nav/inbox.svg';
import profileIcon from '../assets/icons/nav/profile.svg';
import walletIcon from '../assets/icons/nav/wallet.svg';
import plusIcon from '../assets/icons/nav/plus.svg';

const Nav = styled.nav`
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100vw;
	height: 50px;

	display: flex;
	flex-wrap: nowrap;
	justify-content: center;
	align-items: center;
	z-index: 100;

	@media only screen and (min-width: ${(props) => props.theme.mobile_sm_breakpoint}) {
		display: none;
	}
`;

const NavItem = styled.a`
	position: relative;
	padding: ${(props) => props.theme.spacing(1.3)};
	background: white;
	flex: 1;
	display: flex;
	justify-content: center;
	height: 50px;
`;

const NavIcon = styled.img`
	width: 24px;
	cursor: pointer;
`;

const NavBadge = styled.div`
	height: 20px;
	border-radius: 20px;
	min-width: 20px;
	font-weight: bold;
	font-size: 15px;
	line-height: 19px;
	color: white;
	text-align: center;
	background: ${(props) => props.theme.success};
	padding: 0 7px;

	position: absolute;
	top: 2px;
	left: 50%;
	transform: translateX(-50%);
	z-index: 1;
`;

const CreateRequestNavItem = styled.div`
	position: relative;
	background: transparent;
	border: 6px solid white;
	border-top: none;
	border-radius: 0 0 11px 11px;
	flex: 1;
	height: 50px;
	min-width: 70px;
	
	@media only screen and (min-width: ${({theme}) => theme.mobile_xs_breakpoint}) {
		/* flex: 1 0 23px; */
	}

	&::after {
		content: '';
		display: block;
		position: absolute;
		width: 0;
		right: -6px;
		height: 0;
		background: transparent;
		bottom: -6px;
		border-right: 15px solid white;
		border-bottom: 0px solid transparent;
		border-top: 11px solid transparent;
		z-index: 2;
		border-radius: 0;
	}

	&::before {
		content: '';
		display: block;
		position: absolute;
		width: 0;
		left: -6px;
		height: 0;
		background: transparent;
		bottom: -6px;
		border-left: 15px solid white;
		border-bottom: 0px solid transparent;
		border-top: 11px solid transparent;
		z-index: 2;
		border-radius: 0;
	}
`;

const CreateRequestButton = styled(LinkButton).attrs((props) => {
	return {
		variant: 'secondary',
	};
})`
	width: 44px;
	height: 44px;
	max-width: unset;
	margin: 0;
	box-shadow: 0px -3px 22px rgba(81, 197, 234, 0.25);
	position: absolute;
	top: -7px;
	left: 7px;

	& > a {
		padding: ${(props) => props.theme.spacing(1)};
	}
`;

const CreateRequestIcon = styled.img`
	width: 20px;
`;

const BottomNavigation = () => {
	return (
		<Nav>
			<NavItem active>
				<NavIcon src={profileIcon} />
			</NavItem>
			<NavItem>
				<NavBadge>5</NavBadge>
				<NavIcon src={inboxIcon} />
			</NavItem>
			<CreateRequestNavItem>
				<CreateRequestButton>
					<CreateRequestIcon src={plusIcon} />
				</CreateRequestButton>
			</CreateRequestNavItem>
			<NavItem>
				<NavIcon src={homeIcon_active} />
			</NavItem>
			<NavItem>
				<NavIcon src={walletIcon} />
			</NavItem>
		</Nav>
	);
};

export default BottomNavigation;
