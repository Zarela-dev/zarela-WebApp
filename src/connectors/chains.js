function isExtendedChainInformation(chainInformation) {
	return !!chainInformation.nativeCurrency;
}

export function getAddChainParameters(chainId) {
	const chainInformation = CHAINS[chainId];
	if (isExtendedChainInformation(chainInformation)) {
		return {
			chainId,
			chainName: chainInformation.name,
			nativeCurrency: chainInformation.nativeCurrency,
			rpcUrls: chainInformation.urls,
			blockExplorerUrls: chainInformation.blockExplorerUrls,
		};
	} else {
		return chainId;
	}
}

export const CHAINS = {
	1: {
		urls: [
			process.env.REACT_APP_INFURA_KEY ? `https://mainnet.infura.io/v3/${process.env.REACT_APP_INFURA_KEY}` : undefined,
			process.env.REACT_APP_ALCHEMY_KEY
				? `https://eth-mainnet.alchemyapi.io/v2/${process.env.REACT_APP_ALCHEMY_KEY}`
				: undefined,
			process.env.REACT_APP_POCKET_KEY
				? `https://eth-mainnet.gateway.pokt.network/v1/lb/${process.env.REACT_APP_POCKET_KEY}`
				: undefined,
		].filter((url) => url !== undefined),
		name: 'Mainnet',
	},
	3: {
		urls: [
			process.env.REACT_APP_INFURA_KEY ? `https://ropsten.infura.io/v3/${process.env.REACT_APP_INFURA_KEY}` : undefined,
			process.env.REACT_APP_ALCHEMY_KEY
				? `https://eth-ropsten.alchemyapi.io/v2/${process.env.REACT_APP_ALCHEMY_KEY}`
				: undefined,
			process.env.REACT_APP_POCKET_KEY
				? `https://eth-ropsten.gateway.pokt.network/v1/lb/${process.env.REACT_APP_POCKET_KEY}`
				: undefined,
		].filter((url) => url !== undefined),
		name: 'Ropsten',
	},
};

export const RPCEndpoints = Object.keys(CHAINS).reduce((accumulator, chainId) => {
	const validURLs = CHAINS[Number(chainId)].urls;

	if (validURLs.length) {
		accumulator[Number(chainId)] = validURLs;
	}

	return accumulator;
}, {});
