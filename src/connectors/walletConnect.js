import { initializeConnector } from '@web3-react/core';
import { WalletConnect } from '@web3-react/walletconnect';
import { RPCEndpoints } from './chains';

export const [WCConnector, WCHooks, WCStore] = initializeConnector(
	(actions) =>
		new WalletConnect(actions, {
			rpc: Object.keys(RPCEndpoints).reduce((accumulator, chainId) => {
				accumulator[Number(chainId)] = RPCEndpoints[Number(chainId)][0];
				return accumulator;
			}, {}),
		}),
	Object.keys(RPCEndpoints).map((chainId) => Number(chainId))
);
