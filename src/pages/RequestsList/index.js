import React, { useContext, useEffect, useState } from 'react';
import { useDeepCompareEffect } from 'use-deep-compare';
import { useWeb3React } from '@web3-react/core';
import { mainContext } from '../../state';
import { convertToBiobit } from '../../utils';
import Desktop from './Desktop';
import Mobile from './Mobile';
import Guide from './../../components/Guide/Guide';
import { RequestDetailsDesktopSteps, RequestDetailsMobileSteps } from '../../guides';
import BigNumber from 'bignumber.js';
import SearchFilter from '../../components/searchAndFilter/SearchFilter';

const RequestsList = () => {
	const { appState } = useContext(mainContext);
	const { account } = useWeb3React();
	const PAGE_SIZE = 5;
	const [requests, setRequests] = useState({});
	const [requestsCount, setRequestsCount] = useState(0);
	const [dailyContributors, setDailyContributors] = useState(0);
	const [isLoading, setLoading] = useState(true);
	const [currentPage, setCurrentPage] = useState(1);
	const [searchResults, setSearchResults] = useState({
		params: {
			q: '',
			orderBy: 'requestID',
			orderDirection: 'desc',
			bbitFilter: [],
			dateFilter: [],
			nearFinish: false,
			fulfilled: false,
			mostConfirmed: false,
		},
		data: [],
	});

	const applySearch = {
		order: function (orderBy, orderDirection) {
			setSearchResults((config) => ({
				...config,
				params: {
					...config.params,
					orderBy,
					orderDirection,
				},
			}));
		},
		bbitFilter: function (bbitFilter) {
			setSearchResults((config) => ({
				...config,
				params: {
					...config.params,
					bbitFilter,
				},
			}));
		},
		dateFilter: function (dateFilter) {
			setSearchResults((config) => ({
				...config,
				params: {
					...config.params,
					dateFilter,
				},
			}));
		},
		nearFinish: function (nearFinish) {
			setSearchResults((config) => ({
				...config,
				params: {
					...config.params,
					nearFinish,
				},
			}));
		},
		fulfilled: function (fulfilled) {
			setSearchResults((config) => ({
				...config,
				params: {
					...config.params,
					fulfilled,
				},
			}));
		},
		mostConfirmed: function (mostConfirmed) {
			setSearchResults((config) => ({
				...config,
				params: {
					...config.params,
					mostConfirmed,
				},
			}));
		},
		q: function (q) {
			setSearchResults((config) => ({
				...config,
				params: {
					...config.params,
					q,
				},
			}));
		},
		clear: function () {
			setSearchResults(() => ({
				params: {
					q: '',
					orderBy: 'requestID',
					orderDirection: 'desc',
					bbitFilter: [],
					dateFilter: [],
					nearFinish: false,
					fulfilled: false,
					mostConfirmed: false,
				},
				data: [],
			}));
		},
	};
	useDeepCompareEffect(() => {
		try {
			const { q, orderBy, orderDirection, bbitFilter, dateFilter, nearFinish, fulfilled, mostConfirmed } =
				searchResults.params;
			let results = Object.values(requests);

			if (q) {
				if (q !== '' && q.length >= 3) {
					results = results.filter((request) => {
						return request.title.toLowerCase().includes(q.toLowerCase());
					});
				} else {
					throw Error('Search query must be at least 3 characters long');
				}
			}
			if (bbitFilter.length === 2) {
				if (bbitFilter[0] >= 0 && bbitFilter[1] >= 0) {
					results = results.filter((request) => {
						return (
							new BigNumber(request.totalTokenPay).gte(bbitFilter[0]) &&
							new BigNumber(request.totalTokenPay).lte(bbitFilter[1])
						);
					});
				} else {
					throw Error('Invalid BBIT filter');
				}
			}

			if (dateFilter.length === 2) {
				if (dateFilter[0] === dateFilter[1]) {
					results = results.filter((request) => {
						return +request.timestamp >= dateFilter[0] && +request.timestamp <= dateFilter[0] + 86400;
					});
				} else if (dateFilter[0] >= 0 && dateFilter[1] >= 0) {
					results = results.filter((request) => {
						return +request.timestamp >= dateFilter[0] && +request.timestamp <= dateFilter[1];
					});
				} else {
					throw Error('Invalid date filter');
				}
			}

			if (nearFinish) {
				results = results.filter((request) => {
					if (+request.totalContributorsRemaining === 0) return false;
					return Math.floor((+request.totalContributed / +request.totalContributors) * 100) >= 70;
				});
			}

			if (fulfilled) {
				results = results.filter((request) => {
					if (+request.totalContributors === 0) return false;
					return +request.totalContributorsRemaining === 0;
				});
			}

			if (mostConfirmed) {
				results = results.filter((request) => {
					if (+request.totalContributorsRemaining === 0) return false;
					return Math.floor((+request.totalContributed / +request.totalContributedCount) * 100) >= 70;
				});
			}

			if (orderBy) {
				results = results.sort((a, b) => {
					if (orderBy === 'bbit') {
						if (orderDirection === 'asc') {
							return a.totalTokenPay - b.totalTokenPay;
						} else {
							return b.totalTokenPay - a.totalTokenPay;
						}
					} else if (orderBy === 'requestID') {
						if (orderDirection === 'asc') {
							return a.requestID - b.requestID;
						} else {
							return b.requestID - a.requestID;
						}
					} else {
						return 0;
					}
				});
			}
			setSearchResults((config) => {
				return {
					...config,
					data: results,
				};
			});

			setCurrentPage(1);
		} catch (error) {
			console.error(error);
		}
	}, [searchResults, isLoading]);

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
							// filter categories and only show Zarela requests
							appState.contract.methods.orders(i).call((error, result) => {
								if (!error) {
									const requestTemplate = {
										requestID: result[0],
										title: result[1],
										description: result[7],
										requesterAddress: result[2],
										angelTokenPay: convertToBiobit(result[3]),
										laboratoryTokenPay: convertToBiobit(result[4]),
										totalTokenPay: convertToBiobit(new BigNumber(result[3]).plus(result[4])),
										totalContributors: result[5], // total contributors required
										totalContributed: +result[5] - +result[8],
										totalContributorsRemaining: result[8], // total contributors remaining (able to contribute)
										whitePaper: result[6],
										timestamp: result[10],
										categories,
										totalContributedCount: result[9], // no of received signals
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

	return (
		<Guide steps={appState.isMobile ? RequestDetailsMobileSteps : RequestDetailsDesktopSteps} isLoading={isLoading}>
			{appState.isMobile ? (
				<Mobile
					{...{
						requests: searchResults.data,
						appState,
						isLoading,
						PAGE_SIZE,
						currentPage,
						setCurrentPage,
						searchBox: <SearchFilter {...{ requests, applySearch, searchResults }} />,
					}}
				/>
			) : (
				<Desktop
					{...{
						requests: searchResults.data,
						appState,
						account,
						dailyContributors,
						PAGE_SIZE,
						isLoading,
						currentPage,
						setCurrentPage,
						searchBox: <SearchFilter {...{ requests, applySearch, searchResults }} />,
					}}
				/>
			)}
		</Guide>
	);
};

export default RequestsList;
