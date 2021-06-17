import React from 'react';

// https://gist.github.com/jiggzson/b5f489af9ad931e3d186
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