import React, { useContext, useEffect, useState } from 'react';
import { mainContext } from '../../state';
import { convertToBiobit } from '../../utils';
import { useWeb3React } from '@web3-react/core';
import Desktop from './Desktop';
import Mobile from './Mobile';
// import Splash from '../../components/Splash';

const RequestsList = () => {
	const { appState } = useContext(mainContext);
	const web3React = useWeb3React();
	const PAGE_SIZE = 2;
	const [requests, setRequests] = useState({});
	const [requestsCount, setRequestsCount] = useState(0);
	const [dailyContributors, setDailyContributors] = useState(0);
	const [isLoading, setLoading] = useState(true);

	// pagination hook
	useEffect(() => {
		if (appState.contract !== null) {
			appState.contract.methods.orderSize().call((error, result) => {
				if (!error) {
					setRequestsCount(result);
				} else {
					console.error(error.message);
				}
			});

			for (let i = 0; i < requestsCount; i++) {
				appState.contract.methods.Categories(i).call((error, result) => {
					if (!error) {
						let categories = result[0];
						let businessCategory = result[1];

						if (+businessCategory === +process.env.REACT_APP_ZARELA_BUSINESS_CATEGORY)
							// only show zarela requests
							appState.contract.methods.orders(i).call((error, result) => {
								if (!error) {
									const requestTemplate = {
										requestID: result[0],
										title: result[1],
										description: result[6],
										requesterAddress: result[2],
										tokenPay: convertToBiobit(result[3]),
										totalContributors: result[4], // total contributors required
										totalContributed: +result[4] - +result[7],
										whitePaper: result[5],
										timestamp: result[9],
										categories,
										totalContributedCount: result[8],
									};
									setRequests((requests) => ({
										...requests,
										[requestTemplate.requestID]: requestTemplate,
									}));
									if (i === +requestsCount - 1) setLoading(false);
								} else {
									console.error(error.message);
								}
							});
					} else {
						console.error(error.message);
					}
				});
			}
		}
	}, [appState.contract, requestsCount]);

	useEffect(() => {
		if (appState.contract) {
			appState.contract.methods.todayContributionsCount().call((error, result) => {
				if (!error) setDailyContributors(result);
				else console.error(error.message);
			});
		}
	}, [appState.contract]);

	if (appState.isMobile) {
		return (
			<>
				{/* <Splash isVisible={isLoading} /> */}
				<Mobile {...{ requests, isLoading, appState, PAGE_SIZE }} />
			</>
		);
	} else {
		return (
			<Desktop
				{...{
					requests,
					appState,
					web3React,
					dailyContributors,
					PAGE_SIZE,
					isLoading,
				}}
			/>
		);
	}
};

export default RequestsList;
