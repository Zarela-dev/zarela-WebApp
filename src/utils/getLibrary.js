// import { Web3Provider } from '@ethersproject/providers';
import Web3 from "web3";

export default function getLibrary(provider) {
	const library = new Web3(
		provider,
		typeof provider.chainId === 'number'
			? provider.chainId
			: typeof provider.chainId === 'string'
				? parseInt(provider.chainId)
				: 'any'
	);
	// TODO: this should depend on the network block time
	library.pollingInterval = 15000;
	return library;
}
