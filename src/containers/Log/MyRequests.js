import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useWeb3React } from '@web3-react/core';
import { mainContext } from '../../state';
import { convertToBiobit } from '../../utils';
import MyRequest from '../../components/LogCards/MyRequest';
import MyRequestMobile from '../../components/LogCards/MyRequestMobile';
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

const MyRequests = (props) => {
	const { account } = useWeb3React();
	const { appState } = useContext(mainContext);
	const [requests, setRequests] = useState([]);
	const [isLoading, setLoading] = useState(true);
	const classes = useStyles(props);

	useEffect(() => {
		if (appState.contract !== null) {
			if (account) {
				appState.contract.methods
					.orderResult()
					.call({ from: account })
					.then((result) => {
						const userContributionsSet = new Set(result[0]);
						const userContributions = [...userContributionsSet];

						const getAllRequests = new Promise(async (resolve, reject) => {
							const requests = [];
							try {
								for (const currentRequest of userContributions) {
									let requestInfo = await appState.contract.methods.orders(currentRequest).call();

									const requestTemplate = {
										requestID: requestInfo[0],
										title: requestInfo[1],
										description: requestInfo[7],
										requesterAddress: requestInfo[2],
										angelTokenPay: convertToBiobit(requestInfo[3], false),
										laboratoryTokenPay: convertToBiobit(requestInfo[4], false),
										totalContributors: requestInfo[5], // total contributors required
										totalContributed: +requestInfo[5] - +requestInfo[8],
										whitePaper: requestInfo[6],
										timestamp: requestInfo[10],
										totalContributedCount: requestInfo[9],
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
							setLoading(false);
						});
					})
					.catch((error) => {
						console.error(error.message);
					});
			}
		}
	}, [appState.contract, account]);

	if (appState.isMobile)
		return isLoading ? (
			[1, 2, 3].map((index) => {
				return (
					<Card key={index} isMobile={appState.isMobile}>
						<CircleSection>
							<Skeleton variant="circle" width={41.72} height={41.72} className={classes.root} />
						</CircleSection>
						<SquareSection>
							<Skeleton variant="rect" width={'100%'} height={19} animation="wave" className={classes.root} />
							<Skeleton variant="rect" width={'80%'} height={19.1} className={classes.root} />
						</SquareSection>
					</Card>
				);
			})
		) : requests.length === 0 ? (
			<NoRequestsFound message="You have not created any requests yet." />
		) : (
			requests.map((request) => <MyRequestMobile key={request.requestID} data={request} />)
		);
	return isLoading ? (
		[1, 2].map((index) => {
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
		<NoRequestsFound message="You have not created any requests yet." />
	) : (
		requests.map((request) => <MyRequest key={request.requestID} data={request} />)
	);
};

export default MyRequests;
