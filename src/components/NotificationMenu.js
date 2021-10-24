import React from 'react';
import styled from 'styled-components';
import { Button } from './Elements/Button';
import chainIdTag from '../assets/icons/chainid-tag.svg';
import SlideMenu from './SlideMenu';
import { ThemeButton } from './Elements/Button';

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
