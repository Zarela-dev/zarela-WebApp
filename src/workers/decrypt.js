import { Buffer } from 'buffer';
import axios from 'axios';
import chacha from 'chacha20';

export const decrypt = (KEY, NONCE, CID, progress) => {
	return new Promise((resolve, reject) => {
		axios
			.get(`${process.env.REACT_APP_IPFS_GET_LINK + CID}`, {
				responseType: 'blob',
				onDownloadProgress: (progressEvent) => {
					const { loaded, total } = progressEvent;
					let percentCompleted = Math.floor((loaded / total) * 100);
					postMessage({
						type: 'feedback',
						message: `Downloading encrypted file from IPFS ${percentCompleted}% (${progress}) `,
					});
				},
			})
			.then((fileRes) => {
				try {
					var fileReader = new FileReader();

					fileReader.readAsArrayBuffer(fileRes.data);
					postMessage({ type: 'feedback', message: `decrypting file (${progress})` });

					fileReader.onloadend = () => {
						const buffer = Buffer(fileReader.result);
						const decrypted = chacha.decrypt(KEY, NONCE, buffer);
						resolve(decrypted);
					};
				} catch (err) {
					postMessage({ type: 'feedback:error', message: err });
				}
			})
			.catch((err) => {
				reject(err);
			});
	});
};
