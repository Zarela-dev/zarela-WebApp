import Web3 from 'web3';

export default function getLibrary(provider) {
	// Web3 v4 only accepts provider as first argument
	// chainId and pollingInterval are no longer used
	const library = new Web3(provider);
	return library;
}
