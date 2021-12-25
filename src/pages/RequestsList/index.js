import React, { useContext, useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { mainContext } from '../../state';
import Desktop from './Desktop';
import Mobile from './Mobile';
import Guide from './../../components/Guide/Guide';
import { RequestDetailsDesktopSteps, RequestDetailsMobileSteps } from '../../guides';
import { convertToBiobit } from '../../utils';
// import { useQuery, gql } from '@apollo/client';
// import { searchClient } from '../../apolloClient';

const RequestsList = () => {
	const { appState } = useContext(mainContext);
	const { account } = useWeb3React();
	const [dailyContributors, setDailyContributors] = useState(0);

	const PAGE_SIZE = 5;
	const [requests, setRequests] = useState({});
	const [requestsCount, setRequestsCount] = useState(0);
	const [isLoading, setLoading] = useState(true);

	// const [currentPage, setCurrentPage] = useState(0);

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

	// const { error, isLoading, data, fetchMore } = useQuery(
	// 	gql`
	// 		query ($skip: Int, $first: Int) {
	// 			requests(first: $first, skip: $skip) {
	// 				id
	// 				contributions {
	// 					id
	// 				}
	// 				confirmations {
	// 					id
	// 				}
	// 				details {
	// 					id
	// 					requestID
	// 					title
	// 					description
	// 					requesterAddress
	// 					angelTokenPay
	// 					laboratoryTokenPay
	// 					totalContributors
	// 					totalContributed
	// 					zpaper
	// 					timestamp
	// 					categories
	// 					totalContributedCount
	// 				}
	// 			}
	// 		}
	// 	`,
	// 	{
	// 		pollInterval: INTERVAL,
	// 		client: searchClient,
	// 		variables: {
	// 			first: PER_PAGE,
	// 			skip: currentPage,
	// 		},
	// 	}
	// );

	// useEffect(() => {
	// 	if (error) {
	// 		console.log('error', error);
	// 	}
	// 	if (data !== undefined) {
	// 		const response = data.requests;
	// 		console.log('response', response);
	// 		let template = {};

	// 		try {
	// 			response.forEach((item) => {
	// 				template[item.id] = {
	// 					requestID: item.id,
	// 					title: item.details.title,
	// 					description: item.details.description,
	// 					requesterAddress: item.details.requesterAddress,
	// 					angelTokenPay: convertToBiobit(item.details.angelTokenPay),
	// 					laboratoryTokenPay: convertToBiobit(item.details.laboratoryTokenPay),
	// 					totalContributors: item.details.totalContributors,
	// 					totalContributed: item.confirmations.length,
	// 					whitePaper: item.details.zpaper,
	// 					timestamp: item.details.timestamp,
	// 					categories: item.details.categories,
	// 					totalContributedCount: item.contributions.length,
	// 				};
	// 			});

	// 			console.log('template', template);
	// 			setRequests(template);
	// 		} catch (err) {
	// 			console.log('err', err);
	// 		}
	// 	}
	// }, [data]);

	// const { error, isLoading, data, fetchMore } = useQuery(
	// 	gql`
	// 		query ($skip: Int, $first: Int) {
	// 			requestDetails(first: $first, skip: $skip, where: { title: "test" }) {
	// 				requestID {
	// 					id
	// 				}
	// 			}
	// 		}
	// 	`,
	// 	{
	// 		pollInterval: INTERVAL,
	// 		client: searchClient,
	// 		variables: {
	// 			first: PER_PAGE,
	// 			skip: currentPage,
	// 		},
	// 	}
	// );

	// const { RequestsError, requestsIsLoading, requestsData, requestsFetchMore } = useQuery(
	// 	gql`
	// 		query ($skip: Int, $first: Int, $id: Int) {
	// 			search(text: $id) {
	// 				id
	// 			}
	// 		}
	// 	`,
	// 	{
	// 		pollInterval: INTERVAL,
	// 		client: searchClient,
	// 		variables: {
	// 			first: PER_PAGE,
	// 			skip: currentPage,
	// 		},
	// 	}
	// );

	// useEffect(() => {
	// 	if (error) {
	// 		console.log('error', error);
	// 	}
	// 	if (data !== undefined) {
	// 		const response = data.requestDetails;
	// 		console.log('response', response);
	// 		let template = {};

	// 		const selectedIds = response.map((item) => item.requestID.id).join(' | ');

	// 		console.log('selectedIds', typeof(selectedIds) , selectedIds, `"${selectedIds}"`);

	// 		requestsFetchMore({
	// 			variables: {
	// 				id: `"${selectedIds}"`,
	// 			},
	// 		});

	// 		try {
	// 			if (requestsData !== undefined) {
	// 				console.log('requests data ', requestsData);
	// 			}
	// 		} catch (err) {
	// 			console.log('err', err);
	// 		}

	// try {
	// 	response.forEach((item) => {
	// 		console.log('item', item.requestID.id);
	// 		requestsFetchMore({
	// 			variables: {
	// 				id: item.requestID.id,
	// 			},
	// 		});
	// 	});
	// 	// setRequests(template);

	// 	console.log('request item', requestsData);
	// } catch (err) {
	// 	console.log('err', err);
	// }
	// 	}
	// }, [data, requestsData]);

	// useEffect(() => {
	// 	console.log('templates', template);
	// }, [template]);

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
						account,
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
