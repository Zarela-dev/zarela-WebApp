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

const Log = () => {
	const { account } = useWeb3React();
	const { appState } = useContext(mainContext);

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
