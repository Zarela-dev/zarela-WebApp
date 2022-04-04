import React, { /*  useContext,  */ useCallback, useEffect, useState } from 'react';
import { useDeepCompareEffect } from 'use-deep-compare';
// import { useWeb3React } from '@web3-react/core';
// import { mainContext } from '../../state';
import { convertToBiobit } from '../../utils';
import Desktop from './Desktop';
import Mobile from './Mobile';
import Guide from './../../components/Guide/Guide';
import { RequestDetailsDesktopSteps, RequestDetailsMobileSteps } from '../../guides';
import BigNumber from 'bignumber.js';
import SearchFilter from '../../components/searchAndFilter/SearchFilter';
import isEqual from 'lodash/isEqual';
import { useStore } from '../../state/store';
import { utils } from 'ethers';

const RequestsList = () => {
	// const { appState } = useContext(mainContext);
	// const { account } = useWeb3React();
	const { contract, isMobile } = useStore();
	const PAGE_SIZE = 5;
	const [requests, setRequests] = useState({});
	const [requestsCount, setRequestsCount] = useState(0);
	const [dailyContributors, setDailyContributors] = useState(0);
	const [isLoading, setLoading] = useState(true);
	const [currentPage, setCurrentPage] = useState(1);
	const defaultFilters = {
		q: '',
		orderBy: 'requestID',
		orderDirection: 'desc',
		bbitFilter: [],
		dateFilter: [],
		nearFinish: false,
		fulfilled: false,
		mostConfirmed: false,
	};

	const [searchResults, setSearchResults] = useState({
		params: defaultFilters,
		hasActiveFilters: false,
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
					fulfilled: 'All',
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

			if (fulfilled === 'Fulfilled') {
				results = results.filter((request) => {
					if (+request.totalContributors === 0) return false;
					return +request.totalContributorsRemaining === 0;
				});
			} else if (fulfilled === 'Avalible') {
				results = results.filter((request) => {
					if (+request.totalContributors === 0) return false;
					return +request.totalContributorsRemaining !== 0;
				});
			} else {
				// when all is selected result are not filtered
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
					hasActiveFilters: !isEqual(defaultFilters, searchResults.params),
					data: results,
				};
			});

			setCurrentPage(1);
		} catch (error) {
			console.error(error);
		}
	}, [searchResults, isLoading]);

	useEffect(() => {
		if (contract !== null) {
			contract
				.orderSize()
				.then((result) => {
					setRequestsCount(result.toNumber());
				})
				.catch((error) => {
					console.log(error);
				});

			for (let i = 0; i < requestsCount; i++) {
				contract
					.Categories(i)
					.then((catsResult) => {
						let categories = catsResult[0];
						let businessCategory = catsResult[1].toNumber();

						if (+businessCategory === +process.env.REACT_APP_ZARELA_BUSINESS_CATEGORY) {
							// filter categories and only show Zarela requests
							contract
								.orders(i)
								.then((orderResult) => {
									let requestTemplate = {};
									try {
										requestTemplate = {
											requestID: orderResult[0].toNumber(),
											title: orderResult[1],
											// description: 'test',
											description: orderResult[7].toString(),
											requesterAddress: orderResult[2],
											angelTokenPay: convertToBiobit(orderResult[3].toNumber(), false),
											laboratoryTokenPay: convertToBiobit(orderResult[4].toNumber(), false),
											totalTokenPay: convertToBiobit(
												new BigNumber(orderResult[3].toNumber()).plus(orderResult[4]),
												false
											),
											totalContributors: orderResult[5].toNumber(), // total contributors required
											totalContributed: orderResult[5].toNumber() - orderResult[8].toNumber(),
											totalContributorsRemaining: orderResult[8].toNumber(), // total contributors remaining (able to contribute)
											whitePaper: orderResult[6],
											timestamp: orderResult[10].toNumber(),
											categories,
											totalContributedCount: orderResult[9].toNumber(), // no of received signals
										};
									} catch (error) {
										requestTemplate = {
											requestID: orderResult[0].toNumber(),
											title: orderResult[1],
											description: utils.toUtf8String(error.value, utils.Utf8ErrorFuncs.ignore),
											requesterAddress: orderResult[2],
											angelTokenPay: convertToBiobit(orderResult[3].toNumber(), false),
											laboratoryTokenPay: convertToBiobit(orderResult[4].toNumber(), false),
											totalTokenPay: convertToBiobit(
												new BigNumber(orderResult[3].toNumber()).plus(orderResult[4]),
												false
											),
											totalContributors: orderResult[5].toNumber(), // total contributors required
											totalContributed: orderResult[5].toNumber() - orderResult[8].toNumber(),
											totalContributorsRemaining: orderResult[8].toNumber(), // total contributors remaining (able to contribute)
											whitePaper: orderResult[6],
											timestamp: orderResult[10].toNumber(),
											categories,
											totalContributedCount: orderResult[9].toNumber(), // no of received signals
										};
										console.error(error);
									}
									setRequests((requests) => ({
										...requests,
										[requestTemplate.requestID]: requestTemplate,
									}));
									if (i === +requestsCount - 1) setLoading(false);
								})
								.catch((error) => {
									console.error(error.message);
								});
						}
					})
					.catch((error) => {
						console.error(error.message);
					});
			}
		}
	}, [contract, requestsCount]);

	useEffect(() => {
		if (contract) {
			contract
				.todayContributionsCount()
				.then((result) => {
					setDailyContributors(result);
				})
				.catch((error) => {
					console.error(error.message);
				});
		}
	}, [contract]);

	return (
		<Guide steps={isMobile ? RequestDetailsMobileSteps : RequestDetailsDesktopSteps} isLoading={isLoading}>
			{isMobile ? (
				<Mobile
					{...{
						requests: searchResults.data,
						isLoading,
						PAGE_SIZE,
						currentPage,
						setCurrentPage,
						// searchBox: <SearchFilter {...{ requests, applySearch, searchResults }} />,
					}}
				/>
			) : (
				<Desktop
					{...{
						requests: searchResults.data,
						dailyContributors,
						PAGE_SIZE,
						isLoading,
						currentPage,
						setCurrentPage,
						// searchBox: <SearchFilter {...{ requests, applySearch, searchResults }} />,
					}}
				/>
			)}
		</Guide>
	);
};

export default RequestsList;
