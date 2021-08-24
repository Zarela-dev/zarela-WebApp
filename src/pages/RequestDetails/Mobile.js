import React from "react";
import RequestDetailsMobile from "../../components/RequestDetails/RequestDetailsMobile";
import { timeSince } from "../../utils";
import ConnectDialog from "../../components/Dialog/ConnectDialog";
import Dialog from "../../components/Dialog";

const App = ({
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
		<div>
			<ConnectDialog
				isOpen={!account && showDialog}
				onClose={() => setDialog(false)}
			/>
			<Dialog
				isOpen={isSubmitting}
				content={dialogMessage}
				hasSpinner
				type="success"
			/>
			<RequestDetailsMobile
				request={request}
				ref={sendSignalRef}
				submitSignal={submitSignal}
				timestamp={timeSince(request.timestamp)}
				error={error}
				setError={setError}
			/>
		</div>
	);
};

export default App;
