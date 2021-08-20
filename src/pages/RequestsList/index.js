import React, { useContext, useEffect, useState } from 'react';
import { mainContext } from '../../state';
import { convertToBiobit } from '../../utils';
import { useWeb3React } from '@web3-react/core';
import Desktop from './Desktop';
import Mobile from './Mobile';
// import Splash from '../../components/Splash';
import Guide from './../../components/Guide/Guide';
import { useLocation } from 'react-router';


const DesktopSteps = [
	{
		selector: '[data-tour="request-list-one"]',
		content: 'A Request card contains all information regarding the request.',
	},
	{
		selector: '[data-tour="request-list-two"]',
		content: 'The unique ID assigned to each request.',
	},
	{
		selector: '[data-tour="request-list-three"]',
		content: 'The title given to each request submitted by the mage.',
	},
	{
		selector: '[data-tour="request-list-four"]',
		content:
			'This number indicates the number of BBit tokens that are to be paid by the mage to each angel who sends the	appropriate response.',
	},
	{
		selector: '[data-tour="request-list-five"]',
		content: 'This number indicates the number of approved responses sent by angels.',
	},
	{
		selector: '[data-tour="request-list-six"]',
		content: 'This number indicates the total number of responses sent to this request.',
	},
	{
		selector: '[data-tour="request-list-seven"]',
		content: 'You can click here to see more information about applying and participating.',
	},
	{
		selector: '[data-tour="request-list-eight"]',
		content: 'Clicking on this icon will bookmark selected request.',
	},
	{
		selector: '[data-tour="request-list-nine"]',
		content:
			'This section displays information about the total number of biobit tokens, biobit token name and code and your own Wallet balance.',
	},
	{
		selector: '',
		content:
			'Well done! You earn 100 BBits for this learning! want to earn more? learn every guide on pages and collect about 500 BBits!',
	},
];

const MobileSteps = [
	{
		selector: '[data-tour="request-list-mobile-one"]',
		content: 'A Request card contains all information regarding the request.',
	},
	{
		selector: '[data-tour="request-list-mobile-two"]',
		content: 'The unique ID assigned to each request.',
	},
	{
		selector: '[data-tour="request-list-mobile-three"]',
		content: 'The title given to each request submitted by the mage.',
	},
	{
		selector: '[data-tour="request-list-mobile-four"]',
		content:
			'This number indicates the number of BBit tokens that are to be paid by the mage to each angel who sends the	appropriate response.',
	},
	{
		selector: '[data-tour="request-list-mobile-five"]',
		content: 'This number indicates the number of approved responses sent by angels.',
	},
	{
		selector: '[data-tour="request-list-mobile-six"]',
		content: 'This number indicates the total number of responses sent to this request.',
	},
	{
		selector: '[data-tour="request-list-mobile-seven"]',
		content: 'You can click here to see more information about applying and participating.',
	},
	{
		selector: '',
		content:
			'Well done! You earn 100 BBits for this learning! want to earn more? learn every guide on pages and collect about 500 BBits!',
	},
];



const RequestsList = () => {
	const { appState } = useContext(mainContext);
	const web3React = useWeb3React();
	const PAGE_SIZE = 2;
	const [requests, setRequests] = useState({});
	const [requestsCount, setRequestsCount] = useState(0);
	const [dailyContributors, setDailyContributors] = useState(0);
	const [isLoading, setLoading] = useState(true);

	// pagination hook
	useEffect(() => {
		if (appState.contract !== null) {
			appState.contract.methods.orderSize().call((error, result) => {
				if (!error) {
					setRequestsCount(result);
				} else {
					console.error(error.message);
				}
			});

			for (let i = 0; i < requestsCount; i++) {
				appState.contract.methods.Categories(i).call((error, result) => {
					if (!error) {
						let categories = result[0];
						let businessCategory = result[1];

						if (+businessCategory === +process.env.REACT_APP_ZARELA_BUSINESS_CATEGORY)
							// only show zarela requests
							appState.contract.methods.orders(i).call((error, result) => {
								if (!error) {
									const requestTemplate = {
										requestID: result[0],
										title: result[1],
										description: result[7],
										requesterAddress: result[2],
										angelTokenPay: convertToBiobit(result[3]),
										laboratoryTokenPay: convertToBiobit(result[4]),
										totalContributors: result[5], // total contributors required
										totalContributed: +result[5] - +result[8],
										whitePaper: result[6],
										timestamp: result[10],
										categories,
										totalContributedCount: result[9],
									};
									setRequests((requests) => ({
										...requests,
										[requestTemplate.requestID]: requestTemplate,
									}));
									if (i === +requestsCount - 1) setLoading(false);
								} else {
									console.error(error.message);
								}
							});
					} else {
						console.error(error.message);
					}
				});
			}
		}
	}, [appState.contract, requestsCount]);

	useEffect(() => {
		if (appState.contract) {
			appState.contract.methods.todayContributionsCount().call((error, result) => {
				if (!error) setDailyContributors(result);
				else console.error(error.message);
			});
		}
	}, [appState.contract]);

	const [guideIsOpen, setGuideIsOpen] = useState(true);
	const location = useLocation();

	if (appState.isMobile) {
		return (
			<>
				{isLoading === false && !localStorage.getItem('guide/' + location.pathname.split('/')[1]) ? (
					<Guide isMobile={appState.isMobile} steps={MobileSteps} {...{ guideIsOpen, setGuideIsOpen }} />
				) : null}
				{/* <Splash isVisible={isLoading} /> */}
				<Mobile {...{ requests, isLoading, appState, PAGE_SIZE }} />
			</>
		);
	} else {
		return (
			<>
				{isLoading === false && !localStorage.getItem('guide/' + location.pathname.split('/')[1]) ? (
					<Guide steps={DesktopSteps} {...{ guideIsOpen, setGuideIsOpen }} />
				) : null}
				<Desktop
					{...{
						requests,
						appState,
						web3React,
						dailyContributors,
						PAGE_SIZE,
						isLoading,
					}}
				/>
			</>
		);
	}
};

export default RequestsList;
