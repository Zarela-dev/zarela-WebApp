import React, { useState, useContext, useEffect } from 'react';
import TitleBar from '../components/TitleBar';
import styled from 'styled-components';
import maxWidthWrapper from '../components/Elements/MaxWidth';
import { web3Context } from '../web3Provider';
import OrderListItem from '../components/OrderListItem';
import ConnectDialog from '../components/Dialog/ConnectDialog';

const PageWrapper = styled.div`
	
`;

const ContentWrapper = styled.div`
	margin-top: ${props => props.theme.spacing(6)};
	${maxWidthWrapper};
`;

const MyOrders = () => {
	const { Web3 } = useContext(web3Context);
	const PAGE_SIZE = 3;
	const [orders, setOrders] = useState({});
	const [ordersCount, setOrdersCount] = useState(0);

	const handleConfirm = (orderId, addresses) => {
		Web3.contract.methods.ConfirmContributer(orderId, addresses).send({ from: Web3.accounts[0] }, (error, result) => {
			if (!error) {
				alert(JSON.stringify('Transaction Hash is :  ' + result));
			}
			else {
				alert(error.message);
			}
		});
		Web3.contract.events.TokenSent({}, function (error, result) {
			if (!error) {
				let returnValues = result.returnValues;
				alert(JSON.stringify('Your Mission Is Complete! ' + returnValues[0] + '  Address Sending  ' + returnValues[2] + '    Token To Account  :  << ' + returnValues[1] + ' >>'));
			}
			else {
				alert(error.message);
			}
		});
	};
	// pagination hook
	useEffect(() => {
		if (Web3.contract !== null) {
			Web3.contract.methods.OrderSize().call((error, result) => {
				if (!error) {
					setOrdersCount(result);
				} else {
					console.error(error.message);
				}
			});
			if (Web3.accounts.length !== 0) {
				Web3.contract.methods.Order_Details().call({ from: Web3.accounts[0] }, (error, result) => {
					if (!error) {
						const myOrders = result[0];
						for (let i = myOrders[0]; i < myOrders.length; i++) {
							Web3.contract.methods.ord_file(i).call((error, result) => {
								if (!error) {
									const orderTemplate = {
										orderId: result[0],
										title: result[1],
										description: result[6],
										requesterAddress: result[2],
										tokenPay: result[3] / Math.pow(10, 9),
										totalContributors: result[4], // total contributors required
										totalContributed: +result[4] - +result[7],
										categories: result[8], // NOT TO BE USED IN DEMO
										whitePaper: result[5],
										status: result[9], // order status inprogress(false)/done(true)
										timestamp: result[11],
										totalContributedCount: result[10] 
									};
									setOrders(orders => ({
										...orders,
										[orderTemplate.orderId]: orderTemplate
									}));
								} else {
									console.error(error.message);
								}
							});
						}
					} else {
						console.error(error.message);
					}
				});
			}
		}
	}, [Web3.contract, ordersCount, Web3.accounts]);


	return (
		<PageWrapper>
			<TitleBar>
				My Orders
			</TitleBar>
			<ContentWrapper>
				{
					Web3.accounts.length === 0 ?
						<ConnectDialog /> :
						Object.values(orders).length > 0 ? Object.values(orders).map(item => (
							<OrderListItem
								key={item.orderId}
								orderId={item.orderId}
								title={item.title}
								tokenPay={item.tokenPay}
								total={item.totalContributedCount}
								contributors={`${item.totalContributed}/${item.totalContributors}`}
								handleConfirm={handleConfirm}
							/>
						)) : 'You don\'t have any orders on this account'
				}
			</ContentWrapper>
		</PageWrapper>
	);
};

export default MyOrders;
