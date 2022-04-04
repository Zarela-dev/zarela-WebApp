import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import maxWidthWrapper from '../components/Elements/MaxWidth';
import RequestListItem from '../components/RequestListItem';
import { pendingFilesContext } from '../state/pendingFilesProvider';
import { convertToBiobit, toast } from '../utils';
import NoRequestsFound from '../components/NoRequestsFound';
import Spinner from '../components/Spinner';
import NoMobileSupportMessage from '../components/NoMobileSupportMessage';
import Guide from './../components/Guide/Guide';
import { InboxSteps } from '../guides';
import { useStore } from '../state/store';
import { getConnectorHooks } from '../utils/getConnectorHooks';
import WalletDialog from '../components/Dialog/WalletDialog';

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
	const PendingFiles = useContext(pendingFilesContext);
	const { pendingFiles, setPendingFile, removePendingFile } = PendingFiles;
	const [requests, setRequests] = useState({});
	const [isLoading, setLoading] = useState(false);
	// to manually trigger a data fetch, after the signalsApproved event is triggered
	const [shouldRefresh, setShouldRefresh] = useState(false);
	const [guideIsOpen, setGuideIsOpen] = useState(false);
	const [cleanSelected, setCleanSelected] = useState(null);
	const { activeConnector, isMobile, contract } = useStore();
	const { useAccount } = getConnectorHooks(activeConnector);
	const account = useAccount();

	const handleConfirm = (requestID, originalIndexes) => {
		contract
			.confirmContributor(requestID, originalIndexes, { from: account })
			.then(({ hash: txHash }) => {
				setPendingFile({
					txHash,
					requestID,
					originalIndexes,
				});
				setCleanSelected(requestID);
				toast(`TX Hash: ${txHash}`, 'success', true, txHash, {
					toastId: txHash,
				});
			})
			.catch((error) => {
				toast(error.message, 'error');
			});
	};

	useEffect(() => {
		if (shouldRefresh === true) {
			setShouldRefresh(false);
		}
	}, [shouldRefresh]);

	useEffect(() => {
		if (contract && removePendingFile !== undefined)
			contract.on('signalsApproved', ({ transactionHash }) => {
				removePendingFile(transactionHash);
				setShouldRefresh(true);
			});
	}, [contract, removePendingFile]);

	useEffect(() => {
		if (contract !== null) {
			if (account) {
				setLoading(true);

				contract
					.orderResult({ from: account })
					.then((result) => {
						const myRequests = result[0].map((item) => item.toNumber());
						// fo fetch handle loading state we need make sure this runs synchronously (predictable)
						const getAllRequests = new Promise(async (resolve, reject) => {
							const requestsListObject = {};

							for (const currentRequest of myRequests) {
								await contract
									.orders(currentRequest)
									.then((result) => {
										const requestTemplate = {
											requestID: result[0].toNumber(),
											title: result[1],
											description: result[7],
											requesterAddress: result[2],
											angelTokenPay: convertToBiobit(result[3].toNumber(), false),
											laboratoryTokenPay: convertToBiobit(result[4].toNumber(), false),
											totalContributors: result[5].toNumber(), // total contributors required
											totalContributed: result[5].toNumber() - result[8].toNumber(),
											whitePaper: result[6],
											timestamp: result[10].toNumber(),
											totalContributedCount: result[9].toNumber(),
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
	}, [contract, account]);

	useEffect(() => {
		if (Object.values(requests).filter((item) => item.totalContributedCount > 0).length)
			// we delay guide to make sure all the necessary components are mounted and loaded
			setTimeout(() => {
				setGuideIsOpen(true);
			}, 200);
	}, [requests]);

	return (
		<PageWrapper>
			{!isMobile && guideIsOpen && <Guide steps={InboxSteps}></Guide>}
			<ContentWrapper>
				{/* 
					because Metamask does not support decryption in mobile yet
					we only have this page in the
				*/}
				{isMobile ? (
					<NoMobileSupportMessage />
				) : !account ? (
					<WalletDialog eagerConnect />
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
								isSendingTokens={isSendingTokens}
								shouldRefresh={shouldRefresh}
								showContributions={index === 0}
								key={item.requestID}
								pendingFiles={pendingFiles}
								requestID={item.requestID}
								title={item.title}
								setCleanSelected={setCleanSelected}
								cleanSelected={cleanSelected}
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
