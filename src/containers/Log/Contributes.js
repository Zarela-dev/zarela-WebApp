import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import { useWeb3React } from '@web3-react/core';
import LogCard from '../../components/LogCards/Contribution';
import LogCardMobile from '../../components/LogCards/ContributionMobile';
import { mainContext } from './../../state';
import { convertToBiobit } from '../../utils';
import NoRequestsFound from '../../components/NoRequestsFound';
import { Skeleton } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';

const Card = styled.div`
	width: 100%;
	margin-right: 30px;
	height: ${(props) => (props.isMobile ? '85px' : '180px')};
	margin-bottom: 15px;
	background: #fff;
	padding: 8px 5px;
	display: flex;
	flex-direction: row;
`;
const CircleSection = styled.div`
	margin-right: 28px;
`;
const SquareSection = styled.div`
	flex-grow: 1;
`;

const useStyles = makeStyles({
	root: {
		marginBottom: '12px',
		background: '#F1F6FC',
	},
});

const Contributes = (props) => {
	const { appState } = useContext(mainContext);
	const [requests, setRequests] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const { account } = useWeb3React();
	const classes = useStyles(props);

	useEffect(() => {
		if (appState.contract !== null) {
			if (account) {
				appState.contract.methods
					.orderResult()
					.call({ from: account })
					.then((result) => {
						const userContributionsSet = new Set([...result[1], ...result[2]]);
						const userContributions = [...userContributionsSet];

						const getAllRequests = new Promise(async (resolve, reject) => {
							const requests = [];
							const getRequestFiles = (requestContributions) => {
								let angels = requestContributions[0];
								let hubs = requestContributions[1];
								let timestamps = requestContributions[2];
								let rewardGainer = requestContributions[3];
								let status = requestContributions[4];
								let zarelaDay = requestContributions[5];

								let formatted = {};
								angels.forEach((angelAddress, originalIndex) => {
									formatted[originalIndex] = {
										originalIndex,
										timestamp: timestamps[originalIndex],
										zarelaDay: zarelaDay[originalIndex],
										status: status[originalIndex],
										angel: angels[originalIndex],
										hub: hubs[originalIndex],
										rewardGainer: rewardGainer[originalIndex],
									};
								});

								let userContributionIndexes = [];
								Object.keys(formatted).forEach((originalIndex) => {
									const { angel, hub } = formatted[originalIndex];
									if (
										angel.toLowerCase() === account.toLowerCase() ||
										hub.toLowerCase() === account.toLowerCase()
									) {
										userContributionIndexes.push(originalIndex);
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
									// #to-do improve readability
									const requestTemplate = {
										requestID: requestInfo[0],
										title: requestInfo[1],
										description: requestInfo[7],
										requesterAddress: requestInfo[2],
										angelTokenPay: convertToBiobit(requestInfo[3]),
										laboratoryTokenPay: convertToBiobit(requestInfo[4]),
										totalContributors: requestInfo[5], // total contributors required
										totalContributed: +requestInfo[5] - +requestInfo[8],
										whitePaper: requestInfo[6],
										timestamp: requestInfo[10],
										totalContributedCount: requestInfo[9],
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
			[1, 2, 3].map((index) => {
				return (
					<Card key={index} isMobile={appState.isMobile}>
						<CircleSection>
							<Skeleton variant="circle" width={41.72} height={41.72} className={classes.root} />
						</CircleSection>
						<SquareSection>
							<Skeleton
								variant="rect"
								width={'100%'}
								height={19}
								animation="wave"
								className={classes.root}
							/>
							<Skeleton variant="rect" width={'80%'} height={19.1} className={classes.root} />
						</SquareSection>
					</Card>
				);
			})
		) : requests.length === 0 ? (
			<NoRequestsFound message={message} />
		) : (
			requests.map((request) => <LogCardMobile key={request.requestID} data={request} />)
		);
	return isLoading ? (
		[1, 2, 3].map((index) => {
			return (
				<Card key={index} isMobile={appState.isMobile}>
					<CircleSection>
						<Skeleton variant="circle" width={72} height={72} className={classes.root} />
					</CircleSection>
					<SquareSection>
						<Skeleton variant="rect" width={'100%'} height={33} animation="wave" className={classes.root} />
						<Skeleton variant="rect" width={'33%'} height={'33px'} className={classes.root} />
					</SquareSection>
				</Card>
			);
		})
	) : requests.length === 0 ? (
		<NoRequestsFound message={message} />
	) : (
		requests.map((request) => <LogCard key={request.requestID} account={account} data={request} />)
	);
};

export default Contributes;
