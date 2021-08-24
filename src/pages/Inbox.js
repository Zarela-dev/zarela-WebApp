import React, { useState, useContext, useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import styled from 'styled-components';
import TitleBar from '../components/TitleBar/TitleBar';
import maxWidthWrapper from '../components/Elements/MaxWidth';
import RequestListItem from '../components/RequestListItem';
import { mainContext } from '../state';
import ConnectDialog from '../components/Dialog/ConnectDialog';
import { convertToBiobit, toast } from '../utils';
import NoRequestsFound from '../components/NoRequestsFound';
import Spinner from '../components/Spinner';
import NoMobileSupportMessage from '../components/NoMobileSupportMessage';
import Guide from './../components/Guide/Guide';
import { InboxSteps } from '../guides';

const PageWrapper = styled.div``;

const ContentWrapper = styled.div`
	margin-top: ${(props) => props.theme.spacing(6)};
	padding: ${(props) => `0 ${props.theme.spacing(2)}`};
	${maxWidthWrapper};
`;

const SpinnerWrapper = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const Inbox = () => {
	const { appState } = useContext(mainContext);
	const { account } = useWeb3React();
	const [requests, setRequests] = useState({});
	const [isLoading, setLoading] = useState(false);
	// to manually trigger a data fetch, after the signalsApproved event is triggered
	const [shouldRefresh, setShouldRefresh] = useState(false);
	const [guideIsOpen, setGuideIsOpen] = useState(false);

	const handleConfirm = (requestID, originalIndexes) => {
		appState.contract.methods
			.confirmContributor(requestID, originalIndexes)
			.send({ from: account }, (error, result) => {
				if (!error) {
					toast(`TX Hash: ${result}`, 'success', true, result, {
						toastId: result,
					});
				} else {
					toast(error.message, 'error');
				}
			});
		appState.contract.events
			.signalsApproved({})
			.on('data', (event) => {
				/* 
					event.returnValues[0] orderId
					event.returnValues[1]	confirmationsCount
				*/
				toast(
					`Tokens were successfully released for ${event.returnValues[1]} contributions.`,
					'success',
					false,
					null,
					{
						toastId: event.id,
					}
				);
				setShouldRefresh(true);
			})
			.on('error', (error, receipt) => {
				toast(error.message, 'error');
				console.error(error, receipt);
			});
	};

	useEffect(() => {
		if (shouldRefresh === true) {
			setShouldRefresh(false);
		}
	}, [shouldRefresh]);

	useEffect(() => {
		if (appState.contract !== null) {
			if (account) {
				setLoading(true);

				appState.contract.methods
					.orderResult()
					.call({ from: account })
					.then((result) => {
						const myRequests = result[0];

						// fo fetch handle loading state we need make sure this runs synchronously (predictable)
						const getAllRequests = new Promise(async (resolve, reject) => {
							const requestsListObject = {};

							for (const currentRequest of myRequests) {
								await appState.contract.methods
									.orders(currentRequest)
									.call()
									.then((result) => {
										const requestTemplate = {
											requestID: result[0],
											title: result[1],
											description: result[7],
											requesterAddress: result[2],
											angelTokenPay: convertToBiobit(result[3]),
											laboratoryTokenPay: convertToBiobit(result[4]),
											totalContributors: result[5], // total contributors required
											totalContributed: +result[5] - +result[8],
											whitePaper: result[6],
											timestamp: result[10],
											totalContributedCount: result[9],
										};
										requestsListObject[requestTemplate.requestID] = requestTemplate;
									})
									.catch((error) => {
										console.error(error.message);
									});
							}
							resolve(requestsListObject);
						});

						// here we are sure that all the requests are fetched
						getAllRequests.then((result) => {
							setRequests(result);
							setLoading(false);
						});
					})
					.catch((error) => {
						console.error(error.message);
					});
			}
		}
	}, [appState.contract, account]);

	useEffect(() => {
		if (Object.values(requests).filter((item) => item.totalContributedCount > 0).length)
			// we delay guide to make sure all the necessary components are mounted and loaded
			setTimeout(() => {
				setGuideIsOpen(true);
			}, 200);
	}, [requests]);

	return (
		<PageWrapper>
			{!appState.isMobile && guideIsOpen && <Guide steps={InboxSteps}></Guide>}
			<TitleBar>Inbox</TitleBar>
			<ContentWrapper>
				{/* 
					because Metamask does not support decryption in mobile yet
					we only have this page in the
				*/}
				{appState.isMobile ? (
					<NoMobileSupportMessage />
				) : !account ? (
					<ConnectDialog isOpen={true} />
				) : isLoading ? (
					<SpinnerWrapper>
						<Spinner />
					</SpinnerWrapper>
				) : Object.values(requests).filter((item) => item.totalContributedCount > 0).length > 0 ? (
					Object.values(requests)
						.filter((item) => item.totalContributedCount > 0)
						.sort((a, b) => +b.requestID - +a.requestID)
						.map((item, index) => (
							<RequestListItem
								shouldRefresh={shouldRefresh}
								showContributions={index === 0}
								key={item.requestID}
								requestID={item.requestID}
								title={item.title}
								angelTokenPay={item.angelTokenPay}
								laboratoryTokenPay={item.laboratoryTokenPay}
								total={item.totalContributedCount}
								contributors={`${item.totalContributed}/${item.totalContributors}`}
								fulfilled={+item.totalContributed === +item.totalContributors}
								handleConfirm={handleConfirm}
							/>
						))
				) : (
					<NoRequestsFound />
				)}
			</ContentWrapper>
		</PageWrapper>
	);
};

export default Inbox;
