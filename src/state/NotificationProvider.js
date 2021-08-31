import React, { useEffect, useContext } from 'react';
import { toast, log } from '../utils';
import { mainContext } from '.';
import { useWeb3React } from '@web3-react/core';

export const NotificationProvider = ({ children }) => {
	const { appState, dispatch } = useContext(mainContext);
	const { account } = useWeb3React();

	useEffect(() => {
		appState.contract !== null &&
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
						event.returnValues[0] === account ||
						event.returnValues[3] === account
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

		appState.contract !== null &&
			appState.contract.events
				.Transfer()
				.on('data', (event) => {
					log(
						`100 BBits were transferred to ${event.returnValues[0]} from Zarela smart contract`,
						'success',
						false,
						null,
						{
							toastId: event.id,
						}
					);
					if (
						event.returnValues[0] === account ||
						event.returnValues[3] === account
					) {
						toast(
							`100 BBits were transferred to ${event.returnValues[0]} from Zarela smart contract`,
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

		appState.contract !== null &&
			appState.contract.events
				.orderRegistered({})
				.on('data', (event) => {
					// clearSubmitDialog();
					log(
						`Transaction #${event.returnValues[1]} has been created successfully.`,
						'success',
						false,
						null,
						{
							toastId: event.id,
						}
					);
					if (
						event.returnValues[0] === account ||
						event.returnValues[3] === account
					) {
						toast(
							`Transaction #${event.returnValues[1]} has been created successfully.`,
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
		appState.contract !== null &&
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
					if (
						event.returnValues[0] === account ||
						event.returnValues[3] === account
					) {
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
	}, [appState.contract]);

	return <>{children}</>;
};
