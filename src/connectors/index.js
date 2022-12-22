import { InjectedConnector } from '@web3-react/injected-connector';
import { supportedChains } from '../constants';

export const injectedConnector = new InjectedConnector({
	supportedChainIds:
		process.env.NODE_ENV === 'production' && process.env.REACT_APP_IS_TEST_NET !== 'true'
			? [supportedChains.MAINNET]
			: [supportedChains.GOERLI],
});
