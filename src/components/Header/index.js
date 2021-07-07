import styled, { css } from 'styled-components';
import logo from '../../assets/icons/logo.png';
import home from '../../assets/icons/home.svg';
import inbox from '../../assets/icons/inbox.svg';
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
	align-items: center;
	align-content: center;
	justify-content: flex-end;
	text-decoration: none;
	margin-right: ${props => props.theme.spacing(10)};
`;

const NavLink = styled(Typography)`
	color: ${props => props.theme.navLinkColor};
	font-weight: 500;
	font-size: ${props => props.theme.body};
`;

const NavIcon = styled.img`
	height: 30px;
	margin-bottom: ${props => props.theme.spacing(1)};
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

export default function Header() {
	return (
		<HeaderWrapper>
			<Logo src={logo} />
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
			<Spacer />
			<SubmitRequestButton to='/request/create'>
				New Request
			</SubmitRequestButton>
			{/* <NavItem to='/account'>
				<NavIcon src={bell} />
				<NotificationBadge>321</NotificationBadge>
			</NavItem> */}
		</HeaderWrapper>
	);
};