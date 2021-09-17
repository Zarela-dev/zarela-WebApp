import Web3 from 'web3';

const getWeb3 = async () =>
	new Promise((resolve, reject) => {
		// Wait for loading completion to avoid race conditions with web3 injection timing.
		window.addEventListener('load', async () => {
			// Modern dapp browsers
			if (window.ethereum) {
				const web3 = new Web3(window.ethereum);
				try {
					resolve(web3);
				} catch (error) {
					reject(error);
				}
			}
			// Legacy dapp browsers
			else if (window.web3) {
				// Use Mist/MetaMask's provider.
				const web3 = window.web3;
				console.log('Injected web3 detected.');
				resolve(web3);
			}
		});
	});

export default getWeb3;
