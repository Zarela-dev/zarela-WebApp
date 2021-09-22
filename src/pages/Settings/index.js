import React, { useContext } from 'react';
import { mainContext } from '../../state';
import { Tabs } from '../../components/Tabs';
import Contacts from './../../components/SettingCard/Contacts';
import Blocked from './../../components/SettingCard/Blocked';
import Hidden from './../../components/SettingCard/Hidden';
import styled from 'styled-components';

const LogInnerContainer = styled.div`
	padding: 0;
	margin: 0;
	background: ${(props) => (props.elevated ? '#FFFFFF' : '#F4F8FE')};
	border: none;
	box-shadow: none;
	border-radius: 8px;
`;

const Settings = () => {
	const { appState } = useContext(mainContext);
	return (
		<Tabs
			route="settings"
			isMobile={appState.isMobile}
			data={[
				{
					label: 'Contacts',
					component: (
						<LogInnerContainer elevated>
							<Contacts isMobile={appState.isMobile} />
						</LogInnerContainer>
					),
				},
				{
					label: 'Blocked',
					component: (
						<LogInnerContainer elevated>
							<Blocked isMobile={appState.isMobile} />
						</LogInnerContainer>
					),
				},
				{
					label: 'Hidden',
					component: (
						<LogInnerContainer elevated>
							<Hidden isMobile={appState.isMobile} />
						</LogInnerContainer>
					),
				},
			]}
		/>
	);
};

export default Settings;
