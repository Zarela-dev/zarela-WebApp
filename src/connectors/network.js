import { initializeConnector } from '@web3-react/core';
import { Network } from '@web3-react/network';
import { RPCEndpoints } from './chains';

export const [NetworkConnector, NetworkHooks, NetworkStore] = initializeConnector(
	(actions) => new Network(actions, RPCEndpoints),
	Object.keys(RPCEndpoints).map((chainId) => Number(chainId))
);
