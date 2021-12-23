import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Skeleton } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import RequestCard from '../../components/RequestCard/RequestCard';
import TokenInfoSidebar from '../../components/Sidebar/TokenInfo';
import maxWidthWrapper from '../../components/Elements/MaxWidth';
import { timeSince } from '../../utils';
import homepageBg from '../../assets/home-bg.jpg';
import ZarelaDayBox from '../../components/ZarelaDayBox';
import SearchBox from '../../components/searchAndFilter/SearchBox';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

const RequestsListWrapper = styled.div`
	position: relative;
	width: 100%;
	background: ${(props) => (props.isLoading ? '#F1F6FC' : 'unset')};
`;

const Background = styled.div`
	position: fixed;
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
	width: 310px;
`;

const FixedWrapper = styled.div`
	position: relative;
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

const Desktop = ({ appState, requests, fetchMore, currentPage, setCurrentPage,PER_PAGE, isLoading, account, props }) => {
	const classes = useStyles(props);
	return (
		<RequestsListWrapper isLoading={isLoading}>
			{!isLoading && <Background />}
			<RequestsListLayout>
				{isLoading ? (
					<FixedWrapper>
						<RequestListSidebarWrapper>
							{[1, 2, 3].map(() => {
								return <SkeletonSidebarCard />;
							})}
						</RequestListSidebarWrapper>
					</FixedWrapper>
				) : (
					<FixedWrapper>
						<RequestListSidebarWrapper>
							<ZarelaDayBox currentDay={appState.zarelaCurrentDay} />
							<TokenInfoSidebar data={appState} account={account} />
						</RequestListSidebarWrapper>
					</FixedWrapper>
				)}
				<RequestsListContentWrapper>
					<SearchBox />
					{isLoading
						? [1, 2, 3].map((index) => {
								return (
									<Card key={index}>
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
						: Object.values(requests).map((item) => {
								return (
									<RequestCard
										key={item.requestID}
										requestID={item.requestID}
										categories={item.categories}
										title={item.title}
										description={item.description}
										angelTokenPay={item.angelTokenPay}
										laboratoryTokenPay={item.laboratoryTokenPay}
										timestamp={timeSince(item.timestamp)}
										progress={(+item.totalContributed / +item.totalContributors) * 100}
										contributors={`${item.totalContributed}/${item.totalContributors}`}
										totalContributedCount={item.totalContributedCount}
									/>
								);
						  })}
				</RequestsListContentWrapper>
			</RequestsListLayout>
			<nav aria-label="...">
				<Pagination>
					<PaginationItem disabled={currentPage === 0}>
						<PaginationLink
							tabIndex="-1"
							onClick={() => {
								fetchMore({
									variables: {
										skip: (currentPage - 1) * PER_PAGE,
									},
								});
								setCurrentPage(currentPage - 1);
							}}
						>
							Previous
						</PaginationLink>
					</PaginationItem>
					<PaginationItem active>
						<PaginationLink href="#">
							{currentPage + 1} <span className="sr-only">(currentPage)</span>
						</PaginationLink>
					</PaginationItem>
					<PaginationItem>
						<PaginationLink
							onClick={() => {
								fetchMore({
									variables: {
										skip: (currentPage + 1) * PER_PAGE,
									},
								});
								setCurrentPage(currentPage + 1);
							}}
						>
							Next
						</PaginationLink>
					</PaginationItem>
				</Pagination>
			</nav>
		</RequestsListWrapper>
	);
};

export default Desktop;
