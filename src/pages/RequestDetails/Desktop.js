import React from 'react';
import RequestDetails from '../../components/RequestDetails/RequestDetails';
import { timeSince } from '../../utils';

const Desktop = ({ request, error, setError }) => {
	return (
		<>
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
