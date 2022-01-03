import React, { useEffect, useState } from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import { Card, Box } from 'rebass';
import { Typography } from '../../components/Elements/Typography';
import { useParams } from 'react-router-dom';
import MultisendDropzone from '../../components/MultisendDropzone';
import convertCSV from 'convert-csv-to-json';
import { ThemeButton } from '../../components/Elements/Button';

const MultiSendPage = () => {
	const params = useParams();
	const [fileNames, setFileNames] = useState([]);
	const [data, setData] = useState([]);
	const [manualInput, setManualInput] = useState('');
	const handleDrop = (acceptedFiles) => {
		const reader = new FileReader();

		reader.onload = (e) => {
			console.log(reader.result);
			const converted = convertCSV.fieldDelimiter(',').csvStringToJson(`address,amount\n` + reader.result);
			setData(converted);
		};

		reader.readAsText(acceptedFiles[0]);

		setFileNames(acceptedFiles.map((file) => file.name));
	};

	useEffect(() => {
		setData([]);
	}, [params]);

	useEffect(() => {
		console.log('ad', data);
	}, [data]);

	return (
		<Box>
			<Box display={'flex'}>
				<Typography weight={params?.stage === 'prepare' ? 'bold' : 'regular'}>Prepare</Typography>
				<Typography weight={params?.stage === 'confirm' ? 'bold' : 'regular'}>Confirm</Typography>
				<Typography weight={params?.stage === 'send' ? 'bold' : 'regular'}>Send</Typography>
			</Box>
			<Card>
				<Typography>Get Started Here</Typography>
				<Typography>There are two ways to enter addresses: either upload a file or manually type them in</Typography>
				<Tabs>
					<TabList>
						<Tab>Upload</Tab>
						<Tab>Insert Manually</Tab>
					</TabList>
					<TabPanel>
						<MultisendDropzone fileNames={fileNames} handleDrop={handleDrop} />
					</TabPanel>
					<TabPanel>
						<textarea onChange={(e) => setManualInput(e.target.value)} value={manualInput}></textarea>
					</TabPanel>
				</Tabs>
				<ThemeButton
					variant={'primary'}
					onClick={() => {
						const converted = convertCSV.fieldDelimiter(',').csvStringToJson(`address,amount\n` + manualInput);
						setData(converted);
					}}
				>
					Next
				</ThemeButton>
			</Card>
		</Box>
	);
};

export default MultiSendPage;
