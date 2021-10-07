import { useEffect, useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import BigNumber from 'bignumber.js';

const useBiobit = () => {
	const DAI_ADDRESS = '0x6b175474e89094c44da98b954eedeac495271d0f';
	const BBIT_ADDRESS = '0xf67192a8b9f269f23802d9ab94c7875a0abb7aea';
	const [BBIT_USD, setBBIT_USD] = useState(null);
	const PRECISION = 3;
	const INTERVAL = 15 * 1000;
	const {
		error,
		loading,
		data: BBIT_DAI,
	} = useQuery(
		gql`	
			query GetExchangeRates {
					pairs(
						where: {
							token0: "${DAI_ADDRESS}"
							token1: "${BBIT_ADDRESS}"
						}
					) {
						id,
						token0Price,
						token1Price
					}
				}
			`,
		{ pollInterval: INTERVAL }
	);

	useEffect(() => {
		if (loading === false) {
			if (!error) {
				setBBIT_USD(new BigNumber(BBIT_DAI.pairs[0].token0Price));
			}
		}
	}, [BBIT_DAI, loading, error]);

	return (...args) => {
		const BIG_BBIT = args.reduce((acc, curr) => {
			return new BigNumber(acc).plus(new BigNumber(curr));
		}, new BigNumber(0));

		const USD = BIG_BBIT.times(BBIT_USD);
		let BBIT_precision = BIG_BBIT.decimalPlaces()
			? BIG_BBIT.integerValue().toString().length + PRECISION
			: undefined;
		let USD_precision = USD.decimalPlaces() !== 0 ? PRECISION : undefined;

		if (BBIT_USD !== null && !error) return [BIG_BBIT.toPrecision(BBIT_precision), USD.toFixed(USD_precision)];
		return [BIG_BBIT.toPrecision(BBIT_precision), '-'];
	};
};

export default useBiobit;
