import { useState, useContext } from 'react';
import styled from 'styled-components';
import logo from '../../assets/icons/logo.png';
import home from '../../assets/icons/home.svg';
import inbox from '../../assets/icons/inbox.svg';
import user from '../../assets/icons/user.svg';
import wallet from '../../assets/icons/wallet.svg';
import { Link } from 'react-router-dom';
import { Typography } from '../Elements/Typography';
import { Button } from '../Elements/Button';
import menu from '../../assets/icons/menu.svg';
import MobileMenu from '../MobileMenu';
import { mainContext } from './../../state';
import maxWidthWrapper from '../Elements/MaxWidth';
import chainIdTag from '../../assets/icons/chainid-tag.svg';
import help from './../../assets/icons/help.svg';
import { useLocation } from 'react-router';

const NavItem = styled(Link)`
	position: relative;
	height: 50px;
	display: flex;
	flex-direction: column;
	align-items: center;
	align-content: center;
	justify-content: center;
	text-decoration: none;
	margin-right: ${(props) => (props.isMobile ? props.theme.spacing(0) : props.theme.spacing(4))};
	margin-left: ${(props) => (props.isMobile ? props.theme.spacing(2) : props.theme.spacing(4))};
`;

const NavLink = styled(Typography)`
	color: ${(props) => props.theme.navLinkColor};
	font-weight: 500;
	font-size: ${(props) => props.theme.body};
	white-space: nowrap;
`;

// const VerticalNavItem = styled(Link)`
// 	position: relative;
// 	height: 50px;
// 	display: flex;
// 	flex-direction: row;
// 	align-items: center;
// 	align-content: center;
// 	justify-content: center;
// 	text-decoration: none;
// `;

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

// const VerticalNavIcon = styled.img`
// 	height: 30px;
// 	margin-right: ${(props) => props.theme.spacing(1)};
// `;

const Logo = styled.img`
	height: 65px;
	margin-left: 20px;
	margin-right: ${(props) => (props.isMobile ? props.theme.spacing(1) : props.theme.spacing(4))};
`;

// const NotificationBadge = styled.div`
// 	position: absolute;
// 	top: -12px;
// 	left: 8px;
// 	min-width: 24px;
// 	height: 24px;
// 	border-radius: 24px;
// 	padding: 3px 6px;
// 	text-align: center;
// 	background: ${(props) => props.theme.notificationColor};
// 	color: white;
// `;

const SubmitRequestButton = styled(Link)`
	${Button};
`;

const HeaderWrapper = styled.header`
	${maxWidthWrapper};
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	background: white;
	width: 100%;
	padding: ${(props) => props.theme.spacing(3)} 0;
`;

// const MobileHeaderSpaceFixer = styled.div`
// 	height: 70px;
// 	width: 100%;
// `;

const HeaderWrapperApp = styled(HeaderWrapper)`
	padding: 10px 18px;
	height: 70px;
	position: sticky;
	top: 0;
	z-index: ${(props) => props.theme.z_header};
	box-shadow: 0px 4px 18px rgba(81, 197, 234, 0.15);
`;

const LogoApp = styled(Logo)`
	height: 33px;
	margin-left: 0;
`;
// const NavLinkApp = styled(NavLink)`
// 	font-size: 13.5px;
// 	font-weight: 700px;
// `;

const NavIconApp = styled(NavIcon)`
	height: 19.5px;
`;

// const VerticalNavIconApp = styled(VerticalNavIcon)`
// 	height: 19.5px;
// `;
// const NotificationBadgeApp = styled(NotificationBadge)`
// 	font-size: 10.5px;
// 	font-weight: 700;
// 	top: 4px;
// 	height: 16px;
// `;

const ChainBadge = styled.div`
	background-image: url(${chainIdTag});
	background-repeat: no-repeat;
	background-size: 100%;
	position: absolute;
	background-position: center;
	right: -106px;
	top: 14px;
	height: 42px;
	white-space: nowrap;
	padding: 10px 20px;
	padding-right: 10px;
	line-height: 22px;
	color: #8C2595;
`;

export default function Header({ isMobile }) {
	const [isMenuOpen, setMenuOpen] = useState(false);
	const { appState } = useContext(mainContext);
	const location = useLocation();

	if (isMobile) {
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
					<NavItem isMobile={appState.isMobile}>
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
	} else {
		return (
			<HeaderWrapper>
				<RightMenu>
					<Link to="/">
						<Logo isMobile={appState.isMobile} src={logo} />
					</Link>
					<NavItem isMobile={appState.isMobile} to="/">
						<NavIcon src={home} />
						<NavLink>Home</NavLink>
					</NavItem>
					<NavItem isMobile={appState.isMobile} to="/inbox">
						<NavIcon src={inbox} />
						<NavLink>Inbox</NavLink>
					</NavItem>
					<NavItem isMobile={appState.isMobile} to="/log/my_requests">
						<NavIcon src={user} />
						<NavLink>Log</NavLink>
					</NavItem>
					<NavItem isMobile={appState.isMobile} to="/wallet/account">
						<NavIcon src={wallet} />
						<NavLink>Wallet</NavLink>
						<ChainBadge>Ropsten</ChainBadge>
					</NavItem>
				</RightMenu>
				<LeftMenu>
					<SubmitRequestButton to="/request/create">New Request</SubmitRequestButton>
					{/* <NavItem device="desktop" to="/account">
						<NavIcon src={bell} />
						<NotificationBadge>321</NotificationBadge>
					</NavItem> */}
					<NavItem>
						<NavIcon
							src={help}
							onClick={() => {
								localStorage.removeItem('guide/' + location.pathname.split('/')[1]);
							}}
						/>
					</NavItem>
				</LeftMenu>
			</HeaderWrapper>
		);
	}
}
