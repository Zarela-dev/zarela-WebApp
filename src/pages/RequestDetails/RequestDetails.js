import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router';
import { mainContext } from '../../state';
import { convertToBiobit } from '../../utils';
import Mobile from './Mobile';
import Desktop from './Desktop';
import Guide from './../../components/Guide/Guide';
import { create } from 'ipfs-http-client';
import all from 'it-all';
import { useStore } from '../../state/store';
import { utils } from 'ethers';
import BigNumber from 'bignumber.js';

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
	const [error, setError] = useState(false);
	const [zpaperDownloadLink, setZpaperLink] = useState(null);
	const ipfs = create(process.env.REACT_APP_IPFS);
	const { contract, isMobile } = useStore();

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
		if (contract !== null) {
			contract
				.Categories(id)
				.then((categoryResult) => {
					let categories = categoryResult[0];
					let businessCategory = categoryResult[1];

					if (+businessCategory === +process.env.REACT_APP_ZARELA_BUSINESS_CATEGORY)
						// filter categories and only show Zarela requests
						contract
							.orders(id)
							.then((result) => {
								let requestTemplate = {};
								try {
									requestTemplate = {
										requestID: result[0].toNumber(),
										title: result[1],
										// description: 'test',
										description: result[7],
										requesterAddress: result[2],
										angelTokenPay: convertToBiobit(result[3].toNumber(), false),
										laboratoryTokenPay: convertToBiobit(result[4].toNumber(), false),
										totalTokenPay: convertToBiobit(new BigNumber(result[3].toNumber()).plus(result[4]), false),
										totalContributors: result[5].toNumber(), // total contributors required
										totalContributed: result[5].toNumber() - result[8].toNumber(),
										totalContributorsRemaining: result[8].toNumber(), // total contributors remaining (able to contribute)
										whitePaper: result[6],
										timestamp: result[10].toNumber(),
										categories,
										totalContributedCount: result[9].toNumber(), // no of received signals
										encryptionPublicKey: result[11],
									};
								} catch (error) {
									requestTemplate = {
										requestID: result[0].toNumber(),
										title: result[1],
										description: utils.toUtf8String(error.value, utils.Utf8ErrorFuncs.ignore),
										requesterAddress: result[2],
										angelTokenPay: convertToBiobit(result[3].toNumber(), false),
										laboratoryTokenPay: convertToBiobit(result[4].toNumber(), false),
										totalTokenPay: convertToBiobit(new BigNumber(result[3].toNumber()).plus(result[4]), false),
										totalContributors: result[5].toNumber(), // total contributors required
										totalContributed: result[5].toNumber() - result[8].toNumber(),
										totalContributorsRemaining: result[8].toNumber(), // total contributors remaining (able to contribute)
										whitePaper: result[6],
										timestamp: result[10].toNumber(),
										categories,
										totalContributedCount: result[9].toNumber(), // no of received signals
										encryptionPublicKey: result[11],
									};
								}
								setRequest(requestTemplate);
							})
							.catch((error) => {
								console.error(error.message);
							});
				})
				.catch((error) => {
					console.error(error.message);
				});
		}
	}, [id, contract]);
	
	return (
		<Guide steps={steps}>
			{isMobile ? (
				<Mobile
					{...{
						request,
						error,
						setError,
						zpaperDownloadLink: zpaperDownloadLink ? process.env.REACT_APP_IPFS_GET_LINK + zpaperDownloadLink : null,
					}}
				/>
			) : (
				<Desktop
					{...{
						request,
						error,
						setError,
						zpaperDownloadLink: zpaperDownloadLink ? process.env.REACT_APP_IPFS_GET_LINK + zpaperDownloadLink : null,
					}}
				/>
			)}
		</Guide>
	);
};

export default RequestDetailsPage;
