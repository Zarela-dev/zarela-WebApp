import React, { useContext, useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { mainContext } from '../../state';
import { convertToBiobit } from '../../utils';
import Desktop from './Desktop';
import Mobile from './Mobile';
import Guide from './../../components/Guide/Guide';
import { RequestDetailsDesktopSteps, RequestDetailsMobileSteps } from '../../guides';

const RequestsList = () => {
	const { appState } = useContext(mainContext);
	const web3React = useWeb3React();
	const PAGE_SIZE = 5;
	const [requests, setRequests] = useState({});
	const [requestsCount, setRequestsCount] = useState(0);
	const [dailyContributors, setDailyContributors] = useState(0);
	const [isLoading, setLoading] = useState(true);

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
							// filter categories and only show Zarela requests
							appState.contract.methods.orders(i).call((error, result) => {
								if (!error) {
									const requestTemplate = {
										requestID: result[0],
										title: result[1],
										description: result[7],
										requesterAddress: result[2],
										angelTokenPay: convertToBiobit(result[3]),
										laboratoryTokenPay: convertToBiobit(result[4]),
										totalContributors: result[5], // total contributors required
										totalContributed: +result[5] - +result[8],
										whitePaper: result[6],
										timestamp: result[10],
										categories,
										totalContributedCount: result[9],
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

	return (
		<Guide steps={appState.isMobile ? RequestDetailsMobileSteps : RequestDetailsDesktopSteps} isLoading={isLoading}>
			{appState.isMobile ? (
				<Mobile {...{ requests, isLoading, appState, PAGE_SIZE }} />
			) : (
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
			)}
		</Guide>
	);
};

export default RequestsList;
