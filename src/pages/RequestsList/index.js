import React, { useContext, useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { mainContext } from '../../state';
import Desktop from './Desktop';
import Mobile from './Mobile';
import Guide from './../../components/Guide/Guide';
import { RequestDetailsDesktopSteps, RequestDetailsMobileSteps } from '../../guides';
import { convertToBiobit } from '../../utils';
import { useQuery, gql } from '@apollo/client';
import { searchClient } from '../../apolloClient';
import { template } from 'lodash';

const RequestsList = () => {
	const { appState } = useContext(mainContext);
	const { account } = useWeb3React();
	const [dailyContributors, setDailyContributors] = useState(0);

	const [requests, setRequests] = useState({});
	const INTERVAL = 15 * 1000;
	const PER_PAGE = 5;

	const [currentPage, setCurrentPage] = useState(0);

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

	const { error, isLoading, data, fetchMore } = useQuery(
		gql`
			query ($skip: Int, $first: Int) {
				requestDetails(first: $first, skip: $skip, where: { title: "test" }) {
					requestID {
						id
					}
				}
			}
		`,
		{
			pollInterval: INTERVAL,
			client: searchClient,
			variables: {
				first: PER_PAGE,
				skip: currentPage,
			},
		}
	);

	useEffect(() => {
		if (error) {
			console.log('error', error);
		}
		if (data !== undefined) {
			const response = data.requests;
			console.log('response', response);
			let template = {};

			try {
				response.forEach((item) => {
					template[item.id] = {
						requestID: item.id,
						title: item.details.title,
						description: item.details.description,
						requesterAddress: item.details.requesterAddress,
						angelTokenPay: convertToBiobit(item.details.angelTokenPay),
						laboratoryTokenPay: convertToBiobit(item.details.laboratoryTokenPay),
						totalContributors: item.details.totalContributors,
						totalContributed: item.confirmations.length,
						whitePaper: item.details.zpaper,
						timestamp: item.details.timestamp,
						categories: item.details.categories,
						totalContributedCount: item.contributions.length,
					};
				});
				setRequests(template);
			} catch (err) {
				console.log('err', err);
			}
		}
	}, [data]);

	useEffect(() => {
		console.log('templates', template);
	}, [template]);

	useEffect(() => {
		if (appState.contract) {
			appState.contract.methods.todayContributionsCount().call((error, result) => {
				if (!error) setDailyContributors(result);
				else console.error(error.message);
			});
		}
	}, [appState.contract]);

	return (
		// <Guide steps={appState.isMobile ? RequestDetailsMobileSteps : RequestDetailsDesktopSteps} isLoading={false}>
		// 	{appState.isMobile ? (
		// 		<Mobile {...{ appState, requests, fetchMore, currentPage, setCurrentPage, PER_PAGE, isLoading }} />
		// 	) : (
		// 		<Desktop
		// 			{...{
		// 				appState,
		// 				requests,
		// 				fetchMore,
		// 				currentPage,
		// 				setCurrentPage,
		// 				PER_PAGE,
		// 				isLoading,
		// 				account,
		// 				dailyContributors,
		// 			}}
		// 		/>
		// 	)}
		// </Guide>
		null
	);
};

export default RequestsList;
