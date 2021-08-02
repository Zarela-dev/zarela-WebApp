import React from "react";
import RequestDetailsMobile from "../../components/RequestDetails/RequestDetailsMobile";
import { timeSince, convertToBiobit } from "../../utils";
import ConnectDialog from "../../components/Dialog/ConnectDialog";
import Dialog from "../../components/Dialog";

const App = ({
	account,
	showDialog,
	isSubmitting,
	setSubmitting,
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
				onClose={() => setSubmitting(false)}
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
