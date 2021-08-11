export function ZRNG() {
	const array = new Uint8Array(16);
	return window.crypto.getRandomValues(array).map((item) => item.toString(16));
}
