import React, { useMemo } from 'react';
import styled from 'styled-components';
import { Skeleton } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import RequestCardMobile from '../../components/RequestCard/RequestCardMobile';
import maxWidthWrapper from '../../components/Elements/MaxWidth';
import { timeSince } from '../../utils';
import homepageBg from '../../assets/home-bg.jpg';
import MobileLayout from '../../components/MobileLayout';
import ZarelaDayBox from '../../components/ZarelaDayBox';
import Pagination from '../../components/Pagination';
import FallbackImage from '../../components/searchAndFilter/Elements/fallbackImage';

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
	flex: 1 0 100%;
	padding: 0 ${(props) => props.theme.spacing(1.8)};
	width: 100%;
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

const Mobile = ({ requests, isLoading, appState, currentPage, setCurrentPage, props, PAGE_SIZE, searchBox }) => {
	const classes = useStyles(props);

	const currentTableData = useMemo(() => {
		const firstPageIndex = (currentPage - 1) * PAGE_SIZE;
		const lastPageIndex = firstPageIndex + PAGE_SIZE;
		return Object.values(requests).slice(firstPageIndex, lastPageIndex);
	}, [currentPage, PAGE_SIZE, requests]);

	return (
		<>
			<MobileLayout>
				<RequestsListWrapper isLoading={isLoading}>
					<ZarelaDayBox currentDay={appState.zarelaCurrentDay} />
					{!isLoading && <Background />}
					<RequestsListLayout>
						<RequestsListContentWrapper>
							{searchBox}
							{isLoading ? (
								[1, 2, 3].map((index) => {
									return (
										<Card key={index}>
											<CircleSection>
												<Skeleton variant="circle" width={41.72} height={41.72} className={classes.root} />
											</CircleSection>
											<SquareSection>
												<Skeleton variant="rect" width={'100%'} height={19} animation="wave" className={classes.root} />
												<Skeleton variant="rect" width={'80%'} height={19.1} className={classes.root} />
											</SquareSection>
										</Card>
									);
								})
							) : Object.values(currentTableData).length === 0 ? (
								<FallbackImage />
							) : (
								Object.values(currentTableData)
									.sort((a, b) => +b.requestID - +a.requestID)
									.map((item) => {
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
									})
							)}
						</RequestsListContentWrapper>
					</RequestsListLayout>
					<Pagination
						currentPage={currentPage}
						totalCount={Object.values(requests).length}
						pageSize={PAGE_SIZE}
						onPageChange={(page) => setCurrentPage(page)}
						isMobile={true}
					/>
				</RequestsListWrapper>
			</MobileLayout>
		</>
	);
};

export default Mobile;
