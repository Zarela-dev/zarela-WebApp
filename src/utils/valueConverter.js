import BigNumber from 'bignumber.js';

export const convertToBiobit = (value) => {
	if (typeof value === undefined) return 'Invalid value';
	const res = new BigNumber(value).dividedBy(1000000000).toFormat();
	return res;
};
