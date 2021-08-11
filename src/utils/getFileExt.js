export function getFileNameWithExt(ref) {
	if (!ref) {
		return;
	}

	const name = ref.current.files[0].name;
	const lastDot = name.lastIndexOf('.');

	const fileName = name.substring(0, lastDot);
	const ext = name.substring(lastDot + 1);
	const mimeType = ref.current.files[0].type;

	return [fileName, ext, mimeType];
}
