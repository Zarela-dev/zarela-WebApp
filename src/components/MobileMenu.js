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
	{
		title: 'Settings',
		path: '/settings',
		notifications: 0,
		children: [
			{
				title: 'Blacklist',
				path: '/settings/blacklist',
				notifications: 0,
			},
			{
				title: 'Sync devices',
				path: '/settings/sync',
				notifications: 0,
			},
			{
				title: 'Contacts',
				path: '/settings/contacts',
				notifications: 0,
			},
		],
	},
];

const MobileMenu = () => {
	return (
		<SlideMenu
			title={'Menu'}
			cta={() => <Button variant="primary">New Request</Button>}
			listItems={menuItems}
		></SlideMenu>
	);
};

export default MobileMenu;
