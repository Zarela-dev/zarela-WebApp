import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import WalletListItem from '../components/WalletListItem';
import { web3Context } from '../web3Provider';

const Wallet = () => {
	const { Web3 } = useContext(web3Context);
	const [logs, setLogs] = useState([]);
	const [isLoading, setLoading] = useState(true);

	useEffect(() => {
		if (Web3.accounts.length)
			axios.get('https://api-kovan.etherscan.io/api', {
				params: {
					module: 'account',
					action: 'tokentx',
					contractaddress: process.env.REACT_APP_ZARELA_CONTRACT_ADDRESS,
					address: Web3.accounts[0],
					page: 1,
					offset: 0,
					sort: 'async',
					apikey: process.env.REACT_APP_ETHEREUM_API_KEY,
				}
			}).then(res => {
				if (res.data.message === 'OK')
					setLogs(res.data.result);
			}).catch(error => {
				console.error(error);
			}).finally(() => {
				setLoading(false);
			});
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isLoading, Web3.accounts.length]);

	return (
		<div>
			{
				isLoading === false && Web3.accounts.length > 0 ?
					logs.map(item => {
						return (
							<WalletListItem
								transactionHash={item.hash}
								timeStamp={item.timeStamp}
								from={item.from}
								to={item.to}
								BBTValue={item.value}
								incoming={Web3.accounts[0].toLowerCase().trim() === item.to.trim() ? true : false}
							/>
						);
					}) :
					<div>is Loading</div>
			}
		</div>
	);
};

export default Wallet;
