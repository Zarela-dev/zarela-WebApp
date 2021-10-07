import { Buffer } from 'buffer';
import { create } from 'ipfs-http-client';
import chacha from 'chacha20';

export const initEncrypt = () => {
	onmessage = function (event) {
		const { KEY, NONCE, file } = event.data;
		const fileSize = file.size;
		const ipfs = create(process.env.REACT_APP_IPFS); // Connect to IPFS

		try {
			const reader = new FileReader();
			reader.readAsArrayBuffer(file); // Read Provided File
			
			reader.onloadend = async function () {
				const buff = Buffer(reader.result); // Convert data into buffer

				const encryptedFile = chacha.encrypt(KEY, NONCE, buff);
				postMessage({ type: 'encryption:feedback', message: 'uploading file to IPFS' });
				const fileResponse = await ipfs.add(encryptedFile, {
					pin: true,
					progress: (uploaded) => {
						const uploadedPercent = Math.ceil((uploaded / fileSize) * 100);
						postMessage({
							type: 'encryption:feedback',
							message: `uploading file to IPFS - ${uploadedPercent}%`,
						});
					},
				});
				postMessage({ type: 'encryption', ipfs_path: fileResponse.path });
				postMessage({ type: 'terminate' });
			};
		} catch (uploadError) {
			postMessage({ type: 'encryption:error', error: uploadError });
			postMessage({ type: 'terminate' });
		}
	};
};
