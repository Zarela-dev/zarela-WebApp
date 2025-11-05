import getWeb3 from '../getFallbackWeb3';
import { actionTypes } from './actionTypes';
import axios from 'axios';
import ZarelaContractABI from '../abi/ZarelaSmartContract.json';

export const getZarelaCurrentDay = (dispatch, contract) => {
	// Use promise-based call for Web3 v4 compatibility
	contract.methods.zarelaDayCounter().call()
		.then((data) => {
			let zarelaDay = data;

			dispatch({
				type: actionTypes.SET_ZARELA_CURRENT_DAY,
				payload: zarelaDay,
			});
		})
		.catch((error) => {
			console.error('Error calling zarelaDayCounter:', error.message || error);
		});
};

export const configureWeb3 = async (dispatch, web3Library) => {
	try {
		const contractAddress = process.env.REACT_APP_ZARELA_CONTRACT_ADDRESS;
		
		if (!contractAddress) {
			throw new Error('REACT_APP_ZARELA_CONTRACT_ADDRESS is not configured in .env file');
		}

		// Get current network to validate we're on Mainnet
		// In Web3 v1.2.2, we use net.getId() or eth.net.getId()
		let chainId;
		try {
			// Try modern API first
			chainId = await web3Library.eth.net.getId();
		} catch (err) {
			// Fallback for older versions
			chainId = await web3Library.eth.getChainId();
		}
		console.log('Connected to network with chainId:', chainId);
		
		if (Number(chainId) !== 1) {
			console.warn(`Warning: Connected to network ${chainId}, but app expects Ethereum Mainnet (1)`);
		}

		// Verify contract exists at address
		const code = await web3Library.eth.getCode(contractAddress);
		if (!code || code === '0x' || code === '0x0') {
			console.error(`⚠️ No contract code found at address ${contractAddress} on network ${chainId}`);
			console.error('Please verify the contract address is correct for Mainnet');
		} else {
			console.log(`✓ Contract verified at ${contractAddress}`);
		}

		const ZarelaContract = new web3Library.eth.Contract(
			ZarelaContractABI,
			contractAddress
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
		const contractAddress = process.env.REACT_APP_ZARELA_CONTRACT_ADDRESS;

		if (!contractAddress) {
			throw new Error('REACT_APP_ZARELA_CONTRACT_ADDRESS is not configured in .env file');
		}

		// Get current network to validate we're on Mainnet
		// In Web3 v1.2.2, we use net.getId() or eth.net.getId()
		let chainId;
		try {
			// Try modern API first
			chainId = await web3.eth.net.getId();
		} catch (err) {
			// Fallback for older versions
			try {
				chainId = await web3.eth.getChainId();
			} catch (err2) {
				// If all else fails, assume Mainnet since we're using Mainnet RPC
				chainId = 1;
				console.warn('Could not determine chainId, assuming Mainnet (1)');
			}
		}
		console.log('Fallback Web3 connected to Mainnet with chainId:', chainId);

		// Verify contract exists at address
		const code = await web3.eth.getCode(contractAddress);
		if (!code || code === '0x' || code === '0x0') {
			console.error(`⚠️ No contract code found at address ${contractAddress} on network ${chainId}`);
			console.error('Please verify the contract address is correct for Mainnet');
		} else {
			console.log(`✓ Fallback contract verified at ${contractAddress}`);
		}

		const ZarelaContract = new web3.eth.Contract(ZarelaContractABI, contractAddress);

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
    // Use Etherscan Gas Oracle API - standard endpoint works better than v2
    const apiKey = process.env.REACT_APP_ETHEREUM_API_KEY;
    
    if (!apiKey) {
        console.warn('REACT_APP_ETHEREUM_API_KEY not set, skipping gas price fetch');
        return;
    }
    
    axios
        .get('https://api.etherscan.io/api', {
            params: {
                module: 'gastracker',
                action: 'gasoracle',
                apikey: apiKey,
            },
        })
        .then((res) => {
            const result = res?.data?.result;
            if (result) {
                // Normalize to the structure the app expects
                const normalized = {
                    safeLow: Number(result.SafeGasPrice || result.suggestBaseFee),
                    average: Number(result.ProposeGasPrice),
                    fast: Number(result.FastGasPrice),
                };
                dispatch({
                    type: actionTypes.SET_GAS,
                    payload: normalized,
                });
                console.log('Gas prices fetched successfully:', normalized);
            } else {
                console.warn('Etherscan API returned no gas price data');
            }
        })
        .catch((error) => {
            console.warn('Failed to fetch gas prices from Etherscan:', error.message);
            // Don't break the app if gas price fetch fails
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
