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
			// Try public RPC endpoints - more reliable for read-only operations
			// Don't use wallet provider here as it can have compatibility issues
			for (const rpcUrl of MAINNET_RPC_URLS) {
				try {
					console.log(`Attempting to connect to: ${rpcUrl}`);
					const provider = new Web3.providers.HttpProvider(rpcUrl);
					const web3 = new Web3(provider);
					
					// Test the connection with a simple call
					const blockNumber = await web3.eth.getBlockNumber();
					console.log(`Successfully connected to Mainnet via: ${rpcUrl} (block: ${blockNumber})`);
					resolve(web3);
					return;
				} catch (error) {
					console.log(`Failed to connect to ${rpcUrl}: ${error.message}, trying next...`);
				}
			}
			
			// If all fail, reject with error
			reject(new Error('Could not connect to any Ethereum Mainnet RPC endpoint'));
		});
	});

export default getWeb3;
