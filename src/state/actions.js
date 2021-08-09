import getWeb3 from '../getFallbackWeb3';
import {
	actionTypes
} from './actionTypes';
import axios from 'axios';

export const configureWeb3 = async (dispatch, web3Library) => {
	try {
		const ZarelaContract = new web3Library.eth.Contract(
			JSON.parse(process.env.REACT_APP_ZARELA_CONTRACT_ABI),
			process.env.REACT_APP_ZARELA_CONTRACT_ADDRESS
		);

		dispatch({
			type: actionTypes.SET_CONTRACT,
			payload: ZarelaContract
		});
	} catch (error) {
		console.error(
			`Failed to load web3, accounts, or contract. Check console for details.`, error,
		);

		dispatch({
			type: actionTypes.SET_ERROR,
			payload: error
		});
	}
};

export const configureFallbackWeb3 = async (dispatch) => {
	try {
		const web3 = await getWeb3();
		
		const ZarelaContract = new web3.eth.Contract(
			JSON.parse(process.env.REACT_APP_ZARELA_CONTRACT_ABI),
			process.env.REACT_APP_ZARELA_CONTRACT_ADDRESS
		);

		dispatch({
			type: actionTypes.SET_FALLBACK_WEB3,
			payload: web3
		});

		dispatch({
			type: actionTypes.SET_CONTRACT,
			payload: ZarelaContract
		});
	} catch (error) {
		console.error(
			`Failed to load web3, accounts, or contract. Check console for details.`, error,
		);

		dispatch({
			type: actionTypes.SET_ERROR,
			payload: error
		});
	}
};

export const setTimers = (dispatch, contract) => {
	if (contract) {
		contract.methods.timer_24Hour().call((error, result) => {
			if (!error) {
				dispatch({
					type: actionTypes.SET_ZARELA_DAILY_GIFT,
					payload: result * 1000
				});
			}
			else {
				console.error(error.message);
			}
		});
	}
};

export const getGasPrice = (dispatch) => {
	axios.get('https://ethgasstation.info/api/ethgasAPI.json', {
		params: {
			'api-key': process.env.REACT_APP_GASSTATION_API_KEY
		}
	}).then(res => {
		dispatch({
			type: actionTypes.SET_GAS,
			payload: res.data
		});
	}).catch(error => {
		console.log(error);
	});
};

export const initializeContract = (web3Instance) => {
	if (web3Instance !== null) {
		const ZarelaContract = new web3Instance.eth.Contract(
			JSON.parse(process.env.REACT_APP_ZARELA_CONTRACT_ABI),
			process.env.REACT_APP_ZARELA_CONTRACT_ADDRESS
		);

	}
};