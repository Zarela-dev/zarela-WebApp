import React, { useState, useContext, useEffect } from 'react';
import TitleBar from '../components/TitleBar';
import styled from 'styled-components';
import maxWidthWrapper from '../components/Elements/MaxWidth';
import RequestListItem from '../components/RequestListItem';
import { mainContext } from '../state';
import ConnectDialog from '../components/Dialog/ConnectDialog';
import { convertToBiobit, toast } from '../utils';
import NoRequestsFound from '../components/NoRequestsFound';
const PageWrapper = styled.div`
	
`;

const ContentWrapper = styled.div`
	margin-top: ${props => props.theme.spacing(6)};
	${maxWidthWrapper};
`;

const Inbox = () => {
	const { appState } = useContext(mainContext);
	const PAGE_SIZE = 3;
	const [requests, setRequests] = useState({});

	const handleConfirm = (requestID, addresses) => {
		appState.contract.methods.ConfirmContributer(requestID, addresses).send({ from: appState.accounts[0] }, (error, result) => {
			if (!error) {
				toast(result, 'success', true, result);
			}
			else {
				toast(error.message, 'error');
			}
		});
		appState.contract.events.Transfer({})
			.on('data', (event) => {
				toast(
					`tokens were successfully sent to ${event.returnValues[1]}`,
					'success',
					false,
					null,
					{
						toastId: event.id
					}
				);
			})
			.on('error', (error, receipt) => {
				toast(error.message, 'error');
				console.error(error, receipt);
			});
	};
	// pagination hook
	useEffect(() => {
		if (appState.contract !== null) {
			if (appState.accounts.length !== 0) {
				appState.contract.methods.Order_Details().call({ from: appState.accounts[0] }).then(result => {
					const myRequests = result[0];

					myRequests.forEach(currentRequest => {
						appState.contract.methods.ord_file(currentRequest).call().then(result => {
							const requestTemplate = {
								requestID: result[0],
								title: result[1],
								description: result[6],
								requesterAddress: result[2],
								tokenPay: result[3],
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
						})
							.catch(error => {
								console.error(error.message);
							});
					});
				}).catch(error => {
					console.error(error.message);
				});
			}
		}
	}, [appState.contract, appState.accounts]);

	return (
		<PageWrapper>
			<TitleBar>
				My Requests
			</TitleBar>
			<ContentWrapper>
				{
					appState.accounts.length === 0 ?
						<ConnectDialog isOpen={true} /> :
						Object.values(requests).length > 0 ? Object.values(requests).reverse().map(item => (
							<RequestListItem
								showContributions
								key={item.requestID}
								requestID={item.requestID}
								title={item.title}
								tokenPay={convertToBiobit(item.tokenPay)}
								total={item.totalContributedCount}
								contributors={`${item.totalContributed}/${item.totalContributors}`}
								handleConfirm={handleConfirm}
							/>
						)) : <NoRequestsFound />
				}
			</ContentWrapper>
		</PageWrapper>
	);
};

export default Inbox;
