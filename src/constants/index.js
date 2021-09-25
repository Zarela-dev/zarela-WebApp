export const supportedChains = {
	MAINNET: 1,
	ROPSTEN: 3,
	RINKEBY: 4,
	GOERLI: 5,
	KOVAN: 42,
	ARBITRUM_KOVAN: 144545313136048,
	ARBITRUM_ONE: 42161,
};

export const NETWORK_LABELS = {
	[supportedChains.MAINNET]: 'Mainnet',
	[supportedChains.RINKEBY]: 'Rinkeby',
	[supportedChains.ROPSTEN]: 'Ropsten',
	[supportedChains.GOERLI]: 'Görli',
	[supportedChains.KOVAN]: 'Kovan',
	[supportedChains.ARBITRUM_KOVAN]: 'kArbitrum',
	[supportedChains.ARBITRUM_ONE]: 'Arbitrum One',
};

export const CURRENT_NETWORK_LABEL =
	process.env.NODE_ENV === 'production' && process.env.REACT_APP_IS_TEST_NET !== 'true'
		? NETWORK_LABELS[supportedChains.MAINNET]
		: NETWORK_LABELS[supportedChains.ROPSTEN];

export const ETHERSCAN_BASE_URL =
	process.env.NODE_ENV === 'production' && process.env.REACT_APP_IS_TEST_NET !== 'true'
		? process.env.REACT_APP_ETHERSCAN_API_LINK
		: process.env.REACT_APP_ETHERSCAN_ROPSTEN_API_LINK;
