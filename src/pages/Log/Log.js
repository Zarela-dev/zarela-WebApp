import React, { useContext } from "react";
import { mainContext } from "../../state";
import styled, { css } from "styled-components";
import TitleBar from "../../components/TitleBar/TitleBar";
import { Tabs } from "../../components/Tabs";
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

const Balance = styled.div`
	font-style: normal;
	font-weight: 500;
	font-size: 14px;
	line-height: 18px;
	color: ${(props) => props.theme.textPrimary};
`;

const Log = () => {
	const { appState } = useContext(mainContext);
	return (
		<Wrapper>
			<WalletTitlebar isMobile={appState.isMobile}>
				<Title>Log</Title>
				<Balance>balance</Balance>
			</WalletTitlebar>
			<MobileLayout>
				<Tabs
					route="Log"
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
							label: "Market Requests",
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
				></Tabs>
			</MobileLayout>
		</Wrapper>
	);
};

export default Log;
