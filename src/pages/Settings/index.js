import React from 'react';
import { Tabs } from '../../components/Tabs';
import Contacts from './../../components/SettingCard/Contacts';
import Blocked from './../../components/SettingCard/Blocked';
import Hidden from './../../components/SettingCard/Hidden';
import styled from 'styled-components';
import { useStore } from '../../state/store';

const LogInnerContainer = styled.div`
	padding: 0;
	margin: 0;
	background: ${(props) => (props.elevated ? '#FFFFFF' : '#F4F8FE')};
	border: none;
	box-shadow: none;
	border-radius: 8px;
`;

const Settings = () => {
	const { isMobile } = useStore();
	return (
		<Tabs
			route="settings"
			isMobile={isMobile}
			data={[
				{
					label: 'Contacts',
					component: (
						<LogInnerContainer elevated>
							<Contacts isMobile={isMobile} />
						</LogInnerContainer>
					),
				},
				{
					label: 'Blocked',
					component: (
						<LogInnerContainer elevated>
							<Blocked isMobile={isMobile} />
						</LogInnerContainer>
					),
				},
				{
					label: 'Hidden',
					component: (
						<LogInnerContainer elevated>
							<Hidden isMobile={isMobile} />
						</LogInnerContainer>
					),
				},
			]}
		/>
	);
};

export default Settings;
