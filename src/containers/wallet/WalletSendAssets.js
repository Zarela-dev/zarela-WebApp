import React, { useContext } from 'react';
import styled from 'styled-components';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useHistory } from 'react-router';
import { useWeb3React } from '@web3-react/core';
import { mainContext } from '../../state';
import { Title, TokenList, TokenIcon, TokenName, Token } from './WalletAccount/AccountChoices';
import { Content, Column } from './WalletAccount/Layout';
import biobitIcon from '../../assets/icons/biobit-black.svg';
import etherIcon from '../../assets/icons/ether-black.png';
import Textfield from './../../components/Elements/TextField';
import Button from './../../components/Elements/Button';
import { toast } from '../../utils';

const WalletInput = styled(Textfield)`
	min-width: ${(props) => (props.isMobile === true ? '100%' : '510px')};
	margin-bottom: ${(props) => props.theme.spacing(4)};
`;

const SendButton = styled(Button)`
	align-self: center;
	margin: 0;
`;

const SendButtonMobile = styled(Button)`
	margin: auto;
	height: 35px;
	width: 105px;
	border-radius: 3px;

	button {
		padding: 0;
		font-weight: 400;
		font-size: 14px;
	}
`;

const Wrapper = styled.form`
	width: ${(props) => (props.isMobile ? 'unset' : '510px')};
	padding: ${(props) => (props.isMobile ? '18px' : '')};
`;

/* #todo #fancy if the requested amount is more than user balance, give error */
const WalletSendAssets = (mobile) => {
	const { appState } = useContext(mainContext);
	const history = useHistory();
	const { account } = useWeb3React();
	const formik = useFormik({
		initialValues: {
			token: 'Biobit',
			address: '',
			amount: '',
		},
		validationSchema: yup.object().shape({
			token: yup.string().required('token type can not be blank'),
			address: yup.string().required('recipient address can not be empty'),
			amount: yup.string().required('token amount can not be empty'),
		}),
		onSubmit: (values) => {
			if (values.token === 'Biobit') {
				appState.contract.methods
					.transfer(values.address, +values.amount * Math.pow(10, 9))
					.send({ from: account }, (error, result) => {
						if (!error) {
							toast(`TX Hash: ${result}`, 'success', true, result, {
								toastId: result,
							});
							history.push('/wallet/transactions');
							//#todo create the tab based routes
						} else {
							toast(error.message, 'error');
						}
					});
			} else {
				appState.fallbackWeb3Instance.eth
					.sendTransaction({
						to: values.address,
						from: account,
						value: appState.fallbackWeb3Instance.utils.toWei(values.amount, 'ether'),
					})
					.then(({ transactionHash }) => {
						console.log(transactionHash);
					})
					.catch((error) => {
						console.error(error.message);
					});
			}
		},
	});

	const getBalanceHint = () => {
		return `Available: ${formik.values.token === 'Biobit' ? +appState.biobitBalance : +appState.etherBalance} ${
			formik.values.token === 'Biobit' ? 'BBIT' : 'ETH'
		}`;
	};

	const getClipboard = async () => {
		var pasteTarget = document.getElementsByName('address')[0];
		pasteTarget.focus();
		if (navigator.clipboard && navigator.clipboard?.readText)
			document.execCommand('insertText', false, await navigator.clipboard.readText());
	};

	return (
		<Wrapper onSubmit={formik.handleSubmit} isMobile={appState.isMobile}>
			<Content>
				<Column>
					<Title>Choose Token</Title>
					<TokenList>
						<Token
							active={formik.values.token === 'Biobit'}
							onClick={() => formik.setFieldValue('token', 'Biobit')}
						>
							<TokenIcon src={biobitIcon} />
							<TokenName>BBit</TokenName>
						</Token>
						<Token
							active={formik.values.token === 'Ethereum'}
							onClick={() => formik.setFieldValue('token', 'Ethereum')}
						>
							<TokenIcon src={etherIcon} />
							<TokenName>Ethereum</TokenName>
						</Token>
					</TokenList>
					<WalletInput
						isMobile={appState.isMobile}
						label={"Recipient's Address"}
						placeholder={"Please enter the Recipient's address"}
						adornment={navigator.clipboard && navigator.clipboard?.readText ? 'Paste' : null} // #todo
						adornmentOnClick={() => {
							// let test = document.execCommand('paste')
							// console.log('test ', test);
							getClipboard();
						}}
						onChange={(e) => formik.setFieldValue('address', e.target.value)}
						name="address"
						value={formik.values.address}
						error={formik.errors?.address}
					/>
					<WalletInput
						isMobile={appState.isMobile}
						label={'Amount'}
						placeholder={'Enter amount'}
						hint={getBalanceHint()} // will change based on token chosen
						actions={[
							{
								content: 'Max',
								onClick: async () => {
									const value =
										formik.values.token === 'Biobit'
											? +appState.biobitBalance
											: +appState.etherBalance;
									await formik.setFieldValue('amount', value);
								},
							},
						]}
						coloredAdornment
						onChange={(e) => formik.setFieldValue('amount', e.target.value)}
						name="amount"
						value={formik.values.amount}
						error={formik.errors?.amount}
					/>
					{appState.isMobile ? (
						<SendButtonMobile
							variant="primary"
							type="submit"
							disabled={!formik.isValid && !formik.isSubmitting && !formik.pristine}
						>
							Send
						</SendButtonMobile>
					) : (
						<SendButton
							variant="primary"
							type="submit"
							disabled={!formik.isValid && !formik.isSubmitting && !formik.pristine}
						>
							Send
						</SendButton>
					)}
				</Column>
			</Content>
		</Wrapper>
	);
};

export default WalletSendAssets;
