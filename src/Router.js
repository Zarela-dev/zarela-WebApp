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

const AppWrapper = styled.div`
	padding-bottom: ${(props) => props.theme.space[4]}px;
`;

const AppRouter = () => {
    const provider = window.ethereum;
    const { appState } = useContext(mainContext);
    const { error, chainId } = useWeb3React();
    const [hasChainError, setChainError] = useState(error instanceof UnsupportedChainIdError);

    useEffect(() => {
        if (provider) {
            const checkChain = async () => {
                try {
                    let currentChainIdHex = null;
                    if (typeof provider.request === 'function') {
                        // Modern EIP-1193 providers
                        currentChainIdHex = await provider.request({ method: 'eth_chainId' });
                    } else if (provider.chainId) {
                        // Some legacy providers expose chainId directly
                        currentChainIdHex = provider.chainId;
                    }

                    if (currentChainIdHex != null) {
                        if (parseInt(currentChainIdHex, 16) !== supportedChains.MAINNET) {
                            setChainError(true);
                        } else {
                            setChainError(false);
                        }
                    }
                } catch (err) {
                    // If the provider does not support eth_chainId, do not block the app
                    console.error('Unable to read chainId from provider:', err);
                }

                // watch for network changes if supported
                if (typeof provider.on === 'function') {
                    provider.on('chainChanged', async (_chainId) => {
                        window.location.reload();
                    });
                }
            };

            checkChain();
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
					<Route component={NotFound} />
				</Switch>
			</AppWrapper>
		</Router>
	);
};

export default AppRouter;
