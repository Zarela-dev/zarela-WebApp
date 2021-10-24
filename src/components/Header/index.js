import { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { useWeb3React } from '@web3-react/core';
import logo from '../../assets/icons/logo.png';
import home from '../../assets/icons/home.svg';
import setting from '../../assets/icons/setting.svg';
import inbox from '../../assets/icons/inbox.svg';
import user from '../../assets/icons/user.svg';
import wallet from '../../assets/icons/wallet.svg';
import explore from '../../assets/icons/explore.svg';
import { Link } from 'react-router-dom';
import { Typography } from '../Elements/Typography';
import { Button } from '../Elements/Button';
import menu from '../../assets/icons/menu.svg';
import { convertToBiobit, toast } from '../../utils';
import MobileMenu from '../MobileMenu';
import NotificationMenu from '../NotificationMenu';
import { mainContext } from './../../state';
import chainIdTag from '../../assets/icons/chainid-tag.svg';
import help from './../../assets/icons/help.svg';
import bell from './../../assets/icons/bell.svg';
import { useLocation } from 'react-router';
import { actionTypes } from '../../state/actionTypes';
import { makeStyles } from '@material-ui/core';
import { useScrollPosition } from '../../hooks/useScrollPosition';
import { Box } from '@material-ui/core';
import TitleBar from '../../components/TitleBar/TitleBar';
import { CURRENT_NETWORK_LABEL } from '../../constants';
import {ThemeButton} from './../Elements/Button';
import {Header as Heading , BodyText} from './../Elements/Typography';
import {Row , Col} from './../Elements/Flex';
import {ThemeIcon} from './../Elements/Icon';
import Badge from './../Elements/Badge';

const NavItem = styled(Link)`
	position: relative;
	height: 50px;
	display: flex;
	flex-direction: column;
	align-items: center;
	align-content: center;
	justify-content: center;
	text-decoration: none;
	margin-right: ${(props) => (props.isMobile ? props.theme.spacing(0) : props.theme.spacing(2.5))};
	margin-left: ${(props) => (props.isMobile ? props.theme.spacing(2) : props.theme.spacing(2.5))};
	outline: none !important;
	cursor: ${(props) => props.disabled && 'not-allowed'};
	opacity: ${(props) => (props.disabled ? 0.4 : 1)};
`;

const NavItemDisabled = styled.a.attrs((props) => {
	return {
		...props,
	};
})`
	position: relative;
	height: 50px;
	display: flex;
	flex-direction: column;
	align-items: center;
	align-content: center;
	justify-content: center;
	text-decoration: none;
	margin-right: ${(props) => (props.isMobile ? props.theme.spacing(0) : props.theme.spacing(2.5))};
	margin-left: ${(props) => (props.isMobile ? props.theme.spacing(2) : props.theme.spacing(2.5))};
	outline: none !important;
	cursor: ${(props) => props.disabled && 'not-allowed'};
	opacity: ${(props) => (props.disabled ? 0.4 : 1)};
`;

const NavLink = styled(Typography)`
	color: ${(props) => props.theme.navLinkColor};
	font-weight: 500;
	font-size: ${(props) => props.theme.body};
	white-space: nowrap;
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
	height: ${(props) => props.height ?? '30px'};
`;

const Logo = styled.img`
	height: 65px;
	margin-left: 20px;
	margin-right: ${(props) => (props.isMobile ? props.theme.spacing(1) : props.theme.spacing(4))};
`;

const SubmitRequestButton = styled(Link)`
	${Button};
`;

const HeaderWrapper = styled.header`
	position: sticky;
	top: 0;
	z-index: 2;
	height: ${(props) => (props.isMobile ? '75px' : '100px')};
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: flex-end;
	background: white;
	margin-bottom: ${(props) => (props.routeGroup === '' ? 0 : props.routeGroup === 'request' ? 0 : '130px')};
`;

const HeaderWrapperApp = styled(HeaderWrapper)`
	position: sticky;
	top: 0;
	z-index: ${(props) => props.theme.z_header};
	padding: 0;
	display: flex;
	flex-direction: column;
	margin-bottom: ${(props) => (props.routeGroup === '' ? '70px' : props.routeGroup === 'request' ? 0 : '100px')};
`;

const NavBarRow = styled.div`
	max-width: 100vw;
	display: flex;
	flex-direction: row;
	z-index: 2;
	width: 100%;
	height: 100%;
	background: #fff;
	height: ${(props) => (props.isMobile ? '70px' : '100px')};
	padding: ${(props) => (props.isMobile ? '10px 18px' : `25px calc((100vw - 1255px) / 2)`)};
	box-shadow: 0px 4px 18px 0px rgb(81 197 234 / 10%);
`;

const LogoApp = styled(Logo)`
	height: 33px;
	margin-left: 0;
`;

const NavIconApp = styled(NavIcon)`
	height: 19.5px;
`;

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
	color: #8c2595;
`;
const TitleSection = styled.div`
	display: flex;
	height: 83px;
	width: 100%;
	padding: 0 18px;
	justify-content: space-between;
	align-items: center;
	background-color: #f4f8fe;
	flex-wrap: wrap;
`;
const Title = styled.h1`
	color: #000;
	font-size: 18px;
	font-weight: 700;
	white-space: nowrap;
	margin-left: 0px;
`;

const SubmitRequestButtonSubHeader = styled(Link)`
	${Button};
	white-space: nowrap;
	margin-right: 0;
	height: 35px;
	font-size: 14px;
	padding: 10px 24px;
`;

const BoxWrapper = styled.div`
	position: absolute;
	top: 0;
	z-index: 1;
	width: 100%;
`;

const WalletTitlebar = styled(TitleBar)`
	display: flex;
	flex-wrap: nowrap;
	justify-content: space-between;
	height: ${(props) => (props.isMobile ? '85px' : 'unset')};
	padding: ${(props) => props.isMobile && '0 18px'};
	flex-direction: row;
	width: 100%;
	align-items: center;
`;
const Balance = styled.div`
	font-style: normal;
	font-weight: 500;
	font-size: ${(props) => (props.isMobile ? '14px' : '22px')};
	line-height: ${(props) => (props.isMobile ? '18px' : '29px')};
	color: ${(props) => props.theme.textPrimary};
`;

const RewardWrapper = styled.div`
	display: flex;
	flex-direction: column;
`;

const RewardItem = styled.div`
	display: flex;
	justify-content: flex-end;
`;

const RewardLabel = styled.div`
	font-weight: 300;
	font-size: 16px;
	line-height: 21px;

	@media (max-width: 768px) {
		font-size: 12.5px;
	}
`;

const RewardValue = styled.div`
	font-size: 16px;
	font-weight: 700;
	margin-left: ${(props) => props.theme.spacing(1)};

	@media (max-width: 768px) {
		font-size: 13px;
		font-weight: 600;
	}
`;
const NotificationBadge = styled.div`
	min-width: ${(props) => (props.isMobile ? '20px' : '25px')};
	min-height: ${(props) => (props.isMobile ? '20px' : '25px')};
	font-size: ${(props) => (props.isMobile ? '12px' : '16px')};
	background-color: #d13ade;
	border-radius: ${(props) => (props.isMobile ? '10px' : '16px')};
	display: flex;
	justify-content: center;
	align-items: center;
	color: #fff;
	position: absolute;
	top: ${(props) => (props.isMobile ? '-3px' : '-10px')};
`;

const useStyles = makeStyles({
	root: {
		boxShadow: '0px 4px 18px 0px rgb(81 197 234 / 10%)',
	},
});

export default function Header({ isMobile }, props) {
	const { account } = useWeb3React();
	const [isMenuOpen, setMenuOpen] = useState(false);
	const [isNotificationMenuOpen, setIsNotificationMenuOpen] = useState(false);
	const { appState, dispatch } = useContext(mainContext);
	const location = useLocation();
	const [sticky, setSticky] = useState(true);
	const [totalRevenueFromZarela, setTotalRevenueFromZarela] = useState(0);
	const [totalRevenueFromRequester, setTotalRevenueFromRequester] = useState(0);
	const routeGroup = location.pathname.split('/')[1];
	const classes = useStyles(props);
	const GUIDES = ['/', '/inbox', '/log', '/request'];

	useEffect(() => {
		if (appState.contract !== null) {
			if (account) {
				appState.contract.methods.userMap(account).call((error, result) => {
					if (!error) {
						const formatter = (value) => convertToBiobit(value);
						setTotalRevenueFromRequester(formatter(result[1]));
						setTotalRevenueFromZarela(formatter(result[0]));
					} else {
						toast(error.message, 'error');
					}
				});
			}
		}
	}, [account, appState.contract]);

	useScrollPosition(
		({ prevPos, currPos }) => {
			const isShow = currPos.y > prevPos.y;
			if (isShow !== sticky) setSticky(isShow);
		},
		[sticky]
	);

	useEffect(() => {
		dispatch({
			type: actionTypes.SET_NOTIFICATION_COUNT,
			payload: 0,
		});
	}, [isNotificationMenuOpen]);

	if (isMobile) {
		return (
			<>
				<HeaderWrapperApp routeGroup={routeGroup} isMobile={appState.isMobile}>
					<NavBarRow isMobile={appState.isMobile}>
						<RightMenu>
							<Link to="/">
								<LogoApp src={logo} />
							</Link>
						</RightMenu>
						<LeftMenu>
							<NavItem isMobile={appState.isMobile}>
								{GUIDES.find(
									(page) =>
										location.pathname === page ||
										(location.pathname.startsWith(page) && page !== '/')
								) &&
									!location.pathname.startsWith('/inbox') &&
									!location.pathname.startsWith('/request/create') && (
										<NavIcon
											height="20px"
											src={help}
											onClick={() => {
												localStorage.removeItem('guide/' + location.pathname.split('/')[1]);
												dispatch({
													type: actionTypes.SET_GUIDE_IS_OPEN,
													payload: true,
												});
											}}
										/>
									)}
							</NavItem>
							<NavItem isMobile={appState.isMobile}>
								<NavIcon src={bell} height="20px" onClick={() => setIsNotificationMenuOpen(true)} />
								{appState.notificationCount !== 0 && (
									<NotificationBadge isMobile={appState.isMobile}>
										{appState.notificationCount}
									</NotificationBadge>
								)}
							</NavItem>
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

						<NotificationMenu
							appState={appState}
							isOpen={isNotificationMenuOpen}
							onClose={() => {
								setIsNotificationMenuOpen(false);
							}}
						/>
					</NavBarRow>
					<BoxWrapper>
						<Box
							className={classes.root}
							as="header"
							mt="-1em"
							sx={{
								position: 'sticky',
								transform: sticky ? 'translateY(83px)' : 'translateY(0)',
								transition: 'transform 400ms ease-in',
								bottom: 0,
								left: 0,
							}}
						>
							{routeGroup === '' ? (
								<TitleSection>
									<Heading as='h4' variant='heading4'>Recent requests</Heading>
									<ThemeButton variant='primary' size='medium' to="/request/create">
										New Request
									</ThemeButton>
								</TitleSection>
							) : routeGroup === 'wallet' ? (
								<WalletTitlebar isMobile={appState.isMobile}>
									<Heading as='h4' variant='heading4'>Wallet</Heading>
									<Heading as='h4' variant='heading4'>{`Balance: ${+appState.biobitBalance} BBit`}</Heading>
								</WalletTitlebar>
							) : routeGroup === 'log' ? (
								<WalletTitlebar isMobile={appState.isMobile}>
									<Heading as='h4' variant='heading4'>Log</Heading>
									<RewardWrapper>
										<RewardItem>
											<BodyText variant='extraSmall'>My reward from Zarela</BodyText>
											<BodyText variant='extraSmall' fontWeight='bold' ml={3}>{`${totalRevenueFromZarela} BBit`}</BodyText>
										</RewardItem>
										<RewardItem>
											<BodyText variant='extraSmall'>My wage from mage</BodyText>
											<BodyText variant='extraSmall' fontWeight='bold' ml={3}>{`${totalRevenueFromRequester} BBit`}</BodyText>
										</RewardItem>
									</RewardWrapper>
								</WalletTitlebar>
							) : routeGroup === 'inbox' ? (
								<Heading as='h4' variant='heading4' p={4} bg='bgDisabled'>Inbox</Heading>
							) : routeGroup === 'settings' ? (
								<TitleBar>
									<BodyText variant='extraSmall'>Settings</BodyText>
								</TitleBar>
							) : null}
						</Box>
					</BoxWrapper>
				</HeaderWrapperApp>
			</>
		);
	} else {
		return (
			<HeaderWrapper routeGroup={routeGroup} isMobile={appState.isMobile}>
				<NavBarRow isMobile={appState.isMobile}>
					<RightMenu>
						<Link to="/">
							<Logo isMobile={appState.isMobile} src={logo} />
						</Link>
						<NavItem isMobile={appState.isMobile} to="/">
							<ThemeIcon variant='layout' src={home} m='0 8px' />
							<BodyText variant='small' fontWeight={routeGroup === '' ? 'bold' : 'semiBold'} color='primary'>Home</BodyText>
						</NavItem>
						{console.log('routegroup', routeGroup)}
						<NavItem isMobile={appState.isMobile} to="/inbox">
							<ThemeIcon variant='layout' m='0 8px' src={inbox} />
							<BodyText variant='small' fontWeight={routeGroup === 'inbox' ? 'bold' : 'semiBold'} color='primary'>Inbox</BodyText>
						</NavItem>
						<NavItem isMobile={appState.isMobile} to="/log/my_requests">
							<ThemeIcon variant='layout' m='0 8px' src={user} />
							<BodyText variant='small' fontWeight={routeGroup === 'log' ? 'bold' : 'semiBold'} color='primary'>Log</BodyText>
						</NavItem>
						<NavItem
							isMobile={appState.isMobile}
							to={{ pathname: process.env.REACT_APP_EXPLORE_LINK }}
							target="_blank"
						>
							<ThemeIcon variant='layout' m='0 8px' src={explore} />
							<BodyText variant='small' fontWeight='semiBold' color='primary'>Explore</BodyText>
						</NavItem>
						<NavItem isMobile={appState.isMobile} to="/wallet/account">
							<ThemeIcon variant='layout' m='0 8px' src={wallet} />
							<BodyText variant='small' fontWeight={routeGroup === 'wallet' ? 'bold' : 'semiBold'} color='primary'>Wallet</BodyText>
							<ChainBadge onClick={(e) => e.preventDefault()}>{CURRENT_NETWORK_LABEL}</ChainBadge>
						</NavItem>
					</RightMenu>
					<LeftMenu>
						<SubmitRequestButton to="/request/create">New Request</SubmitRequestButton>
						<NavItem>
							<NavIcon src={bell} onClick={() => setIsNotificationMenuOpen(true)} />
							{appState.notificationCount !== 0 && (
								<NotificationBadge isMobile={appState.isMobile}>
									{appState.notificationCount}
								</NotificationBadge>
							)}
						</NavItem>
						{GUIDES.find(
							(page) => location.pathname === page || (location.pathname.startsWith(page) && page !== '/')
						) &&
							location.pathname !== '/request/create' && (
								<NavItem>
									<NavIcon
										src={help}
										onClick={() => {
											localStorage.removeItem('guide/' + location.pathname.split('/')[1]);
											dispatch({
												type: actionTypes.SET_GUIDE_IS_OPEN,
												payload: true,
											});
										}}
									/>
								</NavItem>
							)}
						<NavItem isMobile={appState.isMobile} to="/settings/contacts">
							<NavIcon src={setting} />
						</NavItem>
						<NotificationMenu
							appState={appState}
							isOpen={isNotificationMenuOpen}
							onClose={() => {
								setIsNotificationMenuOpen(false);
							}}
						/>
					</LeftMenu>
				</NavBarRow>

				<BoxWrapper>
					<Box
						className={classes.root}
						as="header"
						mt="-1em"
						sx={{
							position: 'sticky',
							transform: sticky ? 'translateY(110px)' : 'translateY(0)',
							transition: 'transform 400ms ease-in',
							bottom: 0,
							left: 0,
						}}
					>
						{routeGroup === 'wallet' ? (
							<WalletTitlebar>
								<Title>Wallet</Title>
								<Balance>{`Balance: ${+appState.biobitBalance} BBit`}</Balance>
							</WalletTitlebar>
						) : routeGroup === 'log' ? (
							<WalletTitlebar isMobile={appState.isMobile}>
								<Title>Log</Title>
								<RewardWrapper>
									<RewardItem>
										<RewardLabel>My reward from Zarela</RewardLabel>
										<RewardValue>{`${totalRevenueFromZarela} BBit`}</RewardValue>
									</RewardItem>
									<RewardItem>
										<RewardLabel>My wage from mage</RewardLabel>
										<RewardValue>{`${totalRevenueFromRequester} BBit`}</RewardValue>
									</RewardItem>
								</RewardWrapper>
							</WalletTitlebar>
						) : routeGroup === 'inbox' ? (
							<TitleBar>
								<Title>Inbox</Title>
							</TitleBar>
						) : routeGroup === 'settings' ? (
							<TitleBar>
								<Title>Settings</Title>
							</TitleBar>
						) : null}
					</Box>
				</BoxWrapper>
			</HeaderWrapper>
		);
	}
}
