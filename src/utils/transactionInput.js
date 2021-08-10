export function getInput(input) {
	const inputInitials = input.substr(0, 10);

	switch (inputInitials) {
		case '0xfcaa65a9':
			return 'Contribute';
		case '0x6a4e177a':
			return 'Create Request';
		case '0xa9059cbb':
			return 'BBit transfer';
		case '0x5743b65d':
			return 'Transaction Failed';
		case '0x1e801cd8':
			return 'Confirmation';
		case '0x':
			return 'ETH transfer';
		default:
			return input.substr(0, 15);
	}
}
