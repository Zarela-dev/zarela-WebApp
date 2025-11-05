import Web3 from 'web3';

export default function getLibrary(provider) {
	// Web3 v1.2.2 constructor - simple provider wrapping
	// The provider is already connected by @web3-react
	const library = new Web3(provider);
	
	// Set polling interval for balance updates (optional)
	library.eth.transactionPollingTimeout = 750;
	library.eth.transactionConfirmationBlocks = 1;
	
	return library;
}
