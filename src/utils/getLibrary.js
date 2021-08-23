import Web3 from 'web3';

export default function getLibrary(provider) {
	const library = new Web3(
		provider,
		typeof provider.chainId === 'number'
			? provider.chainId
			: typeof provider.chainId === 'string'
			? parseInt(provider.chainId)
			: 'any'
	);

	library.pollingInterval = 15000;
	return library;
}
