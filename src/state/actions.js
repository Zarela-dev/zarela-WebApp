import getWeb3 from '../getFallbackWeb3';
import { actionTypes } from './actionTypes';
import axios from 'axios';
import ZarelaContractABI from '../abi/ZarelaSmartContract.json';

export const getZarelaCurrentDay = (dispatch, contract) => {
	contract.methods.zarelaDayCounter().call((error, data) => {
		if (!error) {
			let zarelaDay = data;

			dispatch({
				type: actionTypes.SET_ZARELA_CURRENT_DAY,
				payload: zarelaDay,
			});
		}
	});
};

export const configureWeb3 = async (dispatch, web3Library) => {
	try {
		const ZarelaContract = new web3Library.eth.Contract(
			ZarelaContractABI,
			process.env.REACT_APP_ZARELA_CONTRACT_ADDRESS
		);

		dispatch({
			type: actionTypes.SET_CONTRACT,
			payload: ZarelaContract,
		});
	} catch (error) {
		console.error(`Failed to load web3, accounts, or contract. Check console for details.`, error);

		dispatch({
			type: actionTypes.SET_ERROR,
			payload: error,
		});
	}
};

export const configureFallbackWeb3 = async (dispatch) => {
	try {
		const web3 = await getWeb3();

		const ZarelaContract = new web3.eth.Contract(ZarelaContractABI, process.env.REACT_APP_ZARELA_CONTRACT_ADDRESS);

		dispatch({
			type: actionTypes.SET_FALLBACK_WEB3,
			payload: web3,
		});

		dispatch({
			type: actionTypes.SET_CONTRACT,
			payload: ZarelaContract,
		});
	} catch (error) {
		console.error(`Failed to load web3, accounts, or contract. Check console for details.`, error);

		dispatch({
			type: actionTypes.SET_ERROR,
			payload: error,
		});
	}
};

export const getGasPrice = (dispatch) => {
    // Use Etherscan Gas Oracle V2 to avoid CORS issues from ethgasstation
    axios
        .get('https://api.etherscan.io/v2/api', {
            params: {
                module: 'gastracker',
                action: 'gasoracle',
                chainid: 1, // Ethereum mainnet
                apikey: process.env.REACT_APP_ETHEREUM_API_KEY,
            },
        })
        .then((res) => {
            const result = res?.data?.result;
            if (result) {
                // Normalize to the structure the app expects
                const normalized = {
                    safeLow: Number(result.SafeGasPrice),
                    average: Number(result.ProposeGasPrice),
                    fast: Number(result.FastGasPrice),
                };
                dispatch({
                    type: actionTypes.SET_GAS,
                    payload: normalized,
                });
            }
        })
        .catch((error) => {
            console.log(error);
        });
};

export const SaveGuideToLocalStorage = (dispatch, route) => {
	localStorage.setItem('guide/' + route, true);
	dispatch({
		type: actionTypes.SET_GUIDE_IS_OPEN,
		payload: false,
	});
};

export const getEthPrice = (dispatch) => {
	/**
	 * get ethereum price in USD
	 */
	const request = require('request');

	// axios
	// 	.get('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD')
	// 	.then((response) => {
	// 		dispatch({
	// 			type: actionTypes.SET_ETH_PRICE,
	// 			payload: response.data.USD,
	// 		});
	// 	})
	// 	.catch((error) => {
	// 		console.log('error', error);
	// 	});
};
