import React, { useEffect, useContext, useState } from 'react';
import LogCard from '../../components/LogCard/Index';
import { mainContext } from '../../state';
import { useWeb3React } from '@web3-react/core';

const Contributes = () => {
	const { appState } = useContext(mainContext);
	const { account } = useWeb3React();
	const [requests, setRequests] = useState({});
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (appState.contract !== null) {
			if (account) {
				appState.contract.methods
					.Order_Details()
					.call({ from: account })
					.then((result) => {
						const myRequests = result[1];

						const getAllRequests = new Promise(async (resolve, reject) => {
							const requestsListObject = {};

							for (const currentRequest of myRequests) {
								await appState.contract.methods
									.ord_file(currentRequest)
									.call()
									.then((result) => {
										const requestTemplate = {
											requestID: result[0],
											title: result[1],
											description: result[6],
											requesterAddress: result[2],
											tokenPay: result[3],
											totalContributors: result[4], // total contributors required
											totalContributed: +result[4] - +result[7],
											whitePaper: result[5],
											timestamp: result[9],
											totalContributedCount: result[8],
										};
										requestsListObject[requestTemplate.requestID] =
											requestTemplate;
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
	}, [account, appState.contract]);

	return (
		<>
			{Object.values(requests).map((item) => (
				<LogCard requestID={item.requestID} success contributed />
			))}
		</>
	);
};

export default Contributes;
