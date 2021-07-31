import React from 'react';
import { Button } from './Elements/Button';
import SlideMenu from './SlideMenu';

const menuItems = [
	{
		title: 'Home',
		path: '/',
		notifications: 0,
	},
	{
		title: 'My requests',
		path: '/notSupported',
		notifications: 0,
	},
	{
		title: 'My contributions',
		path: '/account',
		notifications: 0,
	},
	{
		title: 'Wallet',
		path: '/wallet/deposit',
		notifications: 0,
	},
];

const MobileMenu = ({ isOpen, onClose }) => {
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
