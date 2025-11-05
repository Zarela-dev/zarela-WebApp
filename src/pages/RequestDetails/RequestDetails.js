import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router';
import { mainContext } from '../../state';
import { convertToBiobit } from '../../utils';
import Mobile from './Mobile';
import Desktop from './Desktop';
import Guide from './../../components/Guide/Guide';
import { create } from 'ipfs-http-client';
import all from 'it-all';

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
];

const RequestDetailsPage = () => {
	const { id } = useParams();
	const [request, setRequest] = useState({});
	const { appState } = useContext(mainContext);
	const [error, setError] = useState(false);
	const [zpaperDownloadLink, setZpaperLink] = useState(null);
	
	// Configure IPFS client with Infura authentication
	const auth = 'Basic ' + btoa(process.env.REACT_APP_INFURA_PROJECT_ID + ':' + process.env.REACT_APP_INFURA_PROJECT_SECRET);
	const ipfs = create({
		url: process.env.REACT_APP_IPFS,
		headers: {
			authorization: auth
		}
	});

	useEffect(() => {
		if (request.whitePaper) {
			const getFilename = async () => {
				const output = await all(ipfs.ls(request.whitePaper));
				return output;
			};
			getFilename()
				.then((res) => {
					res.length && setZpaperLink(res[0].path);
				})
				.catch((err) => console.error(err));
		}
	}, [request]);

	useEffect(() => {
		if (appState.contract !== null) {
			// Use promise-based calls for Web3 v4 compatibility
			appState.contract.methods.Categories(id).call()
				.then((result) => {
					let categories = result[0];
					let businessCategory = result[1];

					if (+businessCategory === +process.env.REACT_APP_ZARELA_BUSINESS_CATEGORY) {
						// filter categories and only show Zarela requests
						return appState.contract.methods.orders(id).call()
							.then((orderResult) => {
								const requestTemplate = {
									requestID: orderResult[0],
									title: orderResult[1],
									description: orderResult[7],
									requesterAddress: orderResult[2],
									angelTokenPay: convertToBiobit(orderResult[3], false),
									laboratoryTokenPay: convertToBiobit(orderResult[4], false),
									totalContributors: orderResult[5], // total contributors required
									totalContributed: +orderResult[5] - +orderResult[8],
									whitePaper: orderResult[6],
									timestamp: orderResult[10],
									categories,
									encryptionPublicKey: orderResult[11],
									totalContributedCount: orderResult[9],
								};
								setRequest(requestTemplate);
							});
					}
				})
				.catch((error) => {
					console.error('Error fetching request details:', error.message || error);
				});
		}
	}, [id, appState.contract]);

	return (
		<Guide steps={steps}>
			{appState.isMobile ? (
				<Mobile
					{...{
						request,
						error,
						setError,
						zpaperDownloadLink: zpaperDownloadLink
							? process.env.REACT_APP_IPFS_GET_LINK + zpaperDownloadLink
							: null,
					}}
				/>
			) : (
				<Desktop
					{...{
						request,
						error,
						setError,
						zpaperDownloadLink: zpaperDownloadLink
							? process.env.REACT_APP_IPFS_GET_LINK + zpaperDownloadLink
							: null,
					}}
				/>
			)}
		</Guide>
	);
};

export default RequestDetailsPage;
