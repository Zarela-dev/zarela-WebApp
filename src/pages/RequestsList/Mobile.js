import React from 'react';
import RequestCardMobile from '../../components/RequestCard/RequestCardMobile';
import styled from 'styled-components';
// import Pagination from '../../components/Pagination';
import maxWidthWrapper from '../../components/Elements/MaxWidth';
import { timeSince } from '../../utils';
import homepageBg from '../../assets/home-bg.jpg';
import { Button } from '../../components/Elements/Button';
import { Link } from 'react-router-dom';
import MobileLayout from '../../components/MobileLayout';
import { Skeleton } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import ZarelaDayBox from '../../components/ZarelaDayBox';

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

const TitleSection = styled.div`
	display: flex;
	height: 83px;
	width: 100%;
	padding: 0 18px;
	justify-content: space-between;
	align-items: center;
	background-color: #f4f8fe;
	flex-wrap: wrap;
`;
const Title = styled.h1`
	color: #000;
	font-size: 18px;
	font-weight: 700;
	white-space: nowrap;
	margin-left: 0px;
`;

const SubmitRequestButton = styled(Link)`
	${Button};
	white-space: nowrap;
	margin-right: 0;
	height: 35px;
	font-size: 14px;
	padding: 10px 24px;
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
const SquerSection = styled.div`
	flex-grow: 1;
`;

const useStyles = makeStyles({
	root: {
		marginBottom: '12px',
		background: '#F1F6FC',
	},
});

const App = ({ requests, isLoading, props, appState }) => {
	const classes = useStyles(props);

	return (
		<>
			<TitleSection>
				<Title>Recent requests</Title>
				<SubmitRequestButton to="/request/create">New Request</SubmitRequestButton>
			</TitleSection>
			<MobileLayout>
				<RequestsListWrapper isLoading={isLoading}>
					<ZarelaDayBox currentDay={appState.zarelaCurrentDay} />
					{!isLoading && <Background />}
					<RequestsListLayout>
						<RequestsListContentWrapper>
							{isLoading
								? [1, 2, 3].map((index) => {
										return (
											<Card key={index}>
												<CircleSection>
													<Skeleton
														variant="circle"
														width={41.72}
														height={41.72}
														className={classes.root}
													/>
												</CircleSection>
												<SquerSection>
													<Skeleton
														variant="rect"
														width={'100%'}
														height={19}
														animation="wave"
														className={classes.root}
													/>
													<Skeleton
														variant="rect"
														width={'80%'}
														height={19.1}
														className={classes.root}
													/>
												</SquerSection>
											</Card>
										);
								  })
								: Object.values(requests)
										.sort((a, b) => +b.requestID - +a.requestID)
										.map((item) => {
											return (
												<RequestCardMobile
													key={item.requestID}
													requestID={item.requestID}
													title={item.title}
													description={item.description}
													tokenPay={item.tokenPay}
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
				</RequestsListWrapper>
			</MobileLayout>
		</>
	);
};

export default App;
