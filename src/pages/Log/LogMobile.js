import React, { useContext } from "react";
import styled, { css } from "styled-components";
import TitleBarMobile from "../../components/TitleBar/TitleBarMobile";
import { Tabs } from "../../components/Tabs";
import { mainContext } from "../../state";

import MyRequests from "../../containers/Log/MyRequests";
import MarketRequests from "../../containers/Log/MarketRequests";
import Contributes from "../../containers/Log/Contributes";

import ConnectToMetamask from "../../components/ConnectToMetamask";
import MobileLayout from "../../components/MobileLayout";

const Wrapper = styled.div``;

const LogInnerContainer = styled.div`
	padding: 0;
	margin: 0;
	background: ${(props) => (props.elevated ? "#FFFFFF" : "#F4F8FE")};
	border: ${(props) =>
		props.elevated ? "0.5px solid rgba(133, 206, 238, 0.5)" : "none"};
	box-shadow: ${(props) =>
		props.elevated ? "0px 4px 18px rgba(223, 236, 255, 0.3)" : "none"};
	border-radius: 8px;
`;

const WalletTitlebar = styled(TitleBarMobile)`
	display: flex;
	flex-wrap: nowrap;
	justify-content: space-between;
	height: 85px;
	padding: 0 18px;
	flex-direction: row;
	display: flex;
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

const Balance = styled.div`
	font-style: normal;
	font-weight: 500;
	font-size: 14px;
	line-height: 18px;
	color: ${(props) => props.theme.textPrimary};
`;

const LogMobile = ({ account, logs, isLoading }) => {
	const { appState } = useContext(mainContext);

	return (
		<Wrapper>
			<WalletTitlebar>
				<Title>Log</Title>
				<Balance>balance</Balance>
			</WalletTitlebar>
			<MobileLayout>
				<Tabs
					route="Log"
					device={appState.device}
					data={[
						{
							label: "My Requests",
							component: (
								<LogInnerContainer>
									<MyRequests />
								</LogInnerContainer>
							),
						},
						{
							label: "Market Requests",
							component: (
								<LogInnerContainer>
									<MarketRequests />
								</LogInnerContainer>
							),
						},
						{
							label: "Contributed",
							component: (
								<LogInnerContainer>
									<Contributes />
								</LogInnerContainer>
							),
						},
					]}
				></Tabs>
			</MobileLayout>
		</Wrapper>
	);
};

export default LogMobile;
