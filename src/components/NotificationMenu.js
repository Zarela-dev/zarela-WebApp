import React from 'react';
import SlideMenu from './SlideMenu';
import { ThemeButton } from './Elements/Button';

const NotificationMenu = ({ isOpen, onClose }) => {
	const menuItems = [];
	return (
		<SlideMenu
			usage="notify"
			isOpen={isOpen}
			onClose={onClose}
			title={'Transactions on Zarela'}
			cta={() => <ThemeButton variant="primary">New Request</ThemeButton>}
			listItems={menuItems}
		></SlideMenu>
	);
};

export default NotificationMenu;
