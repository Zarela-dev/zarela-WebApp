import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// import CreateRequest from './pages/CreateRequest';
// import RequestDetails from './pages/RequestDetails/RequestDetails';
// import Inbox from './pages/Inbox';
// import Wallet from './pages/Wallet/Wallet';
// import Log from './pages/Log/Log';
// import Settings from './pages/Settings';
// import { supportedChains } from './constants/index';
// import ChainError from './components/ChainError';
// import NotFound from './components/NotFoundPage';
// import RequestsList from './pages/RequestsList';
// import Header from './components/Header';
// import IntroModal from './components/IntroModal';
// import BottomNavigation from './components/BottomNavigation';
import styled from 'styled-components';
import ConnectorModal from './components/ConnectorModal';
// import { mainContext } from './state';

const AppWrapper = styled.div`
	padding-bottom: ${(props) => props.theme.space[4]}px;
`;

const AppRouter = () => {
	const provider = window.ethereum;
	// const { appState } = useContext(mainContext);
	const metamaskChainId = provider?.request({ method: 'eth_chainId' });

	// if (!provider)
	// 	return (
	// 		<>
	// 			<IntroModal />
	// 		</>
	// 	);

	// if (hasChainError) return <ChainError />;

	return (
		<Router>
			<AppWrapper>
			{/* <ConnectorModal /> */}
				{/* {appState.isMobile ? (
					<>
						<Header isMobile={appState.isMobile} />
						<BottomNavigation />
					</>
				) : (
					<Header isMobile={appState.isMobile ?? false} />
				)} */}
				<Switch>
					{/* <Route exact path="/" component={RequestsList} /> */}
					{/* <Route exact path="/request/create" component={CreateRequest} />
					<Route exact path="/request/:id" component={RequestDetails} />
					<Route exact path="/inbox" component={Inbox} />
					<Route path="/wallet" component={Wallet} />
					<Route path="/log" component={Log} />
					<Route path="/settings" component={Settings} />
					<Route component={NotFound} /> */}
				</Switch>
			</AppWrapper>
		</Router>
	);
};

export default AppRouter;
