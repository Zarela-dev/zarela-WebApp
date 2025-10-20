export const supportedChains = {
	MAINNET: 1,
	SEPOLIA: 11155111,
	// RINKEBY: 4,
	// GOERLI: 5,
	// KOVAN: 42,
	// ARBITRUM_KOVAN: 144545313136048,
	// ARBITRUM_ONE: 42161,
};

export const NETWORK_LABELS = {
	[supportedChains.MAINNET]: 'Mainnet',
	// [supportedChains.RINKEBY]: 'Rinkeby',
	[supportedChains.SEPOLIA]: 'Sepolia',
	// [supportedChains.GOERLI]: 'Görli',
	// [supportedChains.KOVAN]: 'Kovan',
	// [supportedChains.ARBITRUM_KOVAN]: 'kArbitrum',
	// [supportedChains.ARBITRUM_ONE]: 'Arbitrum One',
};

export const CURRENT_NETWORK_LABEL = NETWORK_LABELS[supportedChains.MAINNET];

export const ETHERSCAN_BASE_URL = process.env.REACT_APP_ETHERSCAN_MAINNET_API_LINK;
