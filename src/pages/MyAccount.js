import React, { useContext, useEffect, useState } from 'react';
import { mainContext } from '../state';
import TitleBar from '../components/TitleBar/TitleBar';
import styled from 'styled-components';
import maxWidthWrapper from '../components/Elements/MaxWidth';
import RequestListItem from '../components/RequestListItem';
import ConnectDialog from '../components/Dialog/ConnectDialog';
import { convertToBiobit, toast } from '../utils';
import { useWeb3React } from '@web3-react/core';
import Spinner from '../components/Spinner';

const PageWrapper = styled.div`
	
`;

const ContentWrapper = styled.div`
	margin-top: ${props => props.theme.spacing(6)};
	${maxWidthWrapper};
`;

const WalletTitlebar = styled(TitleBar)`
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	align-items: center;
  margin-top: -12px;
	padding: 0 18px;
`;

const Title = styled.div`
	font-weight: 500;
	font-size: 26px;
	line-height: 34px;
	color: ${props => props.theme.textPrimary};

	@media(max-width: 768px) {
		font-size: 14px;
	}
`;

const RewardWrapper = styled.div`
	display: flex;
	flex-direction: column;


	`;

const RewardItem = styled.div`
	display: flex;
	justify-content: flex-end;
`;

const RewardLabel = styled.div`
	font-weight: 300;
	font-size: 16px;
	line-height: 21px;

	@media(max-width: 768px) {
		font-size: 12.5px;
	}
`;

const RewardValue = styled.div`
	font-size: 16px;
	font-weight: 700;
	margin-left: ${props => props.theme.spacing(1)};

	@media(max-width: 768px) {
		font-size: 13px;
		font-weidth: 600;
	}
`;

const SpinnerWrapper = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const MyAccount = () => {
	const [requests, setRequests] = useState({});
	const { appState } = useContext(mainContext);
	const [totalRevenueFromZarela, setTotalRevenueFromZarela] = useState(0);
	const [totalRevenueFromRequester, setTotalRevenueFromRequester] = useState(0);
	const { account } = useWeb3React();
	const [isLoading, setLoading] = useState(false);

	useEffect(() => {
		if (appState.contract !== null) {
			if (account) {
				setLoading(true);
				appState.contract.methods.User_Map(account).call((error, result) => {
					if (!error) {
						const formatter = value => convertToBiobit(value);
						setTotalRevenueFromRequester(formatter(result[1]));
						setTotalRevenueFromZarela(formatter(result[0]));
					}
					else {
						toast(error.message, 'error');
					}
				});

				appState.contract.methods.Order_Details().call({ from: account })
					.then(result => {
						const myRequests = result[1];

						const getAllRequests = new Promise(async (resolve, reject) => {
							const requestsListObject = {};

							for (const currentRequest of myRequests) {
								await appState.contract.methods.ord_file(currentRequest).call()
									.then(result => {
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
											totalContributedCount: result[8],
										};
										requestsListObject[requestTemplate.requestID] = requestTemplate;
									})
									.catch(error => {
										console.error(error.message);
									});
							}
							resolve(requestsListObject);
						});

						getAllRequests.then(result => {
							setRequests(result);
							setLoading(false);
						});
					}).catch(error => {
						console.error(error.message);
					});
			}
		}
	}, [appState.contract, account]);

	return (
		<PageWrapper>
			<WalletTitlebar>
				<Title>
					My Contributions
				</Title>
				<RewardWrapper>
					<RewardItem>
						<RewardLabel>Reward Pool</RewardLabel>
						<RewardValue>{`${totalRevenueFromZarela} BBit`}</RewardValue>
					</RewardItem>
					<RewardItem>
						<RewardLabel>Requesters Reward</RewardLabel>
						<RewardValue>{`${totalRevenueFromRequester} BBit`}</RewardValue>
					</RewardItem>
				</RewardWrapper>
			</WalletTitlebar>
			<ContentWrapper>
				{
					!account ?
						<ConnectDialog isOpen={true} /> :
						isLoading ?
							<SpinnerWrapper>
								<Spinner />
							</SpinnerWrapper> :
							Object.values(requests).length > 0 ?
								Object.values(requests).sort((a, b) => +b.requestID - +a.requestID).map(item => (
									<RequestListItem
										key={item.requestID}
										requestID={item.requestID}
										title={item.title}
										tokenPay={item.tokenPay}
										total={item.totalContributedCount}
										contributors={`${item.totalContributed}/${item.totalContributors}`}
									/>
								)) : 'You haven\'t contributed to any requests yet.'
				}
			</ContentWrapper>
		</PageWrapper>
	);
};

export default MyAccount;
