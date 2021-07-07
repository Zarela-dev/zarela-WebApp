import React, { useEffect, useReducer } from 'react';
import { convertToBiobit, toast } from '../utils';
import { actionTypes } from './actionTypes';
import {
	configureFallbackWeb3,
	setTimers,
	getGasPrice,
	configureWeb3
} from './actions';
import { useWeb3React } from '@web3-react/core';
import { injectedConnector } from '../connectors';
const appInitialState = {
	error: null,

	bank: 0,
	biobitBalance: 'Hidden Info',
	etherBalance: 'Hidden Info',

	gas: {},

	fallbackWeb3Instance: null,
	contract: null,

	zarelaInitDate: null,
	zarelaDailyGift: null,
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
					fallbackWeb3Instance: action.payload
				};
			case actionTypes.SET_ZARELA_BANK:
				return {
					...state,
					bank: action.payload
				};
			case actionTypes.SET_CONTRACT:
				return {
					...state,
					contract: action.payload
				};
			case actionTypes.SET_BBIT_BALANCE:
				return {
					...state,
					biobitBalance: action.payload
				};
			case actionTypes.SET_ETHER_BALANCE:
				return {
					...state,
					etherBalance: action.payload
				};
			case actionTypes.SET_ERROR:
				return {
					...state,
					error: action.payload
				};
			case actionTypes.SET_GAS:
				return {
					...state,
					gas: action.payload
				};
			case actionTypes.SET_ZARELA_INIT_DATE:
				return {
					...state,
					zarelaInitDate: action.payload
				};
			case actionTypes.SET_ZARELA_DAILY_GIFT:
				return {
					...state,
					zarelaDailyGift: action.payload
				};
			default:
				return state;
		}
	}, appInitialState);

	useEffect(() => {
		getGasPrice(dispatch);
	}, []);

	useEffect(() => {
		if (library) {
			configureWeb3(dispatch, library);
		} else {
			configureFallbackWeb3(dispatch);
		}
	}, [library]);

	useEffect(() => {
		if (appState.contract) {
			setTimers(dispatch, appState.contract);
			if (appState.contract)
				appState.contract.events.Transfer({})
					.on('data', (event) => {
						toast(
							`${convertToBiobit(event.returnValues[2])} tokens were successfully sent to ${event.returnValues[1]}.`,
							'success',
							false,
							null,
							{
								toastId: event.id
							}
						);
					})
					.on('error', (error, receipt) => {
						toast(error.message, 'error');
						console.error(error, receipt);
					});
		}
	}, [appState.contract]);

	useEffect(() => {
		if (account !== undefined && appState.contract) {
			appState.contract.methods.balanceOf(account).call((error, result) => {
				if (!error) {
					dispatch({
						type: actionTypes.SET_BBIT_BALANCE,
						payload: result
					});
				}
				else {
					console.error(error.message);
				}
			});
		}
	}, [account, appState.contract]);

	useEffect(() => {
		const activeWeb3 = library || appState.fallbackWeb3Instance;
		if (activeWeb3 && appState.contract && account) {
			activeWeb3.eth.getBalance(account).then(function (result) {
				dispatch({
					type: actionTypes.SET_ETHER_BALANCE,
					payload: activeWeb3.utils.fromWei(result, "ether")
				});
			}).catch(error => {
				console.error(error.message);
			});

			appState.contract.methods.bank().call((error, result) => {
				if (!error) {
					dispatch({
						type: actionTypes.SET_ZARELA_BANK,
						payload: convertToBiobit(result)
					});
				}
				else {
					console.error(error.message);
				}
			});
		}
	}, [account, library, appState.contract, appState.fallbackWeb3Instance]);

	// manually activate metamask in case it's connected
	useEffect(() => {
		if (window.ethereum.selectedAddress !== null && active === false) {
			activate(injectedConnector);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [active]);

	console.log(account);
	return (
		<mainContext.Provider
			value={{
				appState
			}}
		>
			{children}
		</mainContext.Provider>
	);
};

export { mainContext, AppProvider };
