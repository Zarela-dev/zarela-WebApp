import Web3 from 'web3';

// Multiple reliable Mainnet RPC endpoints as fallbacks
const MAINNET_RPC_URLS = [
	'https://eth.llamarpc.com',
	'https://rpc.ankr.com/eth',
	'https://ethereum.publicnode.com',
	'https://cloudflare-eth.com',
];

const getWeb3 = async () =>
	new Promise((resolve, reject) => {
		// Wait for loading completion to avoid race conditions with web3 injection timing.
		window.addEventListener('load', async () => {
			// Modern dapp browsers - try wallet first
			if (window.ethereum) {
				const web3 = new Web3(window.ethereum);
				try {
					// Test the connection first
					await web3.eth.getBlockNumber();
					console.log('Using wallet provider for Mainnet');
					resolve(web3);
					return;
				} catch (error) {
					console.log('Wallet RPC failed, trying public RPC fallbacks');
				}
			}
			
			// Legacy dapp browsers
			if (window.web3) {
				const web3 = window.web3;
				console.log('Injected web3 detected.');
				resolve(web3);
				return;
			}
			
			// Try public RPC endpoints in order until one works
			for (const rpcUrl of MAINNET_RPC_URLS) {
				try {
					console.log(`Attempting to connect to: ${rpcUrl}`);
					const web3 = new Web3(rpcUrl);
					// Test the connection
					await web3.eth.getBlockNumber();
					console.log(`Successfully connected to Mainnet via: ${rpcUrl}`);
					resolve(web3);
					return;
				} catch (error) {
					console.log(`Failed to connect to ${rpcUrl}, trying next...`);
				}
			}
			
			// If all fail, reject with error
			reject(new Error('Could not connect to any Ethereum Mainnet RPC endpoint'));
		});
	});

export default getWeb3;
