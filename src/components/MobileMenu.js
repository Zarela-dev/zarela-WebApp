import React from 'react';
import styled from 'styled-components';
import { Button } from './Elements/Button';
import SlideMenu, { SlideMenuNotification } from './SlideMenu';
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

const MobileMenu = ({ isOpen, onClose, notifyOnClose, usage = 'toastify' }) => {
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
		<>
			{usage === 'toastify' ? (
				<SlideMenu
					isOpen={isOpen}
					onClose={onClose}
					title={'Menu'}
					cta={() => <Button variant='primary'>New Request</Button>}
					listItems={menuItems}
				></SlideMenu>
			) : (
				usage === 'notify' && (
					<SlideMenuNotification
						isOpen={isOpen}
						onClose={onClose}
						title={'Notifications'}
					></SlideMenuNotification>
				)
			)}
		</>
	);
};

export default MobileMenu;
