import React from "react";
import RequestDetailsMobile from "../../components/RequestDetails/RequestDetailsMobile";
import { timeSince } from "../../utils";
import ConnectDialog from "../../components/Dialog/ConnectDialog";

const App = ({
	account,
	showDialog,
	setDialog,
	request,
	error,
	setError,
}) => {
	return (
		<div>
			<ConnectDialog
				isOpen={!account && showDialog}
				onClose={() => setDialog(false)}
			/>
			<RequestDetailsMobile
				request={request}
				timestamp={timeSince(request.timestamp)}
				error={error}
				setError={setError}
			/>
		</div>
	);
};

export default App;
