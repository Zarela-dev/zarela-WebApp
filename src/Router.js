import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core';

import CreateRequest from './pages/CreateRequest';
import Header from './components/Header';
import RequestDetails from './pages/RequestDetails/RequestDetails';
import Inbox from './pages/Inbox';
import IntroModal from './components/IntroModal';
import BottomNavigation from './components/BottomNavigation';
import styled from 'styled-components';
import Wallet from './pages/Wallet/Wallet';
import RequestsList from './pages/RequestsList';
import Log from './pages/Log/Log';
import Settings from './pages/Settings';
import { mainContext } from './state';
import { supportedChains } from './constants/index';
import ChainError from './components/ChainError';
import NotFound from './components/NotFoundPage';
import MultiSend from './pages/MultiSend';

const AppWrapper = styled.div`
	padding-bottom: ${(props) => props.theme.space[4]}px;
`;

const AppRouter = () => {
	const provider = window.ethereum;
	const { appState } = useContext(mainContext);
	const { error, chainId } = useWeb3React();
	const metamaskChainId = provider?.request({ method: 'eth_chainId' });
	const [hasChainError, setChainError] = useState(error instanceof UnsupportedChainIdError);

	useEffect(() => {
		if (provider) {
			try {
				metamaskChainId.then((currentChainId) => {
					if (process.env.NODE_ENV === 'production' && process.env.REACT_APP_IS_TEST_NET !== 'true') {
						if (parseInt(currentChainId, 16) !== supportedChains.MAINNET) {
							setChainError(true);
						}
					} else {
						if (parseInt(currentChainId, 16) !== supportedChains.ROPSTEN) {
							setChainError(true);
						}
					}
				});
				// watch for network changes
				provider.on('chainChanged', async (_chainId) => {
					window.location.reload();
				});
			} catch (error) {
				console.error(error);
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [error, chainId, provider]);

	if (!provider)
		return (
			<>
				<IntroModal />
			</>
		);

	if (hasChainError) return <ChainError />;

	return (
		<Router>
			<AppWrapper>
				{appState.isMobile ? (
					<>
						<Header isMobile={appState.isMobile} />
						<BottomNavigation />
					</>
				) : (
					<Header isMobile={appState.isMobile ?? false} />
				)}
				<Switch>
					<Route exact path="/" component={RequestsList} />
					<Route exact path="/request/create" component={CreateRequest} />
					<Route exact path="/request/:id" component={RequestDetails} />
					<Route exact path="/inbox" component={Inbox} />
					<Route path="/wallet" component={Wallet} />
					<Route path="/log" component={Log} />
					<Route path="/settings" component={Settings} />
					<Route path="/multisend/:stage" component={MultiSend} />
					<Route path="/multisend" component={MultiSend} />
					<Route component={NotFound} />
				</Switch>
			</AppWrapper>
		</Router>
	);
};

export default AppRouter;
