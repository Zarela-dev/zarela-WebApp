import React from 'react';
import RequestDetails from '../../components/RequestDetails/RequestDetails';
import { timeSince } from '../../utils';

const Desktop = ({ request, error, zpaperDownloadLink, setError }) => {
	return (
		<>
			<RequestDetails
				request={request}
				timestamp={timeSince(request.timestamp)}
				error={error}
				setError={setError}
				zpaperDownloadLink={zpaperDownloadLink}
			/>
		</>
	);
};

export default Desktop;
