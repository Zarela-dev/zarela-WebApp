import React, { useContext } from 'react';
import LogCard from '../../components/LogCard/Index';
import LogCardMobile from '../../components/LogCard/LogCardMobile';
import { mainContext } from './../../state';

const Contributes = ({ contributions }) => {
	const { appState } = useContext(mainContext);
	// console.log(contributions)
	return (
		<>
			{appState.isMobile ? (
				<>
					<LogCardMobile success contributed />
					<LogCardMobile pending contributed />
				</>
			) : (
				Object.values(contributions).map((contribution) => <LogCard data={contribution} success contributed />)
			)}
		</>
	);
};

export default Contributes;
