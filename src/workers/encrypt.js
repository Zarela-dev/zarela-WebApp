import { twofish } from 'twofish';
import { Buffer } from 'buffer';
import { create } from 'ipfs-http-client';

export const initEncrypt = () => {
	onmessage = function (event) {
		const { AES_IV, AES_KEY, file } = event.data;
		const ipfs = create(process.env.REACT_APP_IPFS); // Connect to IPFS

		const reader = new FileReader();

		reader.readAsArrayBuffer(file); // Read Provided File

		reader.onloadend = async function () {
			const buff = Buffer(reader.result); // Convert data into buffer

			var twF = twofish(AES_IV),
				encryptedFile = twF.encryptCBC(AES_KEY, buff); /* twF.encryptCBC expects an array */

			postMessage({ type: 'feedback', message: 'uploading file to IPFS' });
			const fileResponse = await ipfs.add(encryptedFile, { pin: true });
			postMessage({ type: 'encryption', ipfs_path: fileResponse.path });
		};
	};
};
