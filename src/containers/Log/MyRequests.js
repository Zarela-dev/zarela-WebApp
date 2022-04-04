import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { convertToBiobit } from '../../utils';
import MyRequest from '../../components/LogCards/MyRequest';
import MyRequestMobile from '../../components/LogCards/MyRequestMobile';
import NoRequestsFound from '../../components/NoRequestsFound';
import { Skeleton } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import { useStore } from '../../state/store';
import { getConnectorHooks } from '../../utils/getConnectorHooks';

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
	const [requests, setRequests] = useState([]);
	const [isLoading, setLoading] = useState(true);
	const classes = useStyles(props);
	const { contract, activeConnector, isMobile } = useStore();
	const { useAccount } = getConnectorHooks(activeConnector);
	const account = useAccount();

	useEffect(() => {
		if (contract !== null) {
			if (account) {
				contract
					.orderResult({ from: account })
					.then((result) => {
						const userContributionsSet = new Set(result[0]);
						const userContributions = [...userContributionsSet];

						const getAllRequests = new Promise(async (resolve, reject) => {
							const requests = [];
							try {
								for (const currentRequest of userContributions) {
									let requestInfo = await contract.orders(currentRequest);

									const requestTemplate = {
										requestID: requestInfo[0].toNumber(),
										title: requestInfo[1],
										description: requestInfo[7],
										requesterAddress: requestInfo[2],
										angelTokenPay: convertToBiobit(requestInfo[3].toNumber(), false),
										laboratoryTokenPay: convertToBiobit(requestInfo[4].toNumber(), false),
										totalContributors: requestInfo[5].toNumber(), // total contributors required
										totalContributed: +requestInfo[5].toNumber() - +requestInfo[8].toNumber(),
										whitePaper: requestInfo[6],
										timestamp: requestInfo[10].toNumber(),
										totalContributedCount: requestInfo[9].toNumber(),
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
	}, [contract, account]);

	if (isMobile)
		return isLoading ? (
			[1, 2, 3].map((index) => {
				return (
					<Card key={index} isMobile={isMobile}>
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
				<Card key={index} isMobile={isMobile}>
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
