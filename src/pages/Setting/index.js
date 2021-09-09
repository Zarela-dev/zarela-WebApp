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

const Setting = () => {
	const { appState } = useContext(mainContext);

	if (!appState.isMobile) {
		return (
			<Tabs
				route="setting"
				data-tour={'contacts'}
				isMobile={appState.isMobile}
				data={[
					{
						label: 'Contacts',
						component: (
							<LogInnerContainer elevated>
								<Contacts />
							</LogInnerContainer>
						),
					},
					{
						label: 'Blocked',
						component: (
							<LogInnerContainer elevated>
								<Blocked />
							</LogInnerContainer>
						),
					},
					{
						label: 'Hidden',
						component: (
							<LogInnerContainer elevated>
								<Hidden />
							</LogInnerContainer>
						),
					},
				]}
			/>
		);
	} else {
		return null;
	}
};

export default Setting;
