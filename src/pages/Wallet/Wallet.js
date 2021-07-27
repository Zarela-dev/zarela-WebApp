import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { mainContext } from "../../state";
import { useWeb3React } from "@web3-react/core";
import Desktop from "./Desktop";
import Mobile from "./Mobile";

const Wallet = () => {
	const { appState } = useContext(mainContext);
	const [logs, setLogs] = useState([]);
	const [isLoading, setLoading] = useState(false);
	const { account } = useWeb3React();

	useEffect(() => {
		if (account) {
			setLoading(true);
			axios
				.get("https://api-kovan.etherscan.io/api", {
					params: {
						module: "account",
						action: "txlist",
						address: account,
						sort: "desc",
						apikey: process.env.REACT_APP_ETHEREUM_API_KEY,
					},
				})
				.then((txListRes) => {
					if (txListRes.data.message === "OK") {
						axios
							.get("https://api-kovan.etherscan.io/api", {
								params: {
									module: "account",
									action: "tokentx",
									address: account,
									contractaddress:
										process.env.REACT_APP_ZARELA_CONTRACT_ADDRESS,
									sort: "desc",
									apikey: process.env.REACT_APP_ETHEREUM_API_KEY,
								},
							})
							.then(async (tokentxRes) => {
								/* 
							here we have a two APIs from etherscan that each of them give parts of the list we want,
							here we take the parts that we want from each list them merge and sort them.

							here is a list of what we want and where they are located on the APIs.

								tokentx																txlist		
							-----------------------------------------------------------------------------------
								reward (from both pool and request owners)							tx inputs
								proper values														contribution
								BBit transfers														ETH transfer
																									confirmation
																									create request

							results will include all transactions from above lists. but the values are overridden by tokentx.
							also the inputs are overridden by txlist.
						*/
								if (tokentxRes.data.message === "OK") {
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
											value:
												tokentxFormatted[item.hash]?.value ||
												txlistFormatted[item.hash]?.value ||
												0,
										});
										/* 
									we exclude the data that is already present on txlist to prevent duplication
									on final results
								*/
										delete tokentxFormatted[item.hash];
									});

									async function hasZarelaContract(txObject) {
										/* 
									to detect if the address is a contract so we can filter it
									(we don't want to show txs from other dApps or our previous smart contracts)
								*/
										let from = await appState.fallbackWeb3Instance.eth.getCode(
											txObject.from
										);
										let to = await appState.fallbackWeb3Instance.eth.getCode(
											txObject.to
										);

										if (
											(from !== "0x" &&
												txObject.from === smartContactAddress) ||
											(to !== "0x" && txObject.to === smartContactAddress)
										) {
											return true;
										} else {
											return false;
										}
									}

									const mergeResults = async () => {
										for (const txItem of Object.values(tokentxFormatted)) {
											const hasZarela = await hasZarelaContract(txItem);

											if (hasZarela) {
												result.push({
													...txItem,
													input: "Reward",
												});
											} else {
												result.push({
													...txItem,
													input: "BBit transfer",
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

	if (appState.device === "Mobile") {
		return <Mobile {...{ account, logs, isLoading }} />;
	} else {
		return <Desktop {...{ account, logs, isLoading }} />;
	}
};

export default Wallet;
