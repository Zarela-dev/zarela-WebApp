import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import TagManager from 'react-gtm-module';
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';

if (process.env.NODE_ENV === 'production') {
	if (process.env.REACT_APP_IS_TEST_NET !== 'true') {
		Sentry.init({
			dsn: 'https://1a9cf4fa02f44ab1a7101ae73e29ccb4@o1005363.ingest.sentry.io/5966083',
			integrations: [new Integrations.BrowserTracing()],
			tracesSampleRate: 1.0,
		});
		const tagManagerArgs = {
			gtmId: 'GTM-5W9PWHH',
		};
		TagManager.initialize(tagManagerArgs);
	} else {
		Sentry.init({
			dsn: 'https://ef3977fe4a7e4bcdaeaf226df57cada4@o1005363.ingest.sentry.io/5978785',
			integrations: [new Integrations.BrowserTracing()],
			tracesSampleRate: 1.0,
		});
		const tagManagerArgs = {
			gtmId: 'GTM-M2G7MQ6',
		};
		TagManager.initialize(tagManagerArgs);
	}
}

console.log(process.env.REACT_APP_ZARELA_CONTRACT_ADDRESS)
ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
