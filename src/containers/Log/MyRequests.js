import React, { useContext, useEffect, useState } from "react";
import { mainContext } from "../../state";
import { convertToBiobit, toast } from "../../utils";
import LogCard from "../../components/LogCard/Index";
import LogCardMobile from "../../components/LogCard/LogCardMobile";
import { useWeb3React } from "@web3-react/core";
import styled from "styled-components";
import Spinner from "../../components/Spinner";

const SpinnerWrapper = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
`;
const MyRequests = () => {
	const { account } = useWeb3React();
	const { appState } = useContext(mainContext);

	const [requests, setRequests] = useState({});
	const [isLoading, setLoading] = useState(false);

	useEffect(() => {
		if (appState.contract !== null) {
			if (account) {
				setLoading(true);
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
										requestsListObject[
											requestTemplate.requestID
										] = requestTemplate;
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

	return (
		<>
			{isLoading ? (
				<SpinnerWrapper>
					<Spinner />
				</SpinnerWrapper>
			) : Object.values(requests).length > 0 ? (
				Object.values(requests)
					.sort((a, b) => +b.requestID - +a.requestID)
					.map((item) =>
						appState.isMobile ? (
							<LogCardMobile
								key={item.requestID}
								requestID={item.requestID}
								title={item.title}
								tokenPay={item.tokenPay}
								timestamp={item.timestamp}
								total={item.totalContributedCount}
								contributors={`${item.totalContributed}/${item.totalContributors}`}
								MyRequests
							/>
						) : (
							<LogCard
								key={item.requestID}
								requestID={item.requestID}
								title={item.title}
								tokenPay={item.tokenPay}
								timestamp={item.timestamp}
								total={item.totalContributedCount}
								contributors={`${item.totalContributed}/${item.totalContributors}`}
								MyRequests
							/>
						)
					)
			) : (
				"You haven't contributed to any requests yet."
			)}
		</>
	);
};

export default MyRequests;
