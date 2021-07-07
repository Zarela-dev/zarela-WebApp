import React, { useContext, useEffect, useState } from 'react';
import { web3Context } from '../web3Provider';
import RequestCard from '../components/RequestCard';
import styled from 'styled-components';
import { SearchBar } from '../components/SearchBar';
import TokenInfoSidebar from '../components/Sidebar/TokenInfo';
import TokenStatsSidebar from '../components/Sidebar/TokenStats';
import Pagination from '../components/Pagination';
import maxWidthWrapper from '../components/Elements/MaxWidth';
import { timeSince, convertToBiobit } from '../utils';
import homepageBg from '../assets/home-bg.jpg';
import HomepageCounters from '../components/HomepageCounters';

const RequestsListWrapper = styled.div`
	position: relative;
	width: 100%;
`;

const Background = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100vh;
	z-index: -1;

	&::before {
		content: '';
		display: block;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 80vh;

		background-image: url(${homepageBg}), linear-gradient(0deg,rgb(255 255 255),rgb(255 255 255 / 0%));
		background-size: 100%, 400px;
		background-position: 0 -30px;
		z-index: -3;
	}
	
	&::after {
		content: '';
		display: block;
		position: absolute;
		bottom: 0;
		height: 80vh;
		left: 0;
		width: 100%;
		z-index: -2;
		background: linear-gradient(0deg,rgb(255 255 255) 50%,rgb(255 255 255 / 0%));
	}
`;

const RequestsListLayout = styled.section`
	display: flex;
	flex-direction: row-reverse;
	flex-wrap: nowrap;
	width: 100%;
	padding-top: ${props => props.theme.spacing(4)};
	${maxWidthWrapper};
`;

const RequestListSidebarWrapper = styled.aside`
	display: flex;
	flex-wrap: wrap;
	flex-direction: column;
	flex: 0 0 310px;
`;

const RequestsListContentWrapper = styled.section`
	flex: 1 0;
	padding-right: ${props => props.theme.spacing(4)};
`;


const RequestsList = () => {
	const { Web3 } = useContext(web3Context);
	const PAGE_SIZE = 3;
	const [requests, setRequests] = useState({});
	const [requestsCount, setRequestsCount] = useState(0);
	const [dailyContributors, setDailyContributors] = useState(0);
	const [BiobitBasedOnEth, setBiobitBasedOnEth] = useState(0);
	const [ZarelaReward, setZarelaReward] = useState(0);

	// pagination hook
	useEffect(() => {
		if (Web3.contract !== null) {
			Web3.contract.methods.OrderSize().call((error, result) => {
				if (!error) {
					setRequestsCount(result);
				} else {
					console.error(error.message);
				}
			});

			for (let i = 0; i < requestsCount; i++) {
				Web3.contract.methods.ord_file(i).call((error, result) => {
					if (!error) {
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
					} else {
						console.error(error.message);
					}
				});
			}
		}
	}, [Web3.contract, requestsCount]);

	useEffect(() => {
		if (Web3.contract) {
			Web3.contract.methods.Prize().call((error, result) => {
				if (!error)
					setZarelaReward(+result * 2);
				else
					console.error(error.message);
			});
			Web3.contract.methods.contributer_count().call((error, result) => {
				if (!error)
					setDailyContributors(result);
				else
					console.error(error.message);
			});
			Web3.contract.methods.GetETHPrice().call((error, result) => {
				if (!error)
					setBiobitBasedOnEth((1 / (+result / Math.pow(10, 8))).toFixed(6));
				else
					console.error(error.message);
			});
		};
		// move to wallet #todo
		// Web3.contract.methods.sum_of_reward_per_contributer((error, result) => {
		// 	if (!error)
		// 		console.log(result);
		// 	else
		// 		console.error(error.message);
		// })

	}, [Web3.contract]);

	return (
		<RequestsListWrapper>
			{/* <SearchBar></SearchBar> */}
			<Background />
			<HomepageCounters zarelaDailyGift={Web3.zarelaDailyGift} zarelaInitDate={Web3.zarelaInitDate} todayGift={Web3.bank} />
			<RequestsListLayout>
				<RequestListSidebarWrapper>
					<TokenStatsSidebar
						ZarelaRewardPool={ZarelaReward}
						dailyContributors={dailyContributors}
						BiobitBasedOnEth={BiobitBasedOnEth}
					/>
					<TokenInfoSidebar />
				</RequestListSidebarWrapper>
				<RequestsListContentWrapper>
					{
						Object.values(requests).reverse().map(item => {
							return (
								<RequestCard
									key={item.requestID}
									requestID={item.requestID}
									title={item.title}
									description={item.description}
									tokenPay={item.tokenPay}
									timestamp={timeSince(item.timestamp)}
									progress={+item.totalContributed / +item.totalContributors * 100}
									contributors={`${item.totalContributed}/${item.totalContributors}`}
									totalContributedCount={item.totalContributedCount}
								/>
							);
						})
					}
				</RequestsListContentWrapper>
			</RequestsListLayout>
			<Pagination />
		</RequestsListWrapper>
	);
};

export default RequestsList;
