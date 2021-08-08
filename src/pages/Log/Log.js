import React, { useContext, useState, useEffect } from "react";
import { mainContext } from "../../state";
import styled, { css } from "styled-components";
import TitleBar from "../../components/TitleBar/TitleBar";
import { Tabs } from "../../components/Tabs";
import MyRequests from "../../containers/Log/MyRequests";
import MarketRequests from "../../containers/Log/MarketRequests";
import { convertToBiobit, toast } from "../../utils";
import Contributes from "../../containers/Log/Contributes";
import { useWeb3React } from "@web3-react/core";
import ConnectDialog from "../../components/Dialog/ConnectDialog";
import MobileLayout from "../../components/MobileLayout";

const Wrapper = styled.div``;

const LogInnerContainer = styled.div`
	padding: 0;
	margin: 0;
	background: ${(props) => (props.elevated ? "#FFFFFF" : "#F4F8FE")};
	border: none;
	box-shadow: none;
	border-radius: 8px;
`;

const WalletTitlebar = styled(TitleBar)`
	display: flex;
	flex-wrap: nowrap;
	justify-content: space-between;
	height: ${(props) => (props.isMobile ? "85px" : "unset")};
	padding: ${(props) => props.isMobile && "0 18px"};
	flex-direction: row;
	width: 100%;
	align-items: center;
`;

const Title = styled.div`
	font-weight: 500;
	font-size: 22px;
	line-height: 28px;
	color: ${(props) => props.theme.textPrimary};
	padding: 0;
`;

const RewardWrapper = styled.div`
	display: flex;
	flex-direction: column;
`;

const RewardItem = styled.div`
	display: flex;
	justify-content: flex-end;
`;

const RewardLabel = styled.div`
	font-weight: 300;
	font-size: 16px;
	line-height: 21px;

	@media (max-width: 768px) {
		font-size: 12.5px;
	}
`;

const RewardValue = styled.div`
	font-size: 16px;
	font-weight: 700;
	margin-left: ${(props) => props.theme.spacing(1)};

	@media (max-width: 768px) {
		font-size: 13px;
		font-weidth: 600;
	}
`;

const Log = () => {
	const { account } = useWeb3React();
	const { appState } = useContext(mainContext);
	const [requests, setRequests] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const [totalRevenueFromZarela, setTotalRevenueFromZarela] = useState(0);
	const [totalRevenueFromRequester, setTotalRevenueFromRequester] = useState(0);
	const [ConnectionModalShow, setConnectionModalShow] = useState(true);

	/*const onClick = () => {
		appState.contract.methods
			.GetOrderFiles(requestID)
			.call({ from: account }, (error, result) => {
				if (!error) {
					let formatted = {};
					let selected = [];
					let uniqueAddresses = [...new Set(result[1])];
					let pairs = [];

					result[0].forEach((file, fileIndex) => {
						pairs.push({
							file,
							address: result[1][fileIndex],
							timestamp: result[2][fileIndex],
							originalIndex: fileIndex,
							status: result[3][fileIndex],
						});
					});

					uniqueAddresses.forEach((uAddress, uIndex) => {
						pairs.forEach((tempItem, tempIndex) => {
							if (tempItem.address === uAddress) {
								if (Object(formatted).hasOwnProperty(uAddress)) {
									formatted[uAddress].push({
										ipfsHash: tempItem.file,
										timestamp: tempItem.timestamp,
										originalIndex: tempItem.originalIndex,
										status: tempItem.status,
									});
								} else {
									formatted[uAddress] = [
										{
											ipfsHash: tempItem.file,
											timestamp: tempItem.timestamp,
											originalIndex: tempItem.originalIndex,
											status: tempItem.status,
										},
									];
								}
								selected[uAddress] = [];
							}
						});
					});

					setFormattedData(formatted);
					setSelected(selected);
				} else {
					console.error(error.message);
				}
			});
	};
 */
	useEffect(() => {
		if (appState.contract !== null) {
			if (account) {
				/* appState.contract.methods
					.Order_Details()
					.call({ from: account })
					.then((result) => {
						const myContributions = result[1];

						const getAllRequests = new Promise(async (resolve, reject) => {
							const requestsListObject = {};

							for (const currentRequest of myContributions) {
								await appState.contract.methods
									.ord_file(currentRequest)
									.call()
									.then((result) => {
										const requestTemplate = {
											requestID: result[0],
											title: result[1],
											description: result[6],
											requesterAddress: result[2],
											tokenPay: convertToBiobit(result[3]),
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
					}); */

				appState.contract.methods.User_Map(account).call((error, result) => {
					if (!error) {
						const formatter = (value) => convertToBiobit(value);
						setTotalRevenueFromRequester(formatter(result[1]));
						setTotalRevenueFromZarela(formatter(result[0]));
					} else {
						toast(error.message, "error");
					}
				});
			}
		}
	}, [account, appState.contract]);

	return (
		<Wrapper>
			<WalletTitlebar isMobile={appState.isMobile}>
				<Title>Log</Title>
				<RewardWrapper>
					<RewardItem>
						<RewardLabel>Reward Pool</RewardLabel>
						<RewardValue>{`${totalRevenueFromZarela} BBit`}</RewardValue>
					</RewardItem>
					<RewardItem>
						<RewardLabel>Requesters Reward</RewardLabel>
						<RewardValue>{`${totalRevenueFromRequester} BBit`}</RewardValue>
					</RewardItem>
				</RewardWrapper>
			</WalletTitlebar>
			<MobileLayout>
				{!account ? (
					<ConnectDialog
						isOpen={ConnectionModalShow}
						onClose={() => setConnectionModalShow(false)}
					/>
				) : (
					<Tabs
						route="log"
						isMobile={appState.isMobile}
						data={[
							{
								label: "My Requests",
								component: (
									<LogInnerContainer elevated>
										<MyRequests />
									</LogInnerContainer>
								),
							},
							{
								label: "Marked Requests",
								component: (
									<LogInnerContainer elevated>
										<MarketRequests />
									</LogInnerContainer>
								),
							},
							{
								label: "Contributed",
								component: (
									<LogInnerContainer elevated>
										<Contributes />
									</LogInnerContainer>
								),
							},
						]}
					/>
				)}
			</MobileLayout>
		</Wrapper>
	);
};

export default Log;
