import React from 'react';
import RequestDetailsApp from '../../components/RequestDetails/RequestDetailsApp';
import { timeSince, convertToBiobit } from '../../utils';
import ConnectDialog from '../../components/Dialog/ConnectDialog';
import Dialog from '../../components/Dialog';


const App = ({ account, showDialog, isSubmitting, dialogMessage, request, sendSignalRef, submitSignal, error, setError }) => {
  
	return (
		<div>
			<ConnectDialog isOpen={!account && showDialog} />
			<Dialog
				isOpen={isSubmitting}
				content={(
					dialogMessage
				)}
				hasSpinner
				type='success'
			/>
			<RequestDetailsApp
				request={request}
				ref={sendSignalRef}
				submitSignal={submitSignal}
				timestamp={timeSince(request.timestamp)}
				error={error}
				setError={setError}
			/>
		</div>
	);
}

export default App;