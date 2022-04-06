import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { WalletDesktop } from './WalletDesktop';
import { WalletMobile } from './WalletMobile';
import { ETHERSCAN_BASE_URL } from '../../constants';
import { useStore } from '../../state/store';
import { getConnectorHooks } from '../../utils/getConnectorHooks';

const Wallet = () => {
	const [logs, setLogs] = useState([]);
	const [isLoading, setLoading] = useState(false);
	const PAGE_SIZE = 30;
	const { isMobile, contract, activeConnector } = useStore();
	const { useAccount, useProvider } = getConnectorHooks(activeConnector);
	const provider = useProvider();
	const account = useAccount();

	useEffect(() => {
		if (account) {
			setLoading(true);
			axios
				.get(ETHERSCAN_BASE_URL, {
					params: {
						module: 'account',
						action: 'txlist',
						address: account,
						sort: 'desc',
						apikey: process.env.REACT_APP_ETHEREUM_API_KEY,
					},
				})
				.then((txListRes) => {
					if (txListRes.data.message === 'OK') {
						axios
							.get(ETHERSCAN_BASE_URL, {
								params: {
									module: 'account',
									action: 'tokentx',
									address: account,
									contractaddress: process.env.REACT_APP_ZARELA_CONTRACT_ADDRESS,
									sort: 'desc',
									apikey: process.env.REACT_APP_ETHEREUM_API_KEY,
								},
							})
							.then(async (tokentxRes) => {
								/* 
									here we have two APIs from etherscan that each of them give parts of the list we want,
									here we take the parts that we want from each list, then merge and sort them.

									here is a list of what we want and where they are located on the APIs.

									tokentx																										txlist		
									-----------------------------------------------------------------------------------
										reward (from both pool and request owners)							tx inputs
										proper values																						contribution
										BBit transfers																					ETH transfer
																																						confirmation
																																						create request
																																						isError

									results will include all transactions from above lists. but the values are overridden by tokentx.
									also the inputs are overridden by txlist.
								*/
								if (tokentxRes.data.message === 'OK') {
									const smartContactAddress = process.env.REACT_APP_ZARELA_CONTRACT_ADDRESS.toLowerCase();

									const txlist = txListRes.data.result;
									const tokentx = tokentxRes.data.result;

									const tokentxFormatted = {};
									const txlistFormatted = {};

									tokentx.forEach((item) => {
										tokentxFormatted[item.hash] = item;
									});

									txlist.forEach((item) => {
										txlistFormatted[item.hash] = item;
									});

									let result = [];

									txlist.forEach((item) => {
										result.push({
											...item,
											value: tokentxFormatted[item.hash]?.value || txlistFormatted[item.hash]?.value || 0,
										});
										/* 
											we exclude the data that is already present on txlist to prevent duplication
											on final results
										*/
										delete tokentxFormatted[item.hash];
									});

									async function isZarelaContract(txObject) {
										return txObject.from === smartContactAddress || txObject.to === smartContactAddress ? true : false;
									}

									const mergeResults = async () => {
										for (const txItem of Object.values(tokentxFormatted)) {
											const hasZarela = await isZarelaContract(txItem);

											// to prevent the appearance of transactions that are not made
											// to/from Zarela smart contract
											if (hasZarela) {
												result.push({
													...txItem,
													input: 'Reward',
												});
											} else {
												result.push({
													...txItem,
													input: 'BBit transfer',
												});
											}
										}
									};

									await mergeResults();
									result.sort((a, b) => +b.timeStamp - +a.timeStamp);

									setLogs(result);
								}
							})
							.catch((error) => {
								console.error(error);
							})
							.finally(() => {
								setLoading(false);
							});
					}
				})
				.catch((error) => {
					console.error(error);
				})
				.finally(() => {
					setLoading(false);
				});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [account]);

	if (isMobile) {
		return <WalletMobile {...{ account, logs, isLoading, PAGE_SIZE }} />;
	} else {
		return <WalletDesktop {...{ account, logs, isLoading, PAGE_SIZE }} />;
	}
};

export default Wallet;
