import React, { useContext } from 'react';
import LogCard from '../../components/LogCard/Index';
import LogCardMobile from '../../components/LogCard/LogCardMobile';
import { mainContext } from './../../state';

const Contributes = ({ requests, isLoading }) => {
	const { appState } = useContext(mainContext);
	console.log('requests', requests, requests.length);
	if (appState.isMobile)
		return isLoading
			? 'loading'
			: requests.map((request) => <LogCardMobile key={request.requestID} data={request} />);
	return isLoading ? 'isLoading' : requests.map((request) => <LogCard key={request.requestID} data={request} />);
};

export default Contributes;
