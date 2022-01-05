import React from 'react';
import { BodyText, Header, LinkText } from '../../components/Elements/Typography';
import MultisendDropzone from '../../components/MultisendDropzone';
import convertCSV from 'convert-csv-to-json';
import BigNumber from 'bignumber.js';
import { Box } from 'rebass';
import { toast } from '../../utils';
import { ThemeButton } from '../../components/Elements/Button';
import CodeMirror from '@uiw/react-codemirror';
import { isEmpty, validateAddresses, validateAmounts } from './_validations';

const Prepare = ({
	data,
	setData,
	fileNames,
	setFileNames,
	manualInput,
	setManualInput,
	appState,
	setStage,
	errors,
	setErrors,
}) => {
	const handleDrop = (acceptedFiles) => {
		const reader = new FileReader();

		reader.onload = (e) => {
			const convertedToJson = convertCSV.fieldDelimiter(',').csvStringToJson(`address,amount\n` + reader.result);
			let formatted = convertedToJson.map((x) => {
				const amount = new BigNumber(x.amount).toNumber();
				return {
					address: x.address,
					amount: amount,
				};
			});
			setManualInput(reader.result);
			setData(formatted);
		};

		reader.readAsText(acceptedFiles[0]);
		setFileNames(acceptedFiles.map((file) => file.name));
	};

	return (
		<div>
			<Header variant="heading4" mb={2}>
				Get Started Here
			</Header>
			<BodyText variant={'big'} mb={5}>
				There are two ways to enter addresses: either upload a file or manually type them in
			</BodyText>
			<CodeMirror
				value={manualInput}
				height="200px"
				onChange={(value, viewUpdate) => {
					let convertedToCsv = convertCSV.fieldDelimiter(',').csvStringToJson(`address,amount\n` + value);

					setData(convertedToCsv);
					setManualInput(value);
				}}
			/>
			<Box
				my={4}
				sx={{
					display: 'flex',
					flexWrap: 'nowrap',
					alignItems: 'center',
				}}
			>
				<Box flex="2" pr={3}>
					<MultisendDropzone fileNames={fileNames} handleDrop={handleDrop} />
				</Box>
				<Box flex="1">
					<LinkText>Download Example CSV</LinkText>
				</Box>
			</Box>
			{Object.keys(errors).length > 0 ? (
				<Box
					sx={{
						background: '#FFF2F2',
						border: '1px solid #FF5757',
						boxSizing: 'border-box',
						borderRadius: '8px',
						padding: 4,
						'& > div:not(:last-child)': {
							borderBottom: '1px solid #FF5757',
							paddingBottom: 3,
							marginBottom: 3,
						},
					}}
				>
					{errors.duplicateIDS?.length > 0 ? (
						<Box>
							<Header variant="heading6" mb={2}>
								Duplicate Addresses Found:
							</Header>
							<Box display={'flex'} flexDirection={'column'}>
								{errors.duplicateIDS?.map((addressIndex, arrIndex) => (
									<Box key={addressIndex}>
										<BodyText variant="regular">{`${errors?.duplicates[arrIndex]} on line ${addressIndex}`}</BodyText>
									</Box>
								))}
							</Box>
						</Box>
					) : null}
					{errors.invalidIDS?.length > 0 ? (
						<Box>
							<Header variant="heading6" mb={2}>
								Invalid Addresses Found:
							</Header>
							<Box display={'flex'} flexDirection={'column'}>
								{errors.invalidIDS?.map((addressIndex, arrIndex) => (
									<Box key={addressIndex}>
										<BodyText variant="regular">{`${errors?.invalids[arrIndex]} on line ${addressIndex}`}</BodyText>
									</Box>
								))}
							</Box>
						</Box>
					) : null}
					{errors.invalidAmountIDS?.length > 0 ? (
						<Box>
							<Header variant="heading6" mb={2}>
								Invalid Amount Found:
							</Header>
							<Box display={'flex'} flexDirection={'column'}>
								{errors.invalidAmountIDS?.map((addressIndex, arrIndex) => (
									<Box key={addressIndex}>
										<BodyText variant="regular">{`"${errors.invalidAmounts[arrIndex]}" on line ${addressIndex}`}</BodyText>
									</Box>
								))}
							</Box>
						</Box>
					) : null}
					{errors.insufficientFunds === true ? (
						<Box>
							<Header variant="heading6" mb={2}>
								Insufficient Funds
							</Header>
						</Box>
					) : null}
				</Box>
			) : null}
			<Box mt={4} display="flex" justifyContent={'flex-end'}>
				<ThemeButton
					variant={'primary'}
					disabled={isEmpty(data)}
					size="large"
					onClick={() => {
						if (validateAddresses(data, setErrors) === 'valid' && validateAmounts(data, setErrors) === 'valid') {
							let balance = new BigNumber(appState.biobitBalance);
							if (balance.gte(data.reduce((acc, curr) => acc.plus(new BigNumber(curr.amount)), new BigNumber(0)))) {
								setStage('confirm');
							} else {
								setErrors((state) => ({ ...state, insufficientFunds: true }));
							}
						}
					}}
				>
					Next
				</ThemeButton>
			</Box>
		</div>
	);
};

export default Prepare;
