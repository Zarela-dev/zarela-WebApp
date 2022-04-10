export const normalizeAddress = (address) => address && address.toLowerCase();

export const addressClipper = (address) => {
	if(!address) return '';
	const addressClipped = address.slice(0, 6) + '...' + address.slice(-4);
	return addressClipped;
};
