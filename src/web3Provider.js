import React, { useEffect, useReducer } from 'react';
import getWeb3 from './getWeb3';

const initialState = {
	web3: null,
	contract: null,
	accounts: [],
	error: null,
	biobitBalance: 0,
	etherBalance: 0
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
					JSON.parse(process.env.REACT_APP_ZarelaContractABI),
					process.env.REACT_APP_ZarelaContractAddress
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

				ZarelaContract.methods.balanceOf(accounts[0]).call((error, result) => {
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

				web3.eth.getBalance(accounts[0]).then(function (result) {
					dispatch({
						type: 'SET_ETHER_BALANCE',
						payload: web3.utils.fromWei(result, "ether") + " ETH"
					});
				}).catch(error => {
					console.error(error.message);
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

	useEffect(() => {
		configureWeb3();
	}, []);

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
