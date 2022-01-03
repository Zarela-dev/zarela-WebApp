import React, { useEffect, useContext, useState } from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import { mainContext } from '../../state';
import { useWeb3React } from '@web3-react/core';
import { Card, Box } from 'rebass';
import { BodyText, Header } from '../../components/Elements/Typography';
import MultisendDropzone from '../../components/MultisendDropzone';
import convertCSV from 'convert-csv-to-json';
import { ThemeButton } from '../../components/Elements/Button';
import BigNumber from 'bignumber.js';
import styled from 'styled-components';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { toast } from '../../utils';
import Spinner from '../../components/Spinner';
import { CircularProgress } from '@mui/material';

const StyledTabList = styled(TabList)`
	border: 1px solid #eaeaea;
	box-sizing: border-box;
	border-radius: 12px;
	display: flex;
	flex-wrap: nowrap;
	padding: ${(props) => props.theme.space[1]}px;
`;

const StyledTab = styled(Tab)`
	height: 48px;
	border-radius: 8px;
	flex: 1;
	padding-top: ${(props) => props.theme.space[3]}px;
	color: ${(props) => props.theme.colors.textPrimary};
	text-align: center;

	&.is-selected {
		color: ${(props) => props.theme.colors.textLabel};
		background: #332c3f;
	}
`;
const StyledTabPanel = styled(TabPanel)`
	margin-top: ${(props) => props.theme.space[3]}px;
`;

const TextArea = styled.textarea`
	background: #ffffff;
	box-shadow: 0px 4px 20px rgba(52, 52, 52, 0.15);
	border-radius: 16px;
	width: 100%;
	line-height: 2;
	padding: ${(props) => props.theme.space[3]}px;
`;

