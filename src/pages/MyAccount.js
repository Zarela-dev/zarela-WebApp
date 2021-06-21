import React, { useContext, useEffect, useState } from 'react';
import { web3Context } from '../web3Provider';
import TitleBar from '../components/TitleBar';
import styled from 'styled-components';
import maxWidthWrapper from '../components/Elements/MaxWidth';
import OrderListItem from '../components/OrderListItem';
import ConnectDialog from '../components/Dialog/ConnectDialog';
import { convertToBiobit, toast } from '../utils';
const PageWrapper = styled.div`
	
`;

const ContentWrapper = styled.div`
	margin-top: ${props => props.theme.spacing(6)};
	${maxWidthWrapper};
`;

const MyAccount = () => {
	const { Web3 } = useContext(web3Context);
	const [orders, setOrders] = useState({});
	const [totalRevenueFromZarela, setTotalRevenueFromZarela] = useState(0);
	const [totalRevenueFromRequester, setTotalRevenueFromRequester] = useState(0);

	useEffect(() => {
		if (Web3.contract !== null) {
			if (Web3.accounts.length !== 0) {
				Web3.contract.methods.User_Map(Web3.accounts[0]).call((error, result) => {
					if (!error) {
						const formatter = value => `${convertToBiobit(value)} Biobit`;
						setTotalRevenueFromRequester(formatter(result[1]));
						setTotalRevenueFromZarela(formatter(result[0]));
					}
					else {
						toast(error.message, 'error');
					}
				});
				if (!Object.keys(orders).length) {
					Web3.contract.methods.Order_Details().call({ from: Web3.accounts[0] }).then(result => {
						const myOrders = result[1];

						myOrders.forEach(currentOrder => {
							Web3.contract.methods.ord_file(currentOrder).call().then(result => {
								const orderTemplate = {
									orderId: result[0],
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
								setOrders(orders => ({
									...orders,
									[orderTemplate.orderId]: orderTemplate
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
			<TitleBar>
				My Account {totalRevenueFromZarela} / {totalRevenueFromRequester}
			</TitleBar>
			<ContentWrapper>
				{
					Web3.accounts.length === 0 ?
						<ConnectDialog /> :
						Object.values(orders).length > 0 ? Object.values(orders).reverse().map(item => (
							<OrderListItem
								key={item.orderId}
								orderId={item.orderId}
								title={item.title}
								tokenPay={item.tokenPay}
								total={item.totalContributedCount}
								contributors={`${item.totalContributed}/${item.totalContributors}`}
							/>
						)) : 'You haven\'t contributed to any orders yet.'
				}
			</ContentWrapper>
		</PageWrapper>
	);
};

export default MyAccount;
