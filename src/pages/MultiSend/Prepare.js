import React from 'react';
import { BodyText, Header, LinkText } from '../../components/Elements/Typography';
import styled from 'styled-components';
import MultisendDropzone from '../../components/MultisendDropzone';
import convertCSV from 'convert-csv-to-json';
import BigNumber from 'bignumber.js';
import { Box } from 'rebass';
import { toast } from '../../utils';
import { ThemeButton } from '../../components/Elements/Button';

const TextArea = styled.textarea`
	background: #ffffff;
	box-shadow: 0px 4px 20px rgba(52, 52, 52, 0.15);
	border-radius: 16px;
	width: 100%;
	line-height: 2;
	padding: ${(props) => props.theme.space[3]}px;
`;

const Prepare = ({
	data,
	setData,
	fileNames,
	setFileNames,
	manualInput,
	setManualInput,
	method,
	setMethod,
	stage,
	setStage,
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
			// console.log( reader.result)
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
			<TextArea
				rows="10"
				onChange={(e) => {
					let convertedToCsv = convertCSV.fieldDelimiter(',').csvStringToJson(`address,amount\n` + e.target.value);

					setData(convertedToCsv);
					setManualInput(e.target.value);
				}}
				value={manualInput}
			></TextArea>
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
			{/* <Box
				sx={{
					background: '#FFF2F2',
					border: '1px solid #FF5757',
					boxSizing: 'border-box',
					borderRadius: '8px',
					padding: 4,
				}}
			>
				some error
			</Box> */}
			<Box mt={4} display="flex" justifyContent={'flex-end'}>
				<ThemeButton
					variant={'primary'}
					size="large"
					onClick={() => {
						if (stage === 'prepare') {
							if (data.length > 0) {
								setStage('confirm');
							} else {
								toast('Please upload a file or enter addresses manually', 'error');
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
