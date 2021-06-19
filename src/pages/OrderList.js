import React, { useContext, useEffect, useState } from 'react';
import { web3Context } from '../web3Provider';
import OrderCard from '../components/OrderCard';
import styled from 'styled-components';
import { SearchBar } from '../components/SearchBar';
import TokenInfoSidebar from '../components/Sidebar/TokenInfo';
import TokenStatsSidebar from '../components/Sidebar/TokenStats';
import Pagination from '../components/Pagination';
import maxWidthWrapper from '../components/Elements/MaxWidth';
import { timeSince, convertToBiobit } from '../utils';

const OrderListWrapper = styled.div`
	width: 100%;
`;

const OrderListLayout = styled.section`
	display: flex;
	flex-direction: row-reverse;
	flex-wrap: nowrap;
	width: 100%;
	padding-top: ${props => props.theme.spacing(4)};
	${maxWidthWrapper};
`;

const OrderListSidebarWrapper = styled.aside`
	display: flex;
	flex-wrap: wrap;
	flex-direction: column;
	flex: 0 0 390px;
`;

const OrderListContentWrapper = styled.section`
	flex: 1 0;
	padding-right: ${props => props.theme.spacing(4)};
`;


const OrderList = () => {
	const { Web3 } = useContext(web3Context);
	const PAGE_SIZE = 3;
	const [orders, setOrders] = useState({});
	const [ordersCount, setOrdersCount] = useState(0);

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

			for (let i = 0; i < ordersCount; i++) {
				Web3.contract.methods.ord_file(i).call((error, result) => {
					if (!error) {
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
					} else {
						console.error(error.message);
					}
				});
			}
		}
	}, [Web3.contract, ordersCount]);

	return (
		<OrderListWrapper>
			<SearchBar></SearchBar>
			<OrderListLayout>
				<OrderListSidebarWrapper>
					<TokenStatsSidebar />
					<TokenInfoSidebar />
				</OrderListSidebarWrapper>
				<OrderListContentWrapper>
					{
						Object.values(orders).reverse().map(item => {
							return (
								<OrderCard
									key={item.orderId}
									orderId={item.orderId}
									title={item.title}
									description={item.description}
									tokenPay={item.tokenPay}
									timestamp={timeSince(item.timestamp)}
									progress={+item.totalContributed / +item.totalContributors * 100}
									contributors={`${item.totalContributed}/${item.totalContributors}`}
									totalContributedCount={`${item.totalContributed}/${item.totalContributedCount}`}
								/>
							);
						})
					}
				</OrderListContentWrapper>
			</OrderListLayout>
			<Pagination />
		</OrderListWrapper>
	);
};

export default OrderList;
