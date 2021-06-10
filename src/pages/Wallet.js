import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import WalletListItem from '../components/WalletListItem';
import { web3Context } from '../web3Provider';

const Wallet = () => {
	const { Web3 } = useContext(web3Context);
	const [logs, setLogs] = useState([]);
	const [isLoading, setLoading] = useState(true);

	useEffect(() => {
		axios.get('https://api-kovan.etherscan.io/api', {
			params: {
				module: 'account',
				action: 'tokentx',
				contractaddress: process.env.REACT_APP_ZARELA_CONTRACT_ADDRESS,
				address: '0x24A2E85627bB70C98fAfA2D1cFe85df05f72E160',
				page: 1,
				offset: 0,
				sort: 'async',
				apikey: process.env.REACT_APP_ETHEREUM_API_KEY,
			}
		}).then(res => {
			if (res.data.message == 'OK')
				setLogs(res.data.result);
		}).catch(error => {
			console.error(error);
		}).finally(() => {
			setLoading(false);
		});
	}, []);

	return (
		<div>
			{
				isLoading && Web3.accounts.length > 0 ?
					<div>is Loading</div> :
					logs.map(item => {
						return (
							<WalletListItem
								transactionHash={item.hash}
								timeStamp={item.timeStamp}
								from={item.from}
								to={item.to}
								BBTValue={item.value}
								incoming={Web3.accounts[0] === item.to}
							/>
						);
					})
			}
		</div>
	);
};

export default Wallet;
