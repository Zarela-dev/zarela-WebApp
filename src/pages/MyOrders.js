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
			if (Web3.accounts.length !== 0) {
				Web3.contract.methods.Order_Details().call({ from: Web3.accounts[0] }).then(result => {
					const myOrders = result[0];

					myOrders.forEach(currentOrder => {
						Web3.contract.methods.ord_file(currentOrder).call().then(result => {
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
	}, [Web3.contract, Web3.accounts]);

	console.log(orders);

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
								showContributions
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
