import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CreateRequest from '../pages/CreateRequest';
import RequestsList from '../pages/RequestsList';
import Header from './Header';
import RequestDetails from '../pages/RequestDetails/RequestDetails';
import Inbox from '../pages/Inbox';
import MyAccount from '../pages/MyAccount';
import Wallet from '../pages/Wallet';
import IntroModal from './IntroModal';
import BottomNavigation from './BottomNavigation';
import styled from 'styled-components';

const AppWrapper = styled.div`
	padding-bottom: ${(props) => props.theme.spacing(5)};
`;

const AppRouter = () => {
	const provider = window.ethereum;

	if (!provider)
		return (
			<>
				<IntroModal />
			</>
		);

	return (
		<Router>
			<AppWrapper>
				{/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
					navigator.userAgent
				) ? (
					<>
						<Header device="mobile" />
						<BottomNavigation />
					</>
				) : (
					<Header device="desktop" />
				)}
				<Switch>
					<Route exact path="/" component={RequestsList} />
					<Route exact path="/request/create" component={CreateRequest} />
					<Route exact path="/request/:id" component={RequestDetails} />
					<Route exact path="/inbox" component={Inbox} />
					<Route exact path="/account" component={MyAccount} />
					<Route path="/wallet" component={Wallet} />
				</Switch>
				{/* <MobileMenu /> */}
			</AppWrapper>
		</Router>
	);
};

export default AppRouter;
