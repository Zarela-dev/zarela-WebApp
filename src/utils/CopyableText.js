import React from 'react';
import { toast } from './../utils/toast';

function copyToClipboard(text) {
	const elem = document.createElement('textarea');
	elem.value = text;
	document.body.appendChild(elem);
	elem.select();
	document.execCommand('copy');
	document.body.removeChild(elem);
}

// https://gist.github.com/jiggzson/b5f489af9ad931e3d186
export const CopyableText = ({ children, textToCopy, ...rest }) => {
	return React.cloneElement(children, {
		onClick: () => {
			if (navigator.clipboard !== undefined) {
				navigator.clipboard.writeText(textToCopy);
			} else {
				copyToClipboard(textToCopy);
			}
			console.log('hash copied', textToCopy);
			// show notification
			toast(`Copied to clipboard: ${textToCopy}`, 'success', false, textToCopy);
		},
		...rest,
	});
};
