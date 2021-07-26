import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CreateRequest from '../pages/CreateRequest';
import Header from './Header';
import RequestDetails from '../pages/RequestDetails/RequestDetails';
import Inbox from '../pages/Inbox';
import IntroModal from './IntroModal';
import BottomNavigation from './BottomNavigation';
import styled from 'styled-components';
import Wallet from '../pages/Wallet/Wallet';
import RequestsList from '../pages/RequestsList';
import Context from './../utils/context';
import MyAccount from '../pages/MyAccount';

const AppWrapper = styled.div`
	padding-bottom: ${(props) => props.theme.spacing(5)};
`;

const AppRouter = () => {
	const provider = window.ethereum;
	const context = useContext(Context);

	useEffect(() => {
		if (
			/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
				navigator.userAgent
			)
		) {
			context.setDevice('Mobile');
		} else {
			context.setDevice('Desktop');
		}
	}, [context.device]);

	if (!provider)
		return (
			<>
				<IntroModal />
			</>
		);
	return (
		<Router>
			<AppWrapper>
				{context.device === 'Mobile' ? (
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
			</AppWrapper>
		</Router>
	);
};

export default AppRouter;
