export const arraySymmetricDiff = (arr1, arr2) => {
	return arr1.filter((x) => !arr2.includes(x)).concat(arr2.filter((x) => !arr1.includes(x)));
};
// https://stackoverflow.com/a/33034768
