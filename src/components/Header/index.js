import styled, { css } from 'styled-components';
import logo from '../../assets/icons/logo.png';
import home from '../../assets/icons/home.svg';
import inbox from '../../assets/icons/inbox.svg';
import live from '../../assets/icons/live.svg';
import user from '../../assets/icons/user.svg';
import bell from '../../assets/icons/bell.svg';
import wallet from '../../assets/icons/wallet.svg';
import { Link } from 'react-router-dom';
import { Typography } from '../Elements/Typography';
import { Button } from '../Elements/Button';
import maxWidthWrapper from '../Elements/MaxWidth';

const NavItem = styled(Link)`
	position: relative;
	height: 50px;
	display: flex;
	flex-direction: column;
	align-items: space-between;
	align-content: center;
	justify-content: flex-end;
	text-decoration: none;
	margin: 0 ${props => props.theme.spacing(4)}
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
	flex: 7;
`;

const LeftMenu = styled.div`
	display: flex;
	justify-content: flex-end;
	flex: 5;
`;

const NavLink = styled(Typography)`
	color: ${props => props.theme.navLinkColor};
	font-weight: 500;
	font-size: ${props => props.theme.body};
	white-space: nowrap;
`;

const NavIcon = styled.img`
	height: 30px;
	margin-bottom: ${props => props.theme.spacing(1)};
`;

const VerticalNavIcon = styled.img`
	height: 30px;
	margin-right: ${props => props.theme.spacing(1)};
`;

const Logo = styled.img`
	height: 40px;
	margin-right: ${props => props.theme.spacing(8)};
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
	background: ${props => props.theme.notificationColor};
	color: white;
`;

const Spacer = styled.div`
	flex: 1;
`;

const SubmitRequestButton = styled(Link)`
	${Button};
`;

const HeaderWrapper = styled.header`
	${maxWidthWrapper};
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	width: 100%;
	height: 94px;
	padding: ${props => props.theme.spacing(3)} 0;
`;

export default function Header({ device }) {
	return (
		<HeaderWrapper>
			<RightMenu>
				<Logo src={logo} />
				{device === "desktop" ?
					<>
						<NavItem to='/'>
							<NavIcon src={home} />
							<NavLink>
								Home
							</NavLink>
						</NavItem>
						<NavItem to='/inbox'>
							<NavIcon src={inbox} />
							<NavLink>
								Inbox
							</NavLink>
						</NavItem>
						<NavItem to='/account'>
							<NavIcon src={user} />
							<NavLink>
								My Contributions
							</NavLink>
						</NavItem>
						<NavItem to='/wallet/deposit'>
							<NavIcon src={wallet} />
							<NavLink>
								Wallet
							</NavLink>
						</NavItem>
					</> : null}
			</RightMenu>
			{device === "mobile" ?
				<LeftMenu>
					<VerticalNavItem>
						<VerticalNavIcon src={live} />
						<NavLink>
							Live
						</NavLink>
					</VerticalNavItem>
					{/* <SubmitRequestButton to='/request/create'>
								New Request
							</SubmitRequestButton> */}
					{/* <NavItem to='/account'>
								<NavIcon src={bell} />
								<NotificationBadge>321</NotificationBadge>
							</NavItem> */}
				</LeftMenu>
				: null}
			<Spacer />
		</HeaderWrapper>
	);
};