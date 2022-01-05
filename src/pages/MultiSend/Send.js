import React, { useEffect, useState } from 'react';
import { Card, Box, Image } from 'rebass';
import { BodyText, Header } from '../../components/Elements/Typography';
import { ThemeButton } from '../../components/Elements/Button';
import BigNumber from 'bignumber.js';
import { toast } from '../../utils';
import { CircularProgress } from '@mui/material';
import successfulMultisend from '../../assets/icons/successful-multisend.svg';

const Send = ({ stage, setStage, appState, data, account, DECIMALS, txHash, setTxHash }) => {
	const [isApproving, setIsApproving] = useState(true);
	const [hasAllowance, setAllowance] = useState(false);
	const [isSending, setSending] = useState(false);

	useEffect(() => {
		if (appState.contract !== null) {
			appState.contract.methods
				.allowance(account, process.env.REACT_APP_MULTISEND_CONTRACT_ADDRESS)
				.call({ from: account })
				.then((allowance) => {
					if (
						new BigNumber(allowance).gte(
							data.reduce((acc, curr) => acc.plus(new BigNumber(curr.amount).multipliedBy(DECIMALS)), new BigNumber(0))
						)
					) {
						setAllowance(true);
						setIsApproving(false);
					} else {
						setIsApproving(false);
						setAllowance(false);
					}
				});
		}
	}, [appState.contract]);

	return (
		<Box>
			{txHash === null ? (
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
								disabled={
									(hasAllowance === false && isApproving !== false) || isApproving === true || hasAllowance === true
								}
								onClick={() => {
									if (appState.contract !== null) {
										setIsApproving(true);
										appState.contract.methods
											.approve(
												process.env.REACT_APP_MULTISEND_CONTRACT_ADDRESS,
												data
													.map((x) => x.amount)
													.reduce((a, b) => a.plus(b), new BigNumber(0))
													.multipliedBy(1000000000)
													.toNumber()
											)
											.send({ from: account })
											.then((res) => {
												setIsApproving(false);
												setAllowance(true);
												toast(`Approval Successful`, 'success');
											})
											.catch((err) => {
												console.error(err);
												setIsApproving(false);
												setAllowance(false);
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
								disabled={hasAllowance === false || isSending === true}
								onClick={() => {
									if (appState.multisendContract !== null) {
										setSending(true);
										appState.multisendContract.methods
											.MultiSendTokens(
												process.env.REACT_APP_ZARELA_CONTRACT_ADDRESS,
												data.map((x) => x.address),
												data.map((x) => new BigNumber(x.amount).multipliedBy(DECIMALS).toNumber())
											)
											.send({ from: account })
											.then((res) => {
												if (res.status === true) {
													setTxHash(res.transactionHash);
												}
											})
											.catch((err) => {
												setTxHash(null);
												console.error(err);
											})
											.finally(() => {
												setSending(false);
											});
									}
								}}
							>
								{isSending ? <CircularProgress size={20} /> : 'Send'}
							</ThemeButton>
						</Box>
					</Card>
					<Box mt={4} display="flex" justifyContent={'flex-start'}>
						<ThemeButton
							variant={'secondary'}
							disabled={isSending === true}
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
			) : (
				<Box display="flex" flexDirection="column" justifyContent={'center'} alignItems={'center'}>
					<Box>
						<Image src={successfulMultisend} />
					</Box>
					<Header variant="heading5" mb={2}>
						Transaction completed successfully
					</Header>
					<Card
						p={3}
						mt={3}
						sx={{
							background: '#F9F9F9',
							borderRadius: '8px',
							display: 'flex',
							flexWrap: 'wrap',
							alignItems: 'center',
							justifyContent: 'center',
							width: '100%',
						}}
					>
						<BodyText variant={'hint'} fontWeight="bold">
							{`Transaction hash: ${txHash}`}
						</BodyText>
						<BodyText
							variant="hint"
							mt={3}
							as="a"
							target="_blank"
							href={
								process.env.REACT_APP_IS_TEST_NET
									? `https://ropsten.etherscan.io/tx/${txHash}`
									: `https://etherscan.io/tx/${txHash}`
							}
						>
							View on Etherscan
						</BodyText>
					</Card>
					<ThemeButton mt={4} variant="primary" size="large" onClick={() => window.location.reload()}>
						start over
					</ThemeButton>
				</Box>
			)}
		</Box>
	);
};

export default Send;
