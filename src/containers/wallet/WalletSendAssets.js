import styled from 'styled-components';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useHistory } from 'react-router';
import { TokenList, Token } from './WalletAccount/AccountChoices';
import { Content, Column } from './WalletAccount/Layout';
import biobitIcon from '../../assets/icons/biobit-black.svg';
import etherIcon from '../../assets/icons/ether-black.png';
import Textfield from './../../components/Elements/TextField';
import { toast } from '../../utils';
import { BodyText } from './../../components/Elements/Typography';
import { ThemeButton } from './../../components/Elements/Button';
import { ThemeIcon } from './../../components/Elements/Icon';
import { useStore } from '../../state/store';
import { getConnectorHooks } from '../../utils/getConnectorHooks';
import { utils } from 'ethers';
import { BigNumber } from '@ethersproject/bignumber';

const WalletInput = styled(Textfield)`
	min-width: ${(props) => (props.isMobile === true ? '100%' : '510px')};
	margin-bottom: ${(props) => props.theme.spacing(4)};
`;

const Wrapper = styled.form`
	width: ${(props) => (props.isMobile ? 'unset' : '510px')};
	padding: ${(props) => (props.isMobile ? '18px' : '')};
`;

/* #todo #fancy if the requested amount is more than user balance, give error */
const WalletSendAssets = (mobile) => {
	const { isMobile, contract, activeConnector, biobitBalance, ethBalance } = useStore();
	const { useProvider, useAccount } = getConnectorHooks(activeConnector);
	const provider = useProvider();
	const account = useAccount();

	const history = useHistory();
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
				contract.methods
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
				provider
					.sendTransaction({
						to: values.address,
						from: account,
						value: /* fallbackWeb3Instance.utils.toWei(values.amount, 'ether'), */ utils.formatUnits(
							BigNumber.from(values.amount),
							'ether'
						),
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
		return `Available: ${formik.values.token === 'Biobit' ? +biobitBalance : +ethBalance} ${
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
		<Wrapper onSubmit={formik.handleSubmit} isMobile={isMobile}>
			<Content>
				<Column>
					<BodyText variant="small" mb={3}>
						Choose Token
					</BodyText>
					<TokenList>
						<Token onClick={() => formik.setFieldValue('token', 'Biobit')}>
							<ThemeIcon variant={['small', 'big']} src={biobitIcon} />
							<BodyText
								color={formik.values.token === 'Biobit' ? 'primary' : 'textPrimary'}
								variant="small"
								fontWeight="semiBold"
							>
								BBit
							</BodyText>
						</Token>
						<Token onClick={() => formik.setFieldValue('token', 'Ethereum')}>
							<ThemeIcon variant={['small', 'big']} src={etherIcon} />
							<BodyText
								color={formik.values.token === 'Ethereum' ? 'primary' : 'textPrimary'}
								variant="small"
								fontWeight="semiBold"
							>
								Ethereum
							</BodyText>
						</Token>
					</TokenList>
					<WalletInput
						isMobile={isMobile}
						label={"Recipient's Address"}
						placeholder={"Please enter the Recipient's address"}
						adornment={navigator.clipboard && navigator.clipboard?.readText ? 'Paste' : null} // #todo
						adornmentOnClick={() => {
							getClipboard();
						}}
						coloredAdornment
						onChange={(e) => formik.setFieldValue('address', e.target.value)}
						name="address"
						value={formik.values.address}
						error={formik.errors?.address}
					/>
					<WalletInput
						isMobile={isMobile}
						label={'Amount'}
						placeholder={'Enter amount'}
						hint={getBalanceHint()} // will change based on token chosen
						coloredAdornment
						actions={[
							{
								content: 'Max',
								onClick: async () => {
									const value = formik.values.token === 'Biobit' ? +biobitBalance : +ethBalance;
									await formik.setFieldValue('amount', value);
								},
							},
						]}
						onChange={(e) => formik.setFieldValue('amount', e.target.value)}
						name="amount"
						value={formik.values.amount}
						error={formik.errors?.amount}
					/>
					{isMobile ? (
						<ThemeButton
							variant="primary"
							size="normal"
							type="submit"
							m="auto"
							disabled={!formik.isValid && !formik.isSubmitting && !formik.pristine}
						>
							Send
						</ThemeButton>
					) : (
						<ThemeButton
							variant="primary"
							size="normal"
							type="submit"
							disabled={!formik.isValid && !formik.isSubmitting && !formik.pristine}
						>
							Send
						</ThemeButton>
					)}
				</Column>
			</Content>
		</Wrapper>
	);
};

export default WalletSendAssets;
