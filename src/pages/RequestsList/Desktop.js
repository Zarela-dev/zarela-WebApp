import React, { useState, useMemo } from 'react';
import RequestCard from '../../components/RequestCard/RequestCard';
import styled from 'styled-components';
import TokenInfoSidebar from '../../components/Sidebar/TokenInfo';
import TokenStatsSidebar from '../../components/Sidebar/TokenStats';
import Pagination from '../../components/Pagination';
import maxWidthWrapper from '../../components/Elements/MaxWidth';
import { timeSince } from '../../utils';
import homepageBg from '../../assets/home-bg.jpg';
import { Skeleton } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import ZarelaDayBox from '../../components/ZarelaDayBox';
import Guide from './../../components/Guide/Guide';
import { useLocation } from 'react-router';

const RequestsListWrapper = styled.div`
	position: relative;
	width: 100%;
	background: ${(props) => (props.isLoading ? '#F1F6FC' : 'unset')};
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

		background-image: url(${homepageBg}), linear-gradient(0deg, rgb(255 255 255), rgb(255 255 255 / 0%));
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
		background: linear-gradient(0deg, rgb(255 255 255) 50%, rgb(255 255 255 / 0%));
	}
`;

const RequestsListLayout = styled.section`
	display: flex;
	flex-direction: row-reverse;
	flex-wrap: nowrap;
	width: 100%;
	padding: ${(props) => `${props.theme.spacing(4)} ${props.theme.spacing(2)}`};
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
	padding: ${(props) => ` 0 ${props.theme.spacing(2)} 0 0`};
`;

const Card = styled.div`
	width: 100%;
	margin-right: 30px;
	height: 320px;
	margin-bottom: 25px;
	background: #fff;
	padding: 30px 33px;
	display: flex;
	flex-direction: row;
`;
const CircleSection = styled.div`
	margin-right: 28px;
`;
const SquareSection = styled.div`
	flex-grow: 1;
`;

const SkeletonSidebarCard = styled.div`
	width: 100%;
	height: 210px;
	background: #fff;
	margin-bottom: 25px;
`;

const useStyles = makeStyles({
	root: {
		marginBottom: '19px',
		background: '#F1F6FC',
	},
});

const HightLight = styled.span`
	color: red;
	text-decoration: ${(props) => (props.underline ? 'underline' : 'unset')};
`;

const steps = [
	{
		selector: '[data-tour="request-list-one"]',
		content: 'A Request card contains all information regarding the request.',
	},
	{
		selector: '[data-tour="request-list-two"]',
		content: 'The unique ID assigned to each request.',
	},
	{
		selector: '[data-tour="request-list-three"]',
		content: 'The title given to each request submitted by the mage.',
	},
	{
		selector: '[data-tour="request-list-four"]',
		title: 'hello',
		content: (
			<>
				This number indicates the number of BBit tokens{' '}
				<HightLight underline>that are to be paid by the mage</HightLight> to each angel who sends the
				appropriate response.
			</>
		),
	},
	{
		selector: '[data-tour="request-list-five"]',
		content: 'This number indicates the number of approved responses sent by angels.',
	},
	{
		selector: '[data-tour="request-list-six"]',
		content: (
			<>
				This number indicates the total number of responses sent <HightLight>to this request.</HightLight>
			</>
		),
	},
	{
		selector: '[data-tour="request-list-seven"]',
		content: 'You can click here to see more information about applying and participating.',
	},
	{
		selector: '[data-tour="request-list-eight"]',
		content: 'Clicking on this icon will bookmark selected request.',
	},
	{
		selector: '[data-tour="request-list-nine"]',
		content: (
			<>
				This section displays information about the total number of biobit tokens,{' '}
				<HightLight>biobit token name and code</HightLight>and your own Wallet balance.
			</>
		),
	},
	{
		selector: '',
		content:
			'Well done! You earn 100 Biobits for this learning! want to earn more? learn every guide on pages and collect about 500 BBits!',
	},
];

const Desktop = ({
	requests,
	appState,
	web3React,
	ZarelaReward,
	BiobitBasedOnEth,
	dailyContributors,
	PAGE_SIZE,
	isLoading,
	props,
}) => {
	const [currentPage, setCurrentPage] = useState(1);
	const classes = useStyles(props);
	const [guideIsOpen, setGuideIsOpen] = useState(true);
	const location = useLocation();

	const currentTableData = useMemo(() => {
		const firstPageIndex = (currentPage - 1) * PAGE_SIZE;
		const lastPageIndex = firstPageIndex + PAGE_SIZE;
		return Object.values(requests)
			.sort((a, b) => +b.requestID - +a.requestID)
			.slice(firstPageIndex, lastPageIndex);
	}, [currentPage, PAGE_SIZE, requests]);

	return (
		<RequestsListWrapper isLoading={isLoading}>
			{!isLoading && <Background />}
			{isLoading === false && !localStorage.getItem('guide/' + location.pathname.split('/')[1]) ? (
				<Guide steps={steps} {...{ guideIsOpen, setGuideIsOpen }} />
			) : null}
			<RequestsListLayout>
				{isLoading ? (
					<RequestListSidebarWrapper>
						{[1, 2, 3].map((index) => {
							return <SkeletonSidebarCard />;
						})}
					</RequestListSidebarWrapper>
				) : (
					<RequestListSidebarWrapper>
						<ZarelaDayBox currentDay={appState.zarelaCurrentDay} />
						{/* <TokenStatsSidebar dailyContributors={dailyContributors} /> */}
						<TokenInfoSidebar data={appState} account={web3React.account} />
					</RequestListSidebarWrapper>
				)}
				<RequestsListContentWrapper>
					{isLoading
						? [1, 2, 3].map((index) => {
								return (
									<Card key={index}>
										<CircleSection>
											<Skeleton
												variant="circle"
												width={72}
												height={72}
												className={classes.root}
											/>
										</CircleSection>
										<SquareSection>
											<Skeleton
												variant="rect"
												width={'100%'}
												height={33}
												animation="wave"
												className={classes.root}
											/>
											<Skeleton
												variant="rect"
												width={'33%'}
												height={'33px'}
												className={classes.root}
											/>
										</SquareSection>
									</Card>
								);
						  })
						: currentTableData.map((item) => {
								return (
									<RequestCard
										key={item.requestID}
										requestID={item.requestID}
										categories={item.categories}
										title={item.title}
										description={item.description}
										tokenPay={item.tokenPay}
										timestamp={timeSince(item.timestamp)}
										progress={(+item.totalContributed / +item.totalContributors) * 100}
										contributors={`${item.totalContributed}/${item.totalContributors}`}
										totalContributedCount={item.totalContributedCount}
									/>
								);
						  })}
				</RequestsListContentWrapper>
			</RequestsListLayout>
			<Pagination
				currentPage={currentPage}
				totalCount={Object.values(requests).length}
				pageSize={PAGE_SIZE}
				onPageChange={(page) => setCurrentPage(page)}
			/>
		</RequestsListWrapper>
	);
};

export default Desktop;
