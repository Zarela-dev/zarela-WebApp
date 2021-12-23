import React from 'react';
import styled from 'styled-components';
import { Skeleton } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import RequestCardMobile from '../../components/RequestCard/RequestCardMobile';
import maxWidthWrapper from '../../components/Elements/MaxWidth';
import { timeSince } from '../../utils';
import homepageBg from '../../assets/home-bg.jpg';
import MobileLayout from '../../components/MobileLayout';
import ZarelaDayBox from '../../components/ZarelaDayBox';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import SearchBox from '../../components/searchAndFilter/SearchBox';

const RequestsListWrapper = styled.div`
	position: relative;
	width: 100%;
	background: ${(props) => (props.isLoading ? '#F1F6FC' : 'unset')};
`;

const Background = styled.div`
	position: fixed;
	top: 60px;
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
		position: fixed;
		bottom: 0;
		height: 61vh;
		left: 0;
		width: 100%;
		z-index: -2;
		background: linear-gradient(0deg, rgb(255 255 255) 50%, rgb(255 255 255 / 0%));
	}

	@media only screen and (max-width: ${(props) => props.theme.tablet_sm_breakpoint}) {
		&::before {
			background-size: cover;
			background-position: center;
		}
	}
`;

const RequestsListLayout = styled.section`
	display: flex;
	flex-direction: row-reverse;
	flex-wrap: nowrap;
	width: 100%;
	padding-top: ${(props) => props.theme.spacing(4)};
	${maxWidthWrapper};
	@media only screen and (max-width: ${(props) => props.theme.tablet_sm_breakpoint}) {
		padding-top: 0;
	}
`;

const RequestsListContentWrapper = styled.section`
	flex: 1 0;
	padding: 0 ${(props) => props.theme.spacing(1.8)};
`;

const Card = styled.div`
	width: 100%;
	margin-right: 30px;
	height: 186px;
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

const useStyles = makeStyles({
	root: {
		marginBottom: '12px',
		background: '#F1F6FC',
	},
});

const App = ({ appState, requests, fetchMore, currentPage, setCurrentPage, PER_PAGE, isLoading, props }) => {
	const classes = useStyles(props);

	return (
		<>
			<MobileLayout>
				<RequestsListWrapper isLoading={isLoading}>
					<ZarelaDayBox currentDay={appState.zarelaCurrentDay} />
					{!isLoading && <Background />}
					<RequestsListLayout>
						<RequestsListContentWrapper>
							<SearchBox />
							{isLoading
								? [1, 2, 3].map((index) => {
										return (
											<Card key={index}>
												<CircleSection>
													<Skeleton variant="circle" width={41.72} height={41.72} className={classes.root} />
												</CircleSection>
												<SquareSection>
													<Skeleton
														variant="rect"
														width={'100%'}
														height={19}
														animation="wave"
														className={classes.root}
													/>
													<Skeleton variant="rect" width={'80%'} height={19.1} className={classes.root} />
												</SquareSection>
											</Card>
										);
								  })
								: Object.values(requests).map((item) => {
										return (
											<RequestCardMobile
												key={item.requestID}
												requestID={item.requestID}
												title={item.title}
												description={item.description}
												angelTokenPay={item.angelTokenPay}
												laboratoryTokenPay={item.laboratoryTokenPay}
												categories={item.categories}
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
			</MobileLayout>
		</>
	);
};

export default App;
