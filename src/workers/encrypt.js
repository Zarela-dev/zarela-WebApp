import { Buffer } from 'buffer';
import { create } from 'ipfs-http-client';
import chacha from 'chacha20';

export const initEncrypt = () => {
	onmessage = function (event) {
		const { AES_IV, AES_KEY, file } = event.data;
		const ipfs = create(process.env.REACT_APP_IPFS); // Connect to IPFS

		const reader = new FileReader();

		reader.readAsArrayBuffer(file); // Read Provided File

		reader.onloadend = async function () {
			const buff = Buffer(reader.result); // Convert data into buffer

			const encryptedFile = chacha.encrypt(AES_IV, AES_KEY, buff);

			postMessage({ type: 'feedback', message: 'uploading file to IPFS' });
			const fileResponse = await ipfs.add(encryptedFile, { pin: true });
			postMessage({ type: 'encryption', ipfs_path: fileResponse.path });
		};
	};
};
