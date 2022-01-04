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

	console.log('addresses', addresses);
	console.log('duplicates', duplicates, duplicateIDS);
	console.log('invalids', invalids, invalidIDS);

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
