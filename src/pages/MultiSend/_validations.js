import BigNumber from 'bignumber.js';
import Web3Utils from 'web3-utils';

export const validateAddresses = (data, setErrors) => {
	const addresses = data.map((x) => x.address);

	let duplicateIDS = [];
	const duplicates = addresses.filter((x, i) => {
		if (addresses.indexOf(x) !== i) {
			duplicateIDS.push(i + 1);
			return true;
		}
		return false;
	});

	let invalidIDS = [];
	const invalids = addresses.filter((x, index) => {
		if (!Web3Utils.isAddress(x)) {
			invalidIDS.push(index + 1);
			return true;
		}
		return false;
	});

	if (invalids.length > 0 || duplicateIDS.length > 0) {
		setErrors((state) => {
			return {
				...state,
				duplicates,
				invalids,
				duplicateIDS,
				invalidIDS,
			};
		});
		return 'invalid';
	}
	setErrors(() => ({}));
	return 'valid';
};

export const validateAmounts = (data, setErrors) => {
	const DECIMALS = 1000000000;
	const amounts = data.map((x) => x.amount);

	let invalidAmountIDS = [];

	const invalidAmounts = amounts.filter((x, index) => {
		if (isNaN(x) || x.includes('e') || x <= 0 || new BigNumber(x).multipliedBy(DECIMALS).decimalPlaces() > 0) {
			invalidAmountIDS.push(index + 1);
			return true;
		}
		return false;
	});

	if (invalidAmounts.length > 0) {
		setErrors((state) => {
			return {
				...state,
				invalidAmounts,
				invalidAmountIDS,
			};
		});
		return 'invalid';
	}
	setErrors(() => ({}));
	return 'valid';
};

export const isEmpty = (data) => {
	if (Object.keys(data).length === 0) {
		return true;
	}
	return false;
};
