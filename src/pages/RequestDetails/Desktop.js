import React, { useState, useEffect } from 'react';
import RequestDetails from '../../components/RequestDetails/RequestDetails';
import { timeSince } from '../../utils';
import ConnectDialog from '../../components/Dialog/ConnectDialog';
import Dialog from '../../components/Dialog';
import Guide from './../../components/Guide/Guide';
import { useLocation } from 'react-router';

const steps = [
	{
		selector: '[data-tour="request-details-one"]',
		content: 'Mage’s public key on Ethereum Network is indicated here for checking by angles.',
	},
	{
		selector: '[data-tour="request-details-two"]',
		content: 'Mage creates the Zpaper, containing all the description and requirements.',
	},
	{
		selector: '[data-tour="request-details-three"]',
		content: 'For contributing, files must be selected here from your device.',
	},
	{
		selector: '',
		content:
			'Well done! You earn 100 Biobits for this learning! want to earn more? learn every guide on pages and collect about 500 BBits!',
	},
];

const Desktop = ({
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
	const location = useLocation();

	let [guideIsOpen, setGuideIsOpen] = useState(false);

	useEffect(() => {
		setTimeout(() => {
			setGuideIsOpen(true);
		}, 5000);
	}, []);

	return (
		<>
			{!localStorage.getItem('guide/' + location.pathname.split('/')[1]) ? (
				<Guide steps={steps} {...{ guideIsOpen, setGuideIsOpen }} />
			) : null}
			<ConnectDialog isOpen={!account && showDialog} onClose={() => setSubmitting(false)} />
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
