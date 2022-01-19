import BigNumber from 'bignumber.js';

export const convertToBiobit = (value, format = true) => {
	if (typeof value === undefined) return 'Invalid value';

	if (format) return new BigNumber(value).dividedBy(1000000000).toFormat();
	return new BigNumber(value).dividedBy(1000000000).toNumber();
};
