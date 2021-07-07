import { useEffect, useContext, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { mainContext } from '../state';

const useWeb3 = () => {
	const web3React = useWeb3React();
	const { appState } = useContext(mainContext);
	const [web3Instance, setWeb3Instance] = useState(null);

	/** 
	 * since we need to call contract methods for fetching requests list and details, to provide the users some content
	 * before they are connected to their wallets, here take advantage of web3 package and if there's no wallet connected we 
	 * set the "web3" package as a fallback provider to call methods on, this has limitations that we need to watch out for.
	 * for instance, later if the user calls some methods on the contract that requires address we need to prompt them to 
	 * connect before they continue.
	 * when using library, please note that our reference in the "web3" package, not ethers/web3Provider.
	 */
	useEffect(() => {
		if (appState !== undefined) {
			if (web3React.library)
				setWeb3Instance(web3React.library);
			else
				setWeb3Instance(appState.fallbackWeb3Instance);
		}
	}, [web3React.library, appState?.fallbackWeb3Instance]);

	return web3Instance;
};

export default useWeb3;
