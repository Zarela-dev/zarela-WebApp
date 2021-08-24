// in order to generate AES IV and secret key, we use window.crypto API to
// get an array of random numbers random numbers

export function ZRNG() {
	const array = new Uint8Array(16);
	return window.crypto.getRandomValues(array).map((item) => item.toString(16));
}
