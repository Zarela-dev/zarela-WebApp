import React, { useContext, useState, useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import styled from 'styled-components';
import { mainContext } from '../../state';
import TitleBar from '../../components/TitleBar/TitleBar';
import { Tabs } from '../../components/Tabs';
import MyRequests from '../../containers/Log/MyRequests';
import { convertToBiobit, toast } from '../../utils';
import Contributes from '../../containers/Log/Contributes';
import ConnectDialog from '../../components/Dialog/ConnectDialog';
import MobileLayout from '../../components/MobileLayout';
import Guide from '../../components/Guide/Guide';
import { LogSteps } from '../../guides';

const Wrapper = styled.div``;

const LogInnerContainer = styled.div`
	padding: 0;
	margin: 0;
	background: ${(props) => (props.elevated ? '#FFFFFF' : '#F4F8FE')};
	border: none;
	box-shadow: none;
	border-radius: 8px;
`;

const WalletTitlebar = styled(TitleBar)`
	display: flex;
	flex-wrap: nowrap;
	justify-content: space-between;
	height: ${(props) => (props.isMobile ? '85px' : 'unset')};
	padding: ${(props) => props.isMobile && '0 18px'};
	flex-direction: row;
	width: 100%;
	align-items: center;
`;

const Title = styled.div`
	font-weight: 700;
	font-size: 24px;
	line-height: 28px;
	color: ${(props) => props.theme.textPrimary};
	padding: 0;

	@media only screen and (max-width: ${(props) => props.theme.tablet_sm_breakpoint}) {
		font-size: 18px;
	}
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
		font-weight: 600;
	}
`;

const Log = () => {
	const { account } = useWeb3React();
	const { appState } = useContext(mainContext);
	const [totalRevenueFromZarela, setTotalRevenueFromZarela] = useState(0);
	const [totalRevenueFromRequester, setTotalRevenueFromRequester] = useState(0);
	const [guideIsOpen, setGuideIsOpen] = useState(false);

	useEffect(() => {
		setTimeout(() => {
			setGuideIsOpen(true);
		}, 200);
	}, []);

	useEffect(() => {
		if (appState.contract !== null) {
			if (account) {
				appState.contract.methods.userMap(account).call((error, result) => {
					if (!error) {
						const formatter = (value) => convertToBiobit(value);
						setTotalRevenueFromRequester(formatter(result[1]));
						setTotalRevenueFromZarela(formatter(result[0]));
					} else {
						toast(error.message, 'error');
					}
				});
			}
		}
	}, [account, appState.contract]);

	return (
		<Wrapper>
			{guideIsOpen && <Guide steps={LogSteps}></Guide>}
			<WalletTitlebar isMobile={appState.isMobile}>
				<Title>Log</Title>
				<RewardWrapper>
					<RewardItem>
						<RewardLabel>My reward from Zarela</RewardLabel>
						<RewardValue>{`${totalRevenueFromZarela} BBit`}</RewardValue>
					</RewardItem>
					<RewardItem>
						<RewardLabel>My wage from mage</RewardLabel>
						<RewardValue>{`${totalRevenueFromRequester} BBit`}</RewardValue>
					</RewardItem>
				</RewardWrapper>
			</WalletTitlebar>
			<MobileLayout>
				{!account ? (
					<ConnectDialog isOpen={true} />
				) : (
					<Tabs
						route="log"
						data-tour={'requests'}
						isMobile={appState.isMobile}
						data={[
							{
								label: 'My Requests',
								'data-tour': 'my-requests',
								component: (
									<LogInnerContainer elevated>
										<MyRequests />
									</LogInnerContainer>
								),
							},
							{
								label: 'Contributed',
								'data-tour': 'my-contributions',
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
