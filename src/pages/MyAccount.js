import React, { useContext, useEffect, useState } from 'react';
import { web3Context } from '../web3Provider';
import TitleBar from '../components/TitleBar';
import styled from 'styled-components';
import maxWidthWrapper from '../components/Elements/MaxWidth';
import RequestListItem from '../components/RequestListItem';
import ConnectDialog from '../components/Dialog/ConnectDialog';
import { convertToBiobit, toast } from '../utils';

const PageWrapper = styled.div`
	
`;

const ContentWrapper = styled.div`
	margin-top: ${props => props.theme.spacing(6)};
	${maxWidthWrapper};
`;

const WalletTitlebar = styled(TitleBar)`
	display: flex;
	flex-wrap: nowrap;
	justify-content: space-between;
	align-items: center;
    margin-top: -12px;
`;

const Title = styled.div`
	font-weight: 500;
	font-size: 26px;
	line-height: 34px;
	color: ${props => props.theme.textPrimary};
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
`;

const RewardValue = styled.div`
	font-size: 16px;
	font-weight: 700;
	margin-left: ${props => props.theme.spacing(1)};
  
`;

const MyAccount = () => {
	const { Web3 } = useContext(web3Context);
	const [requests, setRequests] = useState({});
	const [totalRevenueFromZarela, setTotalRevenueFromZarela] = useState(0);
	const [totalRevenueFromRequester, setTotalRevenueFromRequester] = useState(0);

	useEffect(() => {
		if (Web3.contract !== null) {
			if (Web3.accounts.length !== 0) {
				Web3.contract.methods.User_Map(Web3.accounts[0]).call((error, result) => {
					if (!error) {
						const formatter = value => convertToBiobit(value);
						setTotalRevenueFromRequester(formatter(result[1]));
						setTotalRevenueFromZarela(formatter(result[0]));
					}
					else {
						toast(error.message, 'error');
					}
				});
				if (!Object.keys(requests).length) {
					Web3.contract.methods.Order_Details().call({ from: Web3.accounts[0] }).then(result => {
						const myRequests = result[1];

						myRequests.forEach(currentRequest => {
							Web3.contract.methods.ord_file(currentRequest).call().then(result => {
								const requestTemplate = {
									requestID: result[0],
									title: result[1],
									description: result[6],
									requesterAddress: result[2],
									tokenPay: convertToBiobit(result[3]),
									totalContributors: result[4], // total contributors required
									totalContributed: +result[4] - +result[7],
									categories: result[8], // NOT TO BE USED IN DEMO
									whitePaper: result[5],
									timestamp: result[10],
									totalContributedCount: result[9]
								};
								setRequests(requests => ({
									...requests,
									[requestTemplate.requestID]: requestTemplate
								}));
							})
								.catch(error => {
									console.error(error.message);
								});
						});
					}).catch(error => {
						console.error(error.message);
					});
				}
			}
		}
	}, [Web3.contract, Web3.accounts]);

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
					Web3.accounts.length === 0 ?
						<ConnectDialog isOpen={true} /> :
						Object.values(requests).length > 0 ? Object.values(requests).reverse().map(item => (
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
