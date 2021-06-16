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
	return +value / Math.pow(10, 9);
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