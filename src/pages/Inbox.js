import React, { useState, useContext, useEffect } from 'react';
import TitleBar from '../components/TitleBar/TitleBar';
import styled from 'styled-components';
import maxWidthWrapper from '../components/Elements/MaxWidth';
import RequestListItem from '../components/RequestListItem';
import { mainContext } from '../state';
import ConnectDialog from '../components/Dialog/ConnectDialog';
import { convertToBiobit, toast } from '../utils';
import NoRequestsFound from '../components/NoRequestsFound';
import { useWeb3React } from '@web3-react/core';
import Spinner from '../components/Spinner';
import NoMobileSupportMessage from '../components/NoMobileSupportMessage';
import Guide from './../components/Guide/Guide';
import { useLocation } from 'react-router';

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

const steps = [
	{
		selector: '[data-tour="inbox-one"]',
		content: 'List of submitted requests with current public key and received response files.',
	},
	{
		selector: '[data-tour="inbox-two"]',
		content: 'Public key of angels who contributed',
	},
	{
		selector: '[data-tour="inbox-three"]',
		content: 'approved responses which are checked, wage tokens will be sent to. ',
	},
	{
		selector: '',
		content:
			'Well done! You earn 100 BBits for this learning! want to earn more? learn every guide on pages and collect about 500 BBits!',
	},
];

const Inbox = () => {
	const { appState } = useContext(mainContext);
	const [requests, setRequests] = useState({});
	const [isLoading, setLoading] = useState(false);
	const { account } = useWeb3React();
	const [ConnectionModalShow, setConnectionModalShow] = useState(true);
	const [shouldRefresh, setShouldRefresh] = useState(false);
	const [guideIsOpen, setGuideIsOpen] = useState(false);
	const [anyOpenBox, setAnyOpenBox] = useState(false);
	const location = useLocation();

	const handleConfirm = (requestID, originalIndexes) => {
		appState.contract.methods
			.confirmContributor(requestID, originalIndexes)
			.send({ from: account }, (error, result) => {
				if (!error) {
					toast(result, 'success', true, result);
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
	// pagination hook
	useEffect(() => {
		if (appState.contract !== null) {
			if (account) {
				setLoading(true);

				appState.contract.methods
					.orderResult()
					.call({ from: account })
					.then((result) => {
						const myRequests = result[0];

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
		if (anyOpenBox) {
			setTimeout(() => {
				setGuideIsOpen(true);
			}, 200);
		}
	}, [anyOpenBox]);

	return (
		<PageWrapper>
			{!localStorage.getItem('guide/' + location.pathname.split('/')[1]) && (
				<Guide steps={steps} {...{ guideIsOpen, setGuideIsOpen }} />
			)}
			<TitleBar>My Requests</TitleBar>
			<ContentWrapper>
				{appState.isMobile ? (
					<NoMobileSupportMessage />
				) : !account ? (
					<ConnectDialog isOpen={ConnectionModalShow} onClose={() => setConnectionModalShow(false)} />
				) : isLoading ? (
					<SpinnerWrapper>
						<Spinner />
					</SpinnerWrapper>
				) : Object.values(requests).length > 0 ? (
					Object.values(requests)
						.sort((a, b) => +b.requestID - +a.requestID)
						.map((item) => (
							<RequestListItem
								shouldRefresh={shouldRefresh}
								showContributions
								key={item.requestID}
								requestID={item.requestID}
								title={item.title}
								angelTokenPay={item.angelTokenPay}
								laboratoryTokenPay={item.laboratoryTokenPay}
								total={item.totalContributedCount}
								contributors={`${item.totalContributed}/${item.totalContributors}`}
								fulfilled={+item.totalContributed === +item.totalContributors}
								handleConfirm={handleConfirm}
								setAnyOpenBox={setAnyOpenBox}
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
