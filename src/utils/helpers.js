export const isValidHex = (Hex) => {
	var re = /[0-9A-Fa-f]{6}/g;

	if (re.test(Hex)) {
		return true;
	} else {
		return false;
	}
};
