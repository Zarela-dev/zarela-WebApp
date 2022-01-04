import React from 'react';
import { Card, Box } from 'rebass';
import { BodyText, Header } from '../../components/Elements/Typography';
import { ThemeButton } from '../../components/Elements/Button';
import BigNumber from 'bignumber.js';
import { toast } from '../../utils';
import { CircularProgress } from '@mui/material';

const Send = ({ stage, setStage, isApproving, setApproving, appState, data, sendable, setSendable, account }) => {
	return (
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
			<Box mt={4} display="flex" justifyContent={'flex-start'}>
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
			</Box>
		</>
	);
};

export default Send;
