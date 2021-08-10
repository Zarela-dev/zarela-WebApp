import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import Spinner from '../../components/Spinner';
import LogCard from '../../components/LogCards/Contribution';
import LogCardMobile from '../../components/LogCards/ContributionMobile';
import { mainContext } from './../../state';
import { useWeb3React } from '@web3-react/core';
import { convertToBiobit } from '../../utils';
import NoRequestsFound from '../../components/NoRequestsFound';

const SpinnerWrapper = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	padding: ${(props) => props.theme.spacing(3)};
	align-items: center;
`;

const Contributes = () => {
	const { appState } = useContext(mainContext);
	const [requests, setRequests] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const { account } = useWeb3React();

	useEffect(() => {
		if (appState.contract !== null) {
			if (account) {
				appState.contract.methods
					.orderResult()
					.call({ from: account })
					.then((result) => {
						const userContributionsSet = new Set(result[1]);
						const userContributions = [...userContributionsSet];

						const getAllRequests = new Promise(async (resolve, reject) => {
							const requests = [];
							const getRequestFiles = (requestContributions) => {
								let addresses = requestContributions[0];
								let timestamps = requestContributions[1];
								let status = requestContributions[2];
								let zarelaDay = requestContributions[3];

								let formatted = {};
								addresses.forEach((address, originalIndex) => {
									formatted[originalIndex] = {
										originalIndex,
										timestamp: timestamps[originalIndex],
										zarelaDay: zarelaDay[originalIndex],
										status: status[originalIndex],
									};
								});

								let userContributionIndexes = [];
								addresses.forEach((item, index) => {
									if (item.toLowerCase() === account.toLowerCase()) {
										userContributionIndexes.push(index);
									}
								});

								const userContributions = userContributionIndexes.map(
									(originalIndex) => formatted[originalIndex] || null
								);

								return userContributions.filter((item) => item !== null);
							};

							try {
								for (const currentRequest of userContributions) {
									let requestInfo = await appState.contract.methods.orders(currentRequest).call();
									let contributions = await appState.contract.methods
										.getOrderData(currentRequest)
										.call({ from: account });

									const requestTemplate = {
										requestID: requestInfo[0],
										title: requestInfo[1],
										description: requestInfo[6],
										requesterAddress: requestInfo[2],
										tokenPay: convertToBiobit(requestInfo[3]),
										totalContributors: requestInfo[4],
										totalContributed: +requestInfo[4] - +requestInfo[7],
										whitePaper: requestInfo[5],
										timestamp: requestInfo[9],
										totalContributedCount: requestInfo[8],
										// files contributed on this request filtered by current user
										contributions: getRequestFiles(contributions),
									};
									requests.push(requestTemplate);
								}
								resolve(requests);
							} catch (error) {
								console.error(error.message);
								reject(error.message);
							}
						});

						getAllRequests.then((requestsList) => {
							console.log('requestsList', requestsList);
							setRequests(requestsList);
							setIsLoading(false);
						});
					})
					.catch((error) => {
						console.error(error.message);
					});
			}
		}
	}, [account, appState.contract]);

	const message = 'you have not contributed on any requests yet.';
	if (appState.isMobile)
		return isLoading ? (
			<SpinnerWrapper>
				<Spinner />
			</SpinnerWrapper>
		) : requests.length === 0 ? (
			<NoRequestsFound message={message} />
		) : (
			requests.map((request) => <LogCardMobile key={request.requestID} data={request} />)
		);
	return isLoading ? (
		<SpinnerWrapper>
			<Spinner />
		</SpinnerWrapper>
	) : requests.length === 0 ? (
		<NoRequestsFound message={message} />
	) : (
		requests.map((request) => <LogCard key={request.requestID} data={request} />)
	);
};

export default Contributes;
