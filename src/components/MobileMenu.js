import React from 'react';
import styled from 'styled-components';
import { Button } from './Elements/Button';
import SlideMenu from './SlideMenu';
import chainIdTag from '../assets/icons/chainid-tag.svg';

const ChainBadge = styled.div`
	background-image: url(${chainIdTag});
	background-repeat: no-repeat;
	background-size: 100%;
	position: absolute;
	background-position: center;
	right: 74px;
	top: -2px;
	height: 27px;
	width: 74px;
	font-size: 12px;
	white-space: nowrap;
	padding: 9px 16px;
	line-height: 8px;
	color: #8c2595;
	font-weight: normal;
`;

const MobileMenu = ({ isOpen, onClose }) => {
	const menuItems = [
		{
			title: 'Home',
			path: '/',
			notifications: 0,
		},
		{
			title: 'Inbox',
			path: '/inbox',
			notifications: 0,
		},
		{
			title: 'Log',
			path: '/log/my_requests',
			notifications: 0,
		},
		{
			title: 'Wallet',
			path: '/wallet/account',
			notifications: 0,
			badge: <ChainBadge>Ropsten</ChainBadge>,
		},
	];

	return (
		<SlideMenu
			isOpen={isOpen}
			onClose={onClose}
			title={'Menu'}
			cta={() => <Button variant="primary">New Request</Button>}
			listItems={menuItems}
		></SlideMenu>
	);
};

export default MobileMenu;
