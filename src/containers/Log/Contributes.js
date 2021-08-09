import React, { useContext } from 'react';
import LogCard from '../../components/LogCard/Index';
import LogCardMobile from '../../components/LogCard/LogCardMobile';
import { mainContext } from './../../state';

const Contributes = ({ requests, isLoading }) => {
	const { appState } = useContext(mainContext);
	console.log('requests', requests, requests.length);
	return (
		<>
			{appState.isMobile ? (
				<>
					<LogCardMobile success contributed />
					<LogCardMobile pending contributed />
				</>
			) : isLoading ? (
				'isLoading'
			) : (
				requests.map((request) => <LogCard key={request.requestID} data={request} />)
			)}
		</>
	);
};

export default Contributes;
