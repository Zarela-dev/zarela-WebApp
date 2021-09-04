// here's a dictionary for Zarela smart contracts methods

export function getInput(input) {
	const inputInitials = input.substr(0, 10);

	switch (inputInitials) {
		case '0xad968dcd':
			return 'Zarela Gift';
		case '0x1402b3bd':
			return 'Contribute';
		case '0x7aa3829c':
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

export function getStatusColor(StatusText) {
	const statusTextInitials = StatusText;

	switch (statusTextInitials) {
		case 'Zarela Gift':
			return '#AA4586';
		case 'Contribute':
			return '#B6EEA6';
		case 'Create Request':
			return '#C0B298';
		case 'BBit transfer':
			return '#B6EEA6';
		case 'Transaction Failed':
			return '#9046CF';
		case 'Confirmation':
			return '#FDE12D';
		case 'ETH transfer':
			return '#F487B6';
		default:
			return '#fff';
	}
}
