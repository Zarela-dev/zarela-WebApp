import React, { useEffect, useContext } from 'react';
import { toast, log, normalizeAddress, convertToBiobit } from '../utils';
import { mainContext } from '.';
import { useWeb3React } from '@web3-react/core';

export const NotificationProvider = ({ children }) => {
	const { appState } = useContext(mainContext);
	const { account } = useWeb3React();

	useEffect(() => {
		if (appState.contract !== null) {
			appState.contract.events
				.contributed()
				.on('data', (event) => {
					// clearSubmitDialog();
					/* 
						returnValues[0] contributor
						returnValues[1] laboratory
						returnValues[2] orderId
						returnValues[3] orderOwner
						returnValues[4] difficulty
					*/
					log(
						`signal submitted on request #${event.returnValues[2]} by: ${event.returnValues[0]}. Difficulty: ${event.returnValues[4]}`,
						'success',
						false,
						null,
						{
							toastId: event.id,
						}
					);
					if (
						normalizeAddress(event.returnValues[0]) === normalizeAddress(account) ||
						normalizeAddress(event.returnValues[1]) === normalizeAddress(account)
					) {
						toast(
							`signal submitted on request #${event.returnValues[2]} by: ${event.returnValues[0]}. Difficulty: ${event.returnValues[4]}`,
							'success',
							false,
							null,
							{
								toastId: event.id,
							}
						);
					}
				})
				.on('error', (error, receipt) => {
					// clearSubmitDialog();
					toast(error.message, 'error');
					console.error(error, receipt);
				});

			appState.contract.events
				.Transfer()
				.on('data', (event) => {
					log(
						`${convertToBiobit(+event.returnValues[2])} BBits were transferred to ${
							event.returnValues[1]
						} from ${
							normalizeAddress(event.returnValues[0]) ===
							normalizeAddress(process.env.REACT_APP_ZARELA_CONTRACT_ADDRESS)
								? 'Zarela Smart Contract'
								: event.returnValues[0]
						}`,
						'success',
						false,
						null,
						{
							toastId: event.id,
						}
					);
					if (
						normalizeAddress(event.returnValues[0]) === normalizeAddress(account) ||
						normalizeAddress(event.returnValues[1]) === normalizeAddress(account)
					) {
						toast(
							`${convertToBiobit(+event.returnValues[2])} BBits were transferred to ${
								event.returnValues[1]
							} from ${
								normalizeAddress(event.returnValues[0]) ===
								normalizeAddress(process.env.REACT_APP_ZARELA_CONTRACT_ADDRESS)
									? 'Zarela Smart Contract'
									: event.returnValues[0]
							}`,
							'success',
							false,
							null,
							{
								toastId: event.id,
							}
						);
					}
				})
				.on('error', (error, receipt) => {
					toast(error.message, 'error');
					console.error(error, receipt);
				});
			appState.contract.events
				.orderRegistered({})
				.on('data', (event) => {
					// clearSubmitDialog();
					log(`Request #${event.returnValues[1]} has been created successfully.`, 'success', false, null, {
						toastId: event.id,
					});
					if (normalizeAddress(event.returnValues[0]) === normalizeAddress(account)) {
						toast(
							`Request #${event.returnValues[1]} has been created successfully.`,
							'success',
							false,
							null,
							{
								toastId: event.id,
							}
						);
					}
				})
				.on('error', (error, receipt) => {
					// clearSubmitDialog();
					toast(error.message, 'error');
					console.error(error, receipt);
				});
			appState.contract.events
				.orderFinished({})
				.on('data', (event) => {
					log(`Request #${event.returnValues[0]} has been fulfilled.`, 'success', false, null, {
						toastId: event.id,
					});
					toast(`Request #${event.returnValues[0]} has been fulfilled.`, 'success', false, null, {
						toastId: event.id,
					});
				})
				.on('error', (error, receipt) => {
					toast(error.message, 'error');
					console.error(error, receipt);
				});
			appState.contract.events
				.signalsApproved({})
				.on('data', (event) => {
					/* 
              event.returnValues[0] orderId
              event.returnValues[1]	confirmationsCount
            */
					log(
						`Tokens were successfully released for ${event.returnValues[1]} contributions.`,
						'success',
						false,
						null,
						{
							toastId: event.id,
						}
					);
					if (event.returnValues[0] === account || event.returnValues[3] === account) {
						toast(
							`Tokens were successfully released for ${event.returnValues[1]} contributions.`,
							'success',
							false,
							null,
							{
								toastId: event.id,
							}
						);
					}
					// setShouldRefresh(true);
				})
				.on('error', (error, receipt) => {
					toast(error.message, 'error');
					console.error(error, receipt);
				});
		}
	}, [appState.contract]);

	return <>{children}</>;
};