const MultiSendPage = () => {
	const [fileNames, setFileNames] = useState([]);
	const [data, setData] = useState([]);
	const { appState } = useContext(mainContext);
	const [manualInput, setManualInput] = useState('');
	const { account } = useWeb3React();
	const [method, setMethod] = useState('file');
	const [sendable, setSendable] = useState(false);
	const [stage, setStage] = useState('prepare');
	const [isApproving, setApproving] = useState(false);

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
			// setManualInput( reader.result);
			setData(formatted);
		};

		reader.readAsText(acceptedFiles[0]);
		setFileNames(acceptedFiles.map((file) => file.name));
	};

	return (
		<Box sx={{ width: '720px', margin: '-80px auto 0' }}>
			<Box display={'flex'} mb={4} justifyContent={'center'}>
				<BodyText variant="big" fontWeight={stage === 'prepare' ? 'bold' : 'regular'}>
					Prepare
				</BodyText>
				<Box mx={2} width={160} sx={{ borderBottom: '1px dashed #EAEAEA', position: 'relative', top: '-10px' }} />
				<BodyText variant="big" fontWeight={stage === 'confirm' ? 'bold' : 'regular'}>
					Confirm
				</BodyText>
				<Box mx={2} width={160} sx={{ borderBottom: '1px dashed #EAEAEA', position: 'relative', top: '-10px' }} />
				<BodyText variant="big" fontWeight={stage === 'send' ? 'bold' : 'regular'}>
					Send
				</BodyText>
			</Box>
			<Card
				p={4}
				sx={{
					background: '#FFFFFF',
					boxShadow: '0px 4px 20px rgba(52, 52, 52, 0.15)',
					borderRadius: '16px',
				}}
			>
				{stage === 'prepare' ? (
					<>
						<Header variant="heading4" mb={2}>
							Get Started Here
						</Header>
						<BodyText variant={'big'} mb={5}>
							There are two ways to enter addresses: either upload a file or manually type them in
						</BodyText>
						<Tabs
							onSelect={(value) => {
								setMethod(value ? 'manual' : 'file');
							}}
							selectedTabClassName="is-selected"
						>
							<StyledTabList>
								<StyledTab>Upload</StyledTab>
								<StyledTab>Insert Manually</StyledTab>
							</StyledTabList>
							<StyledTabPanel>
								<MultisendDropzone fileNames={fileNames} handleDrop={handleDrop} />
							</StyledTabPanel>
							<StyledTabPanel>
								<TextArea
									rows="10"
									onChange={(e) => {
										let convertedToCsv = convertCSV
											.fieldDelimiter(',')
											.csvStringToJson(`address,amount\n` + e.target.value);

										setData(convertedToCsv);
										setManualInput(e.target.value);
									}}
									value={manualInput}
								></TextArea>
							</StyledTabPanel>
						</Tabs>
					</>
				) : stage === 'confirm' ? (
					<Box>
						<Table sx={{ minWidth: 650 }} aria-label="simple table">
							<TableHead>
								<TableRow>
									<TableCell>Address</TableCell>
									<TableCell align="right">Amount</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{data.map((row) => (
									<TableRow key={row.address} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
										<TableCell component="th" scope="row">
											{row.address}
										</TableCell>
										<TableCell align="right">{row.amount}</TableCell>
									</TableRow>
								))}
								<TableRow>
									<TableCell component="th" scope="row">
										Total Recipients: {data.length}
									</TableCell>
									<TableCell align="right">
										{`${data
											.map((x) => x.amount)
											.reduce((a, b) => a.plus(new BigNumber(b)), new BigNumber(0))
											.toNumber()} BBIT`}
									</TableCell>
								</TableRow>
							</TableBody>
						</Table>
					</Box>
				) : stage === 'send' ? (
					<>
						<Card
							p={4}
							mb={4}
							sx={{
								background: '#F9F9F9',
								borderRadius: '8px',
							}}
						>
							<BodyText variant={'big'} mb={3} fontWeight="bold">
								Sign an Approve transaction in MetaMask
							</BodyText>
							<BodyText variant={'regular'} mb={3}>
								To send tokens to many recipients from the Multisend smart contract
								<BodyText variant={'regular'}>1. Confirm Approve transaction in MetaMask</BodyText>
								<BodyText variant={'regular'}>2. Wait for the transaction to be mined</BodyText>
								<BodyText variant={'regular'}>3. Press the Confirm button</BodyText>
							</BodyText>
							<Box sx={{ border: '1px solid #D7D7D7', width: '100%' }} my={3} />
							<Box display={'flex'} justifyContent={'flex-end'}>
								<ThemeButton
									variant="primary"
									size={'large'}
									disabled={isApproving === true}
									onClick={() => {
										if (appState.contract !== null) {
											setApproving(true);
											appState.contract.methods
												.approve(
													process.env.REACT_APP_MULTISEND_CONTRACT_ADDRESS,
													data
														.map((x) => x.amount)
														.reduce((a, b) => a.plus(b), new BigNumber(0))
														.toNumber()
												)
												.send({ from: account })
												.then((res) => {
													setSendable(true);
													setApproving(false);
													toast(`Approval Successful`, 'success');
												})
												.catch((err) => {
													console.log(err);
													setApproving(false);
												});
										}
									}}
								>
									{isApproving ? <CircularProgress size={20} /> : 'Approve'}
								</ThemeButton>
							</Box>
						</Card>
						<Card
							p={4}
							sx={{
								background: '#F9F9F9',
								borderRadius: '8px',
							}}
						>
							<BodyText variant={'big'} mb={3} fontWeight="bold">
								Sign a multisend transaction in MetaMask
							</BodyText>
							<BodyText variant={'regular'} mb={3}>
								To send tokens to many recipients from the Multisend smart contract
								<BodyText variant={'regular'}>1. Wait for all transaction to be mined</BodyText>
								<BodyText variant={'regular'}>2. Check transactions on https://ropsten.etherscan.io</BodyText>
								<BodyText variant={'regular'}>3. Press the Send button</BodyText>
							</BodyText>
							<Box sx={{ border: '1px solid #D7D7D7', width: '100%' }} my={3} />
							<Box display={'flex'} justifyContent={'flex-end'}>
								<ThemeButton
									variant="primary"
									size={'large'}
									disabled={sendable === false}
									onClick={() => {
										if (appState.multisendContract !== null) {
											appState.multisendContract.methods
												.MultiSendTokens(
													process.env.REACT_APP_ZARELA_CONTRACT_ADDRESS,
													data.map((x) => x.address),
													data.map((x) => x.toNumber())
												)
												.send({ from: account })
												.then((res) => {
													console.log(res);
												})
												.catch((err) => {
													console.log(err);
												});
										}
									}}
								>
									Send
								</ThemeButton>
							</Box>
						</Card>
					</>
				) : null}
				{/* buttons */}
				<Box mt={4} width={'100%'} display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
					{stage === 'prepare' ? (
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
					) : stage === 'confirm' ? (
						<>
							<ThemeButton
								variant={'secondary'}
								size="large"
								onClick={() => {
									if (stage === 'confirm') {
										setStage('prepare');
									}
								}}
							>
								Back
							</ThemeButton>
							<ThemeButton
								variant={'primary'}
								size="large"
								onClick={() => {
									if (stage === 'confirm') {
										setStage('send');
									}
								}}
							>
								Next
							</ThemeButton>
						</>
					) : stage === 'send' ? (
						<>
							<ThemeButton
								variant={'secondary'}
								size="large"
								onClick={() => {
									if (stage === 'send') {
										setStage('confirm');
									}
								}}
							>
								Back
							</ThemeButton>
						</>
					) : null}
				</Box>
			</Card>
		</Box>
	);
};

export default MultiSendPage;
