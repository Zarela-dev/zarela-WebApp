import React from 'react';

export function timeSince(rawDate) {
	if (typeof data === undefined) {
		return 'loading';
	}
	var date = new Date((Math.floor(+rawDate * 1000))).getTime();
	var seconds = Math.floor((new Date() - date) / 1000);

	var interval = seconds / 31536000;

	if (interval > 1) {
		return new Date(date).toUTCString();
	}
	interval = seconds / 2592000;
	if (interval > 1) {
		return new Date(date).toUTCString();
	}
	interval = seconds / 86400;
	if (interval > 1) {
		return new Date(date).toUTCString();
	}
	interval = seconds / 3600;
	if (interval > 1) {
		return Math.floor(interval) + " hours ago";
	}
	interval = seconds / 60;
	if (interval > 1) {
		return Math.floor(interval) + " minutes ago";
	}
	return Math.floor(seconds) + " seconds ago";
}

export const convertToBiobit = (value) => {
	if (typeof value === undefined)
		return 'Invalid value';
	return scientificToDecimal(+value / Math.pow(10, 9));
};

// https://gist.github.com/jiggzson/b5f489af9ad931e3d186
export const scientificToDecimal = function (num) {
	var nsign = Math.sign(num);
	//remove the sign
	num = Math.abs(num);
	//if the number is in scientific notation remove it
	if (/\d+\.?\d*e[\+\-]*\d+/i.test(num)) {
		var zero = '0',
			parts = String(num).toLowerCase().split('e'), //split into coeff and exponent
			e = parts.pop(), //store the exponential part
			l = Math.abs(e), //get the number of zeros
			sign = e / l,
			coeff_array = parts[0].split('.');
		if (sign === -1) {
			l = l - coeff_array[0].length;
			if (l < 0) {
				num = coeff_array[0].slice(0, l) + '.' + coeff_array[0].slice(l) + (coeff_array.length === 2 ? coeff_array[1] : '');
			}
			else {
				num = zero + '.' + new Array(l + 1).join(zero) + coeff_array.join('');
			}
		}
		else {
			var dec = coeff_array[1];
			if (dec)
				l = l - dec.length;
			if (l < 0) {
				num = coeff_array[0] + dec.slice(0, l) + '.' + dec.slice(l);
			} else {
				num = coeff_array.join('') + new Array(l + 1).join(zero);
			}
		}
	}

	return nsign < 0 ? '-' + num : num;
};

export const CopyableText = ({ children, textToCopy, ...rest }) => {
	return React.cloneElement(children, {
		onClick: () => {
			navigator.clipboard.writeText(textToCopy);
			console.log('hash copied', textToCopy);
			// show notification 
		},
		...rest
	});
};