import { useState, useEffect } from 'react';
import styled from 'styled-components';
import logo from '../../assets/icons/logo.png';
import home from '../../assets/icons/home.svg';
import inbox from '../../assets/icons/inbox.svg';
import live from '../../assets/icons/live.svg';
import help from '../../assets/icons/help.svg';
import user from '../../assets/icons/user.svg';
import bell from '../../assets/icons/bell.svg';
import wallet from '../../assets/icons/wallet.svg';
import { Link } from 'react-router-dom';
import { Typography } from '../Elements/Typography';
import { Button } from '../Elements/Button';
import menu from '../../assets/icons/menu.svg';
import MobileMenu from '../MobileMenu';

const NavItem = styled(Link)`
	position: relative;
	height: 50px;
	display: flex;
	flex-direction: column;
	align-items: center;
	align-content: center;
	justify-content: center;
	text-decoration: none;
	margin-right: ${(props) =>
		props.device === 'desktop' ? props.theme.spacing(4) : props.theme.spacing(0)};
	margin-left: ${(props) =>
		props.device === 'desktop' ? props.theme.spacing(4) : props.theme.spacing(2)};
`;

const NavLink = styled(Typography)`
	color: ${(props) => props.theme.navLinkColor};
	font-weight: 500;
	font-size: ${(props) => props.theme.body};
	white-space: nowrap;
`;

const VerticalNavItem = styled(Link)`
	position: relative;
	height: 50px;
	display: flex;
	flex-direction: row;
	align-items: center;
	align-content: center;
	justify-content: center;
	text-decoration: none;
`;

const RightMenu = styled.div`
	display: flex;
	align-items: center;
	flex: 7;
`;

const LeftMenu = styled.div`
	display: flex;
	justify-content: flex-end;
	flex: 5;
`;

const NavIcon = styled.img`
	height: 30px;
`;

const VerticalNavIcon = styled.img`
	height: 30px;
	margin-right: ${(props) => props.theme.spacing(1)};
`;

const Logo = styled.img`
	height: 40px;
	margin-left: 20px;
	margin-right: ${(props) =>
		props.device === 'desktop' ? props.theme.spacing(4) : props.theme.spacing(1)};
`;

const NotificationBadge = styled.div`
	position: absolute;
	top: -12px;
	left: 8px;
	min-width: 24px;
	height: 24px;
	border-radius: 24px;
	padding: 3px 6px;
	text-align: center;
	background: ${(props) => props.theme.notificationColor};
	color: white;
`;

const SubmitRequestButton = styled(Link)`
	${Button};
`;

const HeaderWrapper = styled.header`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	background: white;
	width: 100%;
	padding: ${(props) => props.theme.spacing(3)} 0;
`;

const MobileHeaderSpaceFixer = styled.div`
	height: 70px;
	width: 100%;
`;

const HeaderWrapperApp = styled(HeaderWrapper)`
	padding: 10px 18px;
	height: 70px;
	position: sticky;
	top: 0;
	z-index: 999;
	box-shadow: 0px 4px 18px rgba(81, 197, 234, 0.15);
`;

const LogoApp = styled(Logo)`
	width: 78px;
	height: 27px;
	margin-left: 0;
`;
const NavLinkApp = styled(NavLink)`
	font-size: 13.5px;
	font-weight: 700px;
`;
const NavIconApp = styled(NavIcon)`
	height: 19.5px;
`;

const VerticalNavIconApp = styled(VerticalNavIcon)`
	height: 19.5px;
`;
const NotificationBadgeApp = styled(NotificationBadge)`
	font-size: 10.5px;
	font-weight: 700;
	top: 4px;
	height: 16px;
`;

export default function Header({ device }) {
	const [isMenuOpen, setMenuOpen] = useState(false);

	if (device === 'mobile') {
		return (
			<HeaderWrapperApp>
				<RightMenu>
					<Link to="/">
						<LogoApp src={logo} />
					</Link>
				</RightMenu>
				<LeftMenu>
					{/* <VerticalNavItem>
						<VerticalNavIconApp src={live} />
						<NavLinkApp>Live</NavLinkApp>
					</VerticalNavItem> */}
					{/* <NavItem>
						<NavIconApp src={bell} />
						<NotificationBadgeApp>321</NotificationBadgeApp>
					</NavItem> */}
					<NavItem>
						<NavIconApp src={menu} onClick={() => setMenuOpen(true)} />
					</NavItem>
				</LeftMenu>
				<MobileMenu
					isOpen={isMenuOpen}
					onClose={() => {
						setMenuOpen(false);
					}}
				/>
			</HeaderWrapperApp>
		);
	} else if (device === 'desktop') {
		return (
			<HeaderWrapper>
				<RightMenu>
					<Link to="/">
						<Logo device="desktop" src={logo} />
					</Link>
					<NavItem device="desktop" to="/">
						<NavIcon src={home} />
						<NavLink>Home</NavLink>
					</NavItem>
					<NavItem device="desktop" to="/inbox">
						<NavIcon src={inbox} />
						<NavLink>Inbox</NavLink>
					</NavItem>
					<NavItem device="desktop" to="/account">
						<NavIcon src={user} />
						<NavLink>My Contributions</NavLink>
					</NavItem>
					<NavItem device="desktop" to="/wallet/deposit">
						<NavIcon src={wallet} />
						<NavLink>Wallet</NavLink>
					</NavItem>
				</RightMenu>
				<LeftMenu>
					<SubmitRequestButton to="/request/create">Create</SubmitRequestButton>
					{/* <NavItem device="desktop" to="/account">
						<NavIcon src={bell} />
						<NotificationBadge>321</NotificationBadge>
					</NavItem> */}
					{/* <NavItem device="desktop">
						<NavIcon src={help} />
					</NavItem> */}
				</LeftMenu>
			</HeaderWrapper>
		);
	}
}
