import React, { useEffect, useReducer } from 'react';
// import { useWeb3React } from '@web3-react/core';
// import { convertToBiobit } from '../utils';
// import { actionTypes } from './actionTypes';
// import { configureFallbackWeb3, getZarelaCurrentDay, getGasPrice, getEthPrice, configureWeb3 } from './actions';
// import { injectedConnector } from '../connectors';

const appInitialState = {
	error: null,

	biobitBalance: 'Hidden Info',
	etherBalance: 'Hidden Info',

	gas: {},
	ethPrice: null,

	fallbackWeb3Instance: null,
	contract: null,
	isMobile: null,
	isMobileSearchModalShow: null,
	guideIsOpen: null,
	notificationCount: null,

	zarelaCurrent: null,
};

const mainContext = React.createContext(appInitialState);

const AppProvider = ({ children }) => {
	// const { library, account, active, activate } = useWeb3React();

	return <mainContext.Provider value={{}}>{children}</mainContext.Provider>;
};

export { mainContext, AppProvider };
