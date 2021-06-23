import React, { useContext } from 'react';
import styled from 'styled-components';
import { web3Context } from '../web3Provider';
import {
	Title, TokenList, TokenButton, TokenIcon, TokenName, Token
} from './WalletDeposit/DepositChoices';
import { Content, Row, Column } from './WalletDeposit/Layout';
import biobitIcon from '../assets/icons/biobit-black.svg';
import etherIcon from '../assets/icons/ether-black.png';
import Textfield from './Elements/TextField';
import Button from './Elements/Button';
import copyImage from '../assets/icons/copy.svg';
import { CopyableText, scientificToDecimal, toast, convertToBiobit } from '../utils';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useHistory } from 'react-router';


const WalletInput = styled(Textfield)`
	min-width: 510px;
	margin-bottom: ${props => props.theme.spacing(4)}
`;

const CopyIcon = styled.img`

`;

const WithdrawButton = styled(Button)`
	align-self: flex-end;
    margin: 0;
`;

const Wrapper = styled.form`
	width: 510px;
`;

/* #todo #fancy if the requested amount is more than user balance, give error */
const WalletWithdraw = () => {
	const { Web3 } = useContext(web3Context);
	const history = useHistory();
	const formik = useFormik({
		initialValues: {
			token: 'Biobit',
			address: '',
			amount: ''
		},
		validationSchema: yup.object().shape({
			token: yup.string().required('token type can not be blank'),
			address: yup.string().required('recipient address can not be empty'),
			amount: yup.string().required('token amount can not be empty')
		}),
		onSubmit: (values) => {
			if (values.token === 'Biobit') {
				Web3.contract.methods.transfer(values.address, +values.amount * Math.pow(10, 9))
					.send({ from: Web3.accounts[0] }, (error, result) => {
						if (!error) {
							toast(result, 'success', true, result);
							history.push('/wallet/transactions');
							//#todo create the tab based routes
						}
						else {
							toast(error.message, 'error');
						}
					});
				Web3.contract.events.Transfer({})
					.on('data', (event) => {
						toast(
							`${event.returnValues[2]} tokens were successfully sent to ${event.returnValues[1]}.`,
							'success',
							false,
							null,
							{
								toastId: event.id
							}
						);
					})
					.on('error', (error, receipt) => {
						toast(error.message, 'error');
						console.error(error, receipt);
					});
			} else {
				Web3.web3.eth.sendTransaction({ to: values.address, from: Web3.accounts[0], value: Web3.web3.utils.toWei(values.amount, "ether") })
					.then(({ transactionHash }) => {
						console.log(transactionHash);
					}).catch(error => {
						console.error(error.message);
					});
			}
		}
	});

	const getBalanceHint = () => {
		console.log(Web3.etherBalance);
		return `Available: ${formik.values.token === 'Biobit' ? convertToBiobit(+Web3.biobitBalance) : +Web3.etherBalance} ${formik.values.token === 'Biobit' ? 'BBIT' : 'ETH'}`;
	};
	console.log(formik);
	return (
		<Wrapper onSubmit={formik.handleSubmit}>
			<Content>
				<Column>
					<Title>
						Choose Token
					</Title>
					<TokenList>
						<Token active={formik.values.token === 'Biobit'} onClick={() => formik.setFieldValue('token', 'Biobit')}>
							<TokenIcon src={biobitIcon} />
							<TokenName>
								Biobit
							</TokenName>
						</Token>
						<Token active={formik.values.token === 'Ethereum'} onClick={() => formik.setFieldValue('token', 'Ethereum')}>
							<TokenIcon src={etherIcon} />
							<TokenName>
								Ethereum
							</TokenName>
						</Token>
					</TokenList>
					<WalletInput
						label={'Recipient\'s Address'}
						placeholder={'Please enter the Recipient\'s address'}
						adornment={'Paste'} // #todo
						onChange={(e) => formik.setFieldValue('address', e.target.value)}
						name='address'
						value={formik.values.address}
						error={formik.errors?.address}
					/>
					<WalletInput
						label={'Amount'}
						placeholder={'Enter amount'}
						hint={getBalanceHint()} // will change based on token chosen
						actions={[
							{
								content: 'Max',
								onClick: async () => {
									const value = formik.values.token === 'Biobit' ? convertToBiobit(+Web3.biobitBalance) : +Web3.etherBalance;
									await formik.setFieldValue('amount', value);
								}
							}
						]}
						coloredAdornment
						onChange={(e) => formik.setFieldValue('amount', e.target.value)}
						name='amount'
						value={formik.values.amount}
						error={formik.errors?.amount}
					/>
					<WithdrawButton variant='primary' type='submit' disabled={!formik.isValid && !formik.isSubmitting && !formik.pristine}>
						Withdraw
					</WithdrawButton>
				</Column>
			</Content>
		</Wrapper>
	);
};

export default WalletWithdraw;
