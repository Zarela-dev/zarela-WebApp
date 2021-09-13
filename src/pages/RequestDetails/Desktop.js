import React from 'react';
import RequestDetails from '../../components/RequestDetails/RequestDetails';
import { timeSince } from '../../utils';
import ConnectDialog from '../../components/Dialog/ConnectDialog';

const Desktop = ({
	account,
	showDialog,
	setDialog,
	request,
	error,
	setError,
}) => {
	return (
		<>
			<ConnectDialog isOpen={!account && showDialog} onClose={() => setDialog(false)} />
			<RequestDetails
				request={request}
				timestamp={timeSince(request.timestamp)}
				error={error}
				setError={setError}
			/>
		</>
	);
};

export default Desktop;
