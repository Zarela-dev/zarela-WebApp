import React from 'react';
import RequestDetailsMobile from '../../components/RequestDetails/RequestDetailsMobile';
import { timeSince } from '../../utils';

const App = ({ request, error, setError, zpaperDownloadLink }) => {
	return (
		<div>
			<RequestDetailsMobile
				request={request}
				timestamp={timeSince(request.timestamp)}
				error={error}
				zpaperDownloadLink={zpaperDownloadLink}
				setError={setError}
			/>
		</div>
	);
};

export default App;
