export const supportedChains = {
	MAINNET: 1,
	ROPSTEN: 3,
	RINKEBY: 4,
	GOERLI: 5,
	KOVAN: 42,
	ARBITRUM_KOVAN: 144545313136048,
	ARBITRUM_ONE: 42161,
	POLYGON_TESTNET: 80001,
};

export const NETWORK_LABELS = {
	[supportedChains.MAINNET]: 'Mainnet',
	[supportedChains.RINKEBY]: 'Rinkeby',
	[supportedChains.ROPSTEN]: 'Ropsten',
	[supportedChains.GOERLI]: 'Görli',
	[supportedChains.KOVAN]: 'Kovan',
	[supportedChains.ARBITRUM_KOVAN]: 'kArbitrum',
	[supportedChains.ARBITRUM_ONE]: 'Arbitrum One',
	[supportedChains.POLYGON_TESTNET]: 'Polygon Testnet',
};

export const CURRENT_NETWORK_LABEL = NETWORK_LABELS[supportedChains.POLYGON_TESTNET];

export const ETHERSCAN_BASE_URL = process.env.REACT_APP_ETHERSCAN_ROPSTEN_API_LINK;
