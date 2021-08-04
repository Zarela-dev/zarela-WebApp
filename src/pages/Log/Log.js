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
	const [totalRevenueFromZarela, setTotalRevenueFromZarela] = useState(0);
	const [totalRevenueFromRequester, setTotalRevenueFromRequester] = useState(0);
	const [ConnectionModalShow, setConnectionModalShow] = useState(true);

	useEffect(() => {
		if (appState.contract !== null) {
			if (account) {
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
