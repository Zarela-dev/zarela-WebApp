import Web3 from 'web3';

const getWeb3 = async () =>
	new Promise((resolve, reject) => {
		// Wait for loading completion to avoid race conditions with web3 injection timing.
		window.addEventListener('load', async () => {
			// Modern dapp browsers
			if (window.ethereum) {
				const web3 = new Web3(window.ethereum);
				try {
					// Test the connection first
					await web3.eth.getBlockNumber();
					resolve(web3);
				} catch (error) {
					console.log('MetaMask RPC failed, using public RPC fallback');
					// Fallback to public RPC if MetaMask fails
					const fallbackWeb3 = new Web3('https://eth.llamarpc.com');
					resolve(fallbackWeb3);
				}
			}
			// Legacy dapp browsers
			else if (window.web3) {
				// Use Mist/MetaMask's provider.
				const web3 = window.web3;
				console.log('Injected web3 detected.');
				resolve(web3);
			}
			// No wallet, use public RPC
			else {
				console.log('No wallet detected, using public RPC');
				const web3 = new Web3('https://eth.llamarpc.com');
				resolve(web3);
			}
		});
	});

export default getWeb3;
