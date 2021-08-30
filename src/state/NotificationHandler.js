import { toast, log } from './../utils';

export const NotificationHandler = (appState, from, to) => {
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
				toast(
					`signal submitted on request #${event.returnValues[2]} by: ${event.returnValues[0]}. Difficulty: ${event.returnValues[4]}`,
					'success',
					false,
					null,
					{
						toastId: event.id,
					}
				);
			})
			.on('error', (error, receipt) => {
				// clearSubmitDialog();
				toast(error.message, 'error');
				console.error(error, receipt);
			});
};
