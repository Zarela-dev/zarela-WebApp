import React from "react";
import RequestDetailsMobile from "../../components/RequestDetails/RequestDetailsMobile";
import { timeSince } from "../../utils";

const App = ({
	request,
	error,
	setError,
}) => {
	return (
		<div>
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
