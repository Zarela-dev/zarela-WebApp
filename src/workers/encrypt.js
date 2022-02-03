import { Buffer } from 'buffer';
import { create } from 'ipfs-http-client';
import chacha from 'chacha20';

export const encrypt = (KEY, NONCE, file) => {
	const fileSize = file.size;
	const fileName = file.name;
	const lastDot = fileName.lastIndexOf('.');
	const fileTitle = fileName.substring(0, lastDot);
	const fileExt = fileName.substring(lastDot + 1);
	const mimeType = file.type;
	const ipfs = create(process.env.REACT_APP_IPFS); // Connect to IPFS

	return new Promise((resolve, reject) => {
		try {
			const reader = new FileReader();
			reader.readAsArrayBuffer(file); // Read Provided File

			postMessage({ type: 'encrypt:feedback', fileName: file.name, status: 'encrypting' });
			reader.onloadend = async function () {
				const buff = Buffer(reader.result); // Convert data into buffer

				const encryptedFile = chacha.encrypt(KEY, NONCE, buff);
				postMessage({ type: 'encrypt:feedback', fileName: file.name, status: 'uploading' });
				const fileResponse = await ipfs.add(encryptedFile, {
					pin: false,
					cidVersion: 1,
					progress: (uploaded) => {
						const uploadedPercent = Math.ceil((uploaded / fileSize) * 100);
						postMessage({
							type: 'encryption:feedback',
							message: `uploading file to IPFS - ${uploadedPercent}%`,
						});
					},
				});
				postMessage({ type: 'encrypt:feedback', fileName: file.name, status: 'done' });
				resolve({
					fileContentCID: fileResponse.path,
					fileMeta: {
						FILE_EXT: fileExt,
						FILE_NAME: fileTitle,
						FILE_MIMETYPE: mimeType,
					},
				});
			};
		} catch (uploadError) {
			postMessage({ type: 'encrypt:feedback', fileName: file.name, status: 'failed' });

			reject({
				error: uploadError,
			});
		}
	});
};
