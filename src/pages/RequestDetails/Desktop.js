import React from 'react';
import RequestDetails from '../../components/RequestDetails/RequestDetails';
import { timeSince } from '../../utils';
import ConnectDialog from '../../components/Dialog/ConnectDialog';
import Dialog from '../../components/Dialog';

const Desktop = ({
	account,
	showDialog,
	isSubmitting,
	setDialog,
	dialogMessage,
	request,
	sendSignalRef,
	submitSignal,
	error,
	setError,
}) => {
	return (
		<>
			<ConnectDialog isOpen={!account && showDialog} onClose={() => setDialog(false)} />
			<Dialog isOpen={isSubmitting} content={dialogMessage} hasSpinner type="success" />
			<RequestDetails
				request={request}
				ref={sendSignalRef}
				submitSignal={submitSignal}
				timestamp={timeSince(request.timestamp)}
				error={error}
				setError={setError}
			/>
		</>
	);
};

export default Desktop;
