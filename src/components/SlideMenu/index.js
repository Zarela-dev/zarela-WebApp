import React from 'react';
import styled from 'styled-components';
import backIcon from '../../assets/icons/left-arrow.svg';
import { matchPath, useLocation, Link } from 'react-router-dom';

const Nav = styled.nav`
	position: fixed;
	right: 0;
	top: 0;
	height: 100vh;
	background: white;
	transform: ${({ isOpen }) => (isOpen ? 'translateX(0%)' : 'translateX(100%)')};
	min-width: 276px;
	border: 1.5px solid ${(props) => props.theme.success};
	border-radius: 8px 0px 0px 0px;
	padding: ${(props) => props.theme.spacing(2)} ${(props) => props.theme.spacing(3)};
	overflow: auto;
	z-index: ${(props) => props.theme.z_mobileSlideMenu};
	transition: transform 0.4s ease-in-out;
`;

const Header = styled.header`
	width: 100%;
	display: flex;
	flex-direction: column;
`;

const HeaderRow = styled.div`
	flex: 1;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
`;

const Title = styled.h2`
	font-style: normal;
	font-weight: bold;
	font-size: 18px;
	line-height: 20px;
	text-align: center;
	color: #4fcfa1;
`;

const BackIcon = styled.img`
	width: 28px;
	width: content-box;
	padding: 0 10px;
	margin-left: -10px;
	margin-bottom: 10px;
	cursor: pointer;
`;

const Divider = styled.div`
	width: 100%;
	height: 1px;
	background: #4fcfa1;
	border-radius: 12px;
	margin: ${(props) => props.theme.spacing(2)} 0 ${(props) => props.theme.spacing(4)};
`;

const CTAWrapper = styled.div``;

const MenuList = styled.ul`
	list-style: none;

	& ul {
		padding-left: ${(props) => props.theme.spacing(2.5)};
	}
`;

const MenuItem = styled(Link)`
	position: relative;
	display: list-item;
	font-weight: ${(props) => (props.active ? 'bold' : 'normal')};
	font-size: 18px;
	line-height: 18px;
	color: #581d9f;
	text-decoration: ${(props) => (props.active ? 'underline' : 'none')};
	margin-bottom: ${(props) => props.theme.spacing(4)};
`;

const SlideMenu = ({ isOpen, onClose, title, listItems, cta }) => {
	const { pathname } = useLocation();

	return (
		<Nav isOpen={isOpen}>
			<Header>
				<HeaderRow>
					<BackIcon src={backIcon} onClick={onClose} />
				</HeaderRow>
				<HeaderRow>
					<Title>{title}</Title>
					<CTAWrapper>{cta}</CTAWrapper>
				</HeaderRow>
			</Header>
			<Divider />
			<MenuList>
				{listItems.map((item) => {
					if (item.children?.length) {
						return (
							<>
								<MenuItem
									key={item.title}
									onClick={onClose}
									active={matchPath(pathname, {
										path: item.path,
										exact: true,
									})}
									to={item.path}
									notification={item.notification}
								>
									{item.title}
									{item.badge || null}
								</MenuItem>
								<MenuList>
									{item.children.map((childItem) => (
										<MenuItem
											key={childItem.title}
											active={matchPath(pathname, {
												path: childItem.path,
												exact: true,
											})}
											to={childItem.path}
											notification={childItem.notification}
										>
											{childItem.title}
											{childItem.badge || null}
										</MenuItem>
									))}
								</MenuList>
							</>
						);
					}
					return (
						<MenuItem
							key={item.title}
							onClick={onClose}
							active={matchPath(pathname, { path: item.path, exact: true })}
							to={item.path}
							notification={item.notification}
						>
							{item.title}
							{item.badge || null}
						</MenuItem>
					);
				})}
			</MenuList>
		</Nav>
	);
};

export default SlideMenu;
