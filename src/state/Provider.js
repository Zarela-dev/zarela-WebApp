import React, { useEffect, useReducer } from 'react';
import { convertToBiobit, toast } from '../utils';
import { actionTypes } from './actionTypes';
import { configureFallbackWeb3, getGasPrice, configureWeb3 } from './actions';
import { useWeb3React } from '@web3-react/core';
import { injectedConnector } from '../connectors';

const appInitialState = {
	error: null,

	biobitBalance: 'Hidden Info',
	etherBalance: 'Hidden Info',

	gas: {},

	fallbackWeb3Instance: null,
	contract: null,

	isMobile: null,
};

const mainContext = React.createContext(appInitialState);

const AppProvider = ({ children }) => {
	const { library, account, active, activate } = useWeb3React();

	const [appState, dispatch] = useReducer((state, action) => {
		const { type } = action;

		switch (type) {
			case actionTypes.SET_FALLBACK_WEB3:
				return {
					...state,
					fallbackWeb3Instance: action.payload,
				};
			case actionTypes.SET_CONTRACT:
				return {
					...state,
					contract: action.payload,
				};
			case actionTypes.SET_BBIT_BALANCE:
				return {
					...state,
					biobitBalance: action.payload,
				};
			case actionTypes.SET_ETHER_BALANCE:
				return {
					...state,
					etherBalance: action.payload,
				};
			case actionTypes.SET_ERROR:
				return {
					...state,
					error: action.payload,
				};
			case actionTypes.SET_GAS:
				return {
					...state,
					gas: action.payload,
				};
			case actionTypes.SET_CLIENT_DEVICE:
				return {
					...state,
					isMobile: action.payload,
				};
			default:
				return state;
		}
	}, appInitialState);

	useEffect(() => {
		getGasPrice(dispatch);
		dispatch({
			type: actionTypes.SET_CLIENT_DEVICE,
			payload: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
				? true
				: false,
		});
	}, []);

	useEffect(() => {
		if (library) {
			configureWeb3(dispatch, library);
		} else {
			configureFallbackWeb3(dispatch);
		}
	}, [library]);

	useEffect(() => {
		if (account !== undefined && appState.contract) {
			appState.contract.methods.balanceOf(account).call((error, result) => {
				if (!error) {
					dispatch({
						type: actionTypes.SET_BBIT_BALANCE,
						payload: result,
					});
				} else {
					console.error(error.message);
				}
			});
		}
	}, [account, appState.contract]);

	useEffect(() => {
		const activeWeb3 = library || appState.fallbackWeb3Instance;
		if (activeWeb3 && appState.contract) {
			if (account)
				activeWeb3.eth
					.getBalance(account)
					.then(function (result) {
						dispatch({
							type: actionTypes.SET_ETHER_BALANCE,
							payload: activeWeb3.utils.fromWei(result, 'ether'),
						});
					})
					.catch((error) => {
						console.error(error.message);
					});
		}
	}, [account, library, appState.contract, appState.fallbackWeb3Instance]);

	// manually activate metamask in case it's connected
	useEffect(() => {
		if (window.ethereum?.selectedAddress && active === false) {
			activate(injectedConnector);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [active, window.ethereum?.selectedAddress]);

	return (
		<mainContext.Provider
			value={{
				appState,
			}}
		>
			{children}
		</mainContext.Provider>
	);
};

export { mainContext, AppProvider };
