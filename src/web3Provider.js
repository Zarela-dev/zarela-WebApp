import React, { useEffect, useReducer } from 'react';
import getWeb3 from './getWeb3';
import { convertToBiobit } from './utils';
import axios from 'axios';

const initialState = {
	web3: null,
	contract: null,
	accounts: [],
	error: null,
	bank: 0,
	biobitBalance: 'Hidden Info',
	etherBalance: 'Hidden Info',
	gas: {},
	zarelaInitDate: null,
	zarelaDailyGift: null,
};

const web3Context = React.createContext(initialState);

const Web3Provider = ({ children }) => {
	const [Web3, dispatch] = useReducer((state, action) => {
		const { type } = action;

		switch (type) {
			case 'SET_WEB3':
				return {
					...state,
					web3: action.payload
				};
			case 'SET_BANK':
				return {
					...state,
					bank: action.payload
				};
			case 'SET_CONTRACT':
				return {
					...state,
					contract: action.payload
				};
			case 'SET_BIOBIT_BALANCE':
				return {
					...state,
					biobitBalance: action.payload
				};
			case 'SET_ETHER_BALANCE':
				return {
					...state,
					etherBalance: action.payload
				};
			case 'SET_ACCOUNTS':
				return {
					...state,
					accounts: action.payload
				};
			case 'SET_ERROR':
				return {
					...state,
					error: action.payload
				};
			case 'SET_GAS':
				return {
					...state,
					gas: action.payload
				};
			case 'SET_ZARELA_INIT_DATE':
				return {
					...state,
					zarelaInitDate: action.payload
				};
			case 'SET_ZARELA_DAILY_GIFT':
				return {
					...state,
					zarelaDailyGift: action.payload
				};
			default:
				return state;
		}
	}, initialState);


	const configureWeb3 = async () => {
		if (window.ethereum)
			try {
				// Get network provider and web3 instance.
				const web3 = await getWeb3();
				// Use web3 to get the user's accounts.
				const accounts = await web3.eth.getAccounts();
				// Get the contract instance.
				// const networkId = await web3.eth.net.getId();
				// const deployedNetwork = SimpleStorageContract.networks[networkId];
				const ZarelaContract = new web3.eth.Contract(
					JSON.parse(process.env.REACT_APP_ZARELA_CONTRACT_ABI),
					process.env.REACT_APP_ZARELA_CONTRACT_ADDRESS
				);
				// Set web3, accounts, and contract to the state, and then proceed with an
				// example of interacting with the contract's methods.

				window.ethereum.on('accountsChanged', (accounts) => {

					// Handle the new accounts, or lack thereof.
					// "accounts" will always be an array, but it can be empty.
					console.log('account changed', accounts);
					dispatch({
						type: 'SET_ACCOUNTS',
						payload: accounts
					});
				});

				window.ethereum.on('connect', () => {
					console.log('connected to metamask');
				});

				window.ethereum.on('connect', () => {
					console.log('disconnected from metamask');
				});

				//   ethereum.on('chainChanged', (chainId) => {
				// 	// Handle the new chain.
				// 	// Correctly handling chain changes can be complicated.
				// 	// We recommend reloading the page unless you have good reason not to.
				// 	window.location.reload();
				//   });

				dispatch({
					type: 'SET_WEB3',
					payload: web3
				});
				dispatch({
					type: 'SET_CONTRACT',
					payload: ZarelaContract
				});
				dispatch({
					type: 'SET_ACCOUNTS',
					payload: accounts
				});
			} catch (error) {
				// Catch any errors for any of the above operations.
				console.error(
					`Failed to load web3, accounts, or contract. Check console for details.`,
				);
				console.error(error);
				dispatch({
					type: 'SET_ERROR',
					payload: error
				});
			}
		return () => {
			delete window.web3;
		};
	};

	const setTimers = () => {
		if (Web3.contract) {
			setInterval(() => {
				Web3.contract.methods.smart_contract_started().call((error, result) => {
					if (!error) {
						dispatch({
							type: 'SET_ZARELA_INIT_DATE',
							payload: result * 1000
						});
					}
					else {
						console.error(error.message);
					}
				});
			}, 10 * 1000);

			Web3.contract.methods.smart_contract_started().call((error, result) => {
				if (!error) {
					dispatch({
						type: 'SET_ZARELA_INIT_DATE',
						payload: result * 1000
					});
				}
				else {
					console.error(error.message);
				}
			});

			Web3.contract.methods.start_date_Daily().call((error, result) => {
				if (!error) {
					dispatch({
						type: 'SET_ZARELA_DAILY_GIFT',
						payload: result * 1000
					});
				}
				else {
					console.error(error.message);
				}
			});
		}
	};

	const getGasPrice = () => {
		axios.get('https://ethgasstation.info/api/ethgasAPI.json', {
			params: {
				'api-key': process.env.REACT_APP_GASSTATION_API_KEY
			}
		}).then(res => {
			dispatch({
				type: 'SET_GAS',
				payload: res.data
			});
		}).catch(error => {
			console.log(error);
		});
	};

	useEffect(() => {
		setTimers();
	}, [Web3.contract]);

	useEffect(() => {
		configureWeb3();
		getGasPrice();
	}, []);

	useEffect(() => {
		if (Web3.accounts.length > 0) {
			Web3.contract.methods.balanceOf(Web3.accounts[0]).call((error, result) => {
				if (!error) {
					dispatch({
						type: 'SET_BIOBIT_BALANCE',
						payload: result
					});
				}
				else {
					console.error(error.message);
				}
			});

			Web3.contract.methods.bank().call((error, result) => {
				if (!error) {
					dispatch({
						type: 'SET_BANK',
						payload: convertToBiobit(result)
					});
				}
				else {
					console.error(error.message);
				}
			});

			Web3.web3.eth.getBalance(Web3.accounts[0]).then(function (result) {
				dispatch({
					type: 'SET_ETHER_BALANCE',
					payload: Web3.web3.utils.fromWei(result, "ether")
				});
			}).catch(error => {
				console.error(error.message);
			});
		}
	}, [Web3.accounts.length]);

	return (
		<web3Context.Provider
			value={{
				Web3
			}}
		>
			{children}
		</web3Context.Provider>
	);
};

export { web3Context, Web3Provider };
