import React, { useContext, useEffect, useState } from 'react';
import { mainContext } from '../../state';
import { timeSince, convertToBiobit } from '../../utils';
import { useWeb3React } from '@web3-react/core';
import Desktop from './Desktop';
import Mobile from './Mobile';
import Context from './../../utils/context';

const RequestsList = () => {
	const context = useContext(Context);
	const { appState } = useContext(mainContext);
	const web3React = useWeb3React();
	const PAGE_SIZE = 3;
	const [requests, setRequests] = useState({});
	const [requestsCount, setRequestsCount] = useState(0);
	const [dailyContributors, setDailyContributors] = useState(0);
	const [BiobitBasedOnEth, setBiobitBasedOnEth] = useState(0);
	const [ZarelaReward, setZarelaReward] = useState(0);

	// pagination hook
	useEffect(() => {
		if (appState.contract !== null) {
			appState.contract.methods.OrderSize().call((error, result) => {
				if (!error) {
					setRequestsCount(result);
				} else {
					console.error(error.message);
				}
			});

			for (let i = 0; i < requestsCount; i++) {
				appState.contract.methods.ord_file(i).call((error, result) => {
					if (!error) {
						const requestTemplate = {
							requestID: result[0],
							title: result[1],
							description: result[6],
							requesterAddress: result[2],
							tokenPay: convertToBiobit(result[3]),
							totalContributors: result[4], // total contributors required
							totalContributed: +result[4] - +result[7],
							categories: result[8], // NOT TO BE USED IN DEMO
							whitePaper: result[5],
							timestamp: result[10],
							totalContributedCount: result[9]
						};
						setRequests(requests => ({
							...requests,
							[requestTemplate.requestID]: requestTemplate
						}));
					} else {
						console.error(error.message);
					}
				});
			}
		}
	}, [appState.contract, requestsCount]);

	useEffect(() => {
		if (appState.contract) {
			appState.contract.methods.Prize().call((error, result) => {
				if (!error)
					setZarelaReward(+result * 2);
				else
					console.error(error.message);
			});
			appState.contract.methods.contributer_count().call((error, result) => {
				if (!error)
					setDailyContributors(result);
				else
					console.error(error.message);
			});
			appState.contract.methods.GetETHPrice().call((error, result) => {
				if (!error)
					setBiobitBasedOnEth((1 / (+result / Math.pow(10, 8))).toFixed(6));
				else
					console.error(error.message);
			});
		};

		// move to wallet #todo
		// appState.contract.methods.sum_of_reward_per_contributer((error, result) => {
		// 	if (!error)
		// 		console.log(result);
		// 	else
		// 		console.error(error.message);
		// })

	}, [appState.contract]);

	if (context.device === "Mobile") {
		return (
			<Mobile {...{ requests }} />
		);
	} else {
		return (
			<Desktop {...{ requests, appState, web3React, ZarelaReward, BiobitBasedOnEth, dailyContributors }} />
		)
	}
};

export default RequestsList;