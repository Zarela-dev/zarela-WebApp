import { twofish } from 'twofish';
import { Buffer } from 'buffer';
import axios from 'axios';
import chacha from 'chacha20';

export const initDecrypt = () => {
	onmessage = async function (event) {
		const { AES_KEY, AES_IV, fileHash } = event.data;
		var twF = twofish(Object.values(AES_IV));

		postMessage({ type: 'feedback', message: 'Downloading encrypted file from IPFS' });
		/*
		 in order to remove  the extra headers that IPFS sets on response payload, responseType: blob 
		*/
		const fileRes = await axios.get(`${process.env.REACT_APP_IPFS_LINK + fileHash}`, {
			responseType: 'blob',
			onDownloadProgress: (progressEvent) => {
				const { loaded, total } = progressEvent;
				let percentCompleted = Math.floor((loaded / total) * 100);

				postMessage({
					type: 'feedback',
					message: `Downloading encrypted file from IPFS - ${percentCompleted}%`,
				});
			},
		});
		/* then to convert the blob into array buffer we use FileReader API */
		var fileReader = new FileReader();

		fileReader.readAsArrayBuffer(fileRes.data);
		postMessage({ type: 'feedback', message: 'decrypting file' });

		fileReader.onloadend = () => {
			var buffer = Buffer(fileReader.result);

			const decrypted = chacha.decrypt(AES_IV, AES_KEY, buffer);

			postMessage({ type: 'feedback', message: 'saving file' });
			postMessage({ type: 'decrypted', decrypted_file: decrypted });
			postMessage({ type: 'terminate'});
		};
	};
};
