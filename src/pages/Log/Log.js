import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Tabs } from '../../components/Tabs';
import MyRequests from '../../containers/Log/MyRequests';
import Contributes from '../../containers/Log/Contributes';
import ConnectDialog from '../../components/Dialog/ConnectDialog';
import MobileLayout from '../../components/MobileLayout';
import Guide from '../../components/Guide/Guide';
import { LogSteps } from '../../guides';
import { useStore } from '../../state/store';
import { getConnectorHooks } from '../../utils/getConnectorHooks';
import WalletDialog from '../../components/Dialog/WalletDialog';

const Wrapper = styled.div``;

const LogInnerContainer = styled.div`
	padding: 0;
	margin: 0;
	background: ${(props) => (props.elevated ? '#FFFFFF' : '#F4F8FE')};
	border: none;
	box-shadow: none;
	border-radius: 8px;
`;

const Log = () => {
	const { isMobile, activeConnector } = useStore();
	const { useAccount } = getConnectorHooks(activeConnector);
	const account = useAccount();

	const [guideIsOpen, setGuideIsOpen] = useState(false);

	useEffect(() => {
		setTimeout(() => {
			setGuideIsOpen(true);
		}, 200);
	}, []);

	return (
		<Wrapper>
			{guideIsOpen && <Guide steps={LogSteps}></Guide>}
			<MobileLayout>
				{!account ? (
					<WalletDialog eagerConnect />
				) : (
					<Tabs
						route="log"
						data-tour={'requests'}
						isMobile={isMobile}
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
								label: 'My Contributions',
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
