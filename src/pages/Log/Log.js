import React, { useContext, useState, useEffect } from 'react';
import { mainContext } from '../../state';
import styled, { css } from 'styled-components';
import TitleBar from '../../components/TitleBar/TitleBar';
import { Tabs } from '../../components/Tabs';
import MyRequests from '../../containers/Log/MyRequests';
import MarketRequests from '../../containers/Log/MarketRequests';
import { convertToBiobit, toast } from '../../utils';
import Contributes from '../../containers/Log/Contributes';
import { useWeb3React } from '@web3-react/core';
import ConnectDialog from '../../components/Dialog/ConnectDialog';
import MobileLayout from '../../components/MobileLayout';

const Wrapper = styled.div``;

const LogInnerContainer = styled.div`
	padding: 0;
	margin: 0;
	background: ${(props) => (props.elevated ? '#FFFFFF' : '#F4F8FE')};
	border: none;
	box-shadow: none;
	border-radius: 8px;
`;

const WalletTitlebar = styled(TitleBar)`
	display: flex;
	flex-wrap: nowrap;
	justify-content: space-between;
	height: ${(props) => (props.isMobile ? '85px' : 'unset')};
	padding: ${(props) => props.isMobile && '0 18px'};
	flex-direction: row;
	width: 100%;
	align-items: center;
`;

const Title = styled.div`
	font-weight: 500;
	font-size: 22px;
	line-height: 28px;
	color: ${(props) => props.theme.textPrimary};
	padding: 0;
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

	@media (max-width: 768px) {
		font-size: 12.5px;
	}
`;

const RewardValue = styled.div`
	font-size: 16px;
	font-weight: 700;
	margin-left: ${(props) => props.theme.spacing(1)};

	@media (max-width: 768px) {
		font-size: 13px;
		font-weidth: 600;
	}
`;

const Log = () => {
	const { account } = useWeb3React();
	const { appState } = useContext(mainContext);
	const [requests, setRequests] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [totalRevenueFromZarela, setTotalRevenueFromZarela] = useState(0);
	const [totalRevenueFromRequester, setTotalRevenueFromRequester] = useState(0);
	const [ConnectionModalShow, setConnectionModalShow] = useState(true);

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

				appState.contract.methods.userMap(account).call((error, result) => {
					if (!error) {
						const formatter = (value) => convertToBiobit(value);
						setTotalRevenueFromRequester(formatter(result[1]));
						setTotalRevenueFromZarela(formatter(result[0]));
					} else {
						toast(error.message, 'error');
					}
				});
			}
		}
	}, [account, appState.contract]);

	return (
		<Wrapper>
			<WalletTitlebar isMobile={appState.isMobile}>
				<Title>Log</Title>
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
			<MobileLayout>
				{!account ? (
					<ConnectDialog isOpen={ConnectionModalShow} onClose={() => setConnectionModalShow(false)} />
				) : (
					<Tabs
						route="log"
						isMobile={appState.isMobile}
						data={[
							{
								label: 'My Requests',
								component: (
									<LogInnerContainer elevated>
										<MyRequests />
									</LogInnerContainer>
								),
							},
							{
								label: 'Marked Requests',
								component: (
									<LogInnerContainer elevated>
										<MarketRequests />
									</LogInnerContainer>
								),
							},
							{
								label: 'Contributed',
								component: (
									<LogInnerContainer elevated>
										<Contributes isLoading={isLoading} requests={requests} />
									</LogInnerContainer>
								),
							},
						]}
					/>
				)}
			</MobileLayout>
		</Wrapper>
	);
};

export default Log;
