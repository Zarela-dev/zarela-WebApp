import { InjectedConnector } from '@web3-react/injected-connector';
import { supportedChains } from '../constants';

export const injectedConnector = new InjectedConnector({
	supportedChainIds: [supportedChains.ROPSTEN]
});