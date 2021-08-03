import React, { useContext } from "react";
import styled from "styled-components";
import { mainContext } from "../../state";
import {
	Title,
	TokenList,
	TokenButton,
	TokenIcon,
	TokenName,
	Token,
} from "./WalletDeposit/DepositChoices";
import { Content, Row, Column } from "./WalletDeposit/Layout";
import biobitIcon from "../../assets/icons/biobit-black.svg";
import etherIcon from "../../assets/icons/ether-black.png";
import Textfield from "./../../components/Elements/TextField";
import Button from "./../../components/Elements/Button";
import copyImage from "../../assets/icons/copy.svg";
import {
	CopyableText,
	scientificToDecimal,
	toast,
	convertToBiobit,
} from "../../utils";
import { useFormik } from "formik";
import * as yup from "yup";
import { useHistory } from "react-router";
import { useWeb3React } from "@web3-react/core";

const WalletInput = styled(Textfield)`
	min-width: ${(props) => (props.isMobile === true ? "100%" : "510px")};
	margin-bottom: ${(props) => props.theme.spacing(4)};
`;

const CopyIcon = styled.img``;

const SendButton = styled(Button)`
	align-self: flex-end;
	margin: 0;
`;

const SendButtonMobile = styled(SendButton)`
	margin: auto;
	height: 35px;
	width: 135px;
	border-radius: 3px;
	font-size: 14px;
	padding: 0;

	buttun {
		font-size: 5px;
		color: red;
	}
`;

const Wrapper = styled.form`
	width: ${props => props.mobile ? 'unset' : '510px'};
	padding: ${props => props.mobile ? '18px' : ''};
`;

/* #todo #fancy if the requested amount is more than user balance, give error */
const WalletSendAssets = (mobile) => {

	const { appState } = useContext(mainContext);
	const history = useHistory();
	const { account } = useWeb3React();
	const formik = useFormik({
		initialValues: {
			token: "Biobit",
			address: "",
			amount: "",
		},
		validationSchema: yup.object().shape({
			token: yup.string().required("token type can not be blank"),
			address: yup.string().required("recipient address can not be empty"),
			amount: yup.string().required("token amount can not be empty"),
		}),
		onSubmit: (values) => {
			if (values.token === "Biobit") {
				appState.contract.methods
					.transfer(values.address, +values.amount * Math.pow(10, 9))
					.send({ from: account }, (error, result) => {
						if (!error) {
							toast(result, "success", true, result);
							history.push("/wallet/transactions");
							//#todo create the tab based routes
						} else {
							toast(error.message, "error");
						}
					});
			} else {
				appState.fallbackWeb3Instance.eth
					.sendTransaction({
						to: values.address,
						from: account,
						value: appState.fallbackWeb3Instance.utils.toWei(
							values.amount,
							"ether"
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
		return `Available: ${
			formik.values.token === "Biobit"
				? convertToBiobit(+appState.biobitBalance)
				: +appState.etherBalance
		} ${formik.values.token === "Biobit" ? "BBIT" : "ETH"}`;
	};

	return (
		<Wrapper mobile={mobile} onSubmit={formik.handleSubmit}>
			<Content>
				<Column>
					<Title>Choose Token</Title>
					<TokenList>
						<Token
							active={formik.values.token === "Biobit"}
							onClick={() => formik.setFieldValue("token", "Biobit")}
						>
							<TokenIcon src={biobitIcon} />
							<TokenName>BBit</TokenName>
						</Token>
						<Token
							active={formik.values.token === "Ethereum"}
							onClick={() => formik.setFieldValue("token", "Ethereum")}
						>
							<TokenIcon src={etherIcon} />
							<TokenName>Ethereum</TokenName>
						</Token>
					</TokenList>
					<WalletInput
						isMobile={appState.isMobile}
						label={"Recipient's Address"}
						placeholder={"Please enter the Recipient's address"}
						adornment={"Paste"} // #todo
						onChange={(e) => formik.setFieldValue("address", e.target.value)}
						name="address"
						value={formik.values.address}
						error={formik.errors?.address}
					/>
					<WalletInput
						isMobile={appState.isMobile}
						label={"Amount"}
						placeholder={"Enter amount"}
						hint={getBalanceHint()} // will change based on token chosen
						actions={[
							{
								content: "Max",
								onClick: async () => {
									const value =
										formik.values.token === "Biobit"
											? convertToBiobit(+appState.biobitBalance)
											: +appState.etherBalance;
									await formik.setFieldValue("amount", value);
								},
							},
						]}
						coloredAdornment
						onChange={(e) => formik.setFieldValue("amount", e.target.value)}
						name="amount"
						value={formik.values.amount}
						error={formik.errors?.amount}
					/>
					{mobile ? (
						<SendButtonMobile
							variant="primary"
							type="submit"
							disabled={
								!formik.isValid && !formik.isSubmitting && !formik.pristine
							}
						>
							Send
						</SendButtonMobile>
					) : (
						<SendButton
							variant="primary"
							type="submit"
							disabled={
								!formik.isValid && !formik.isSubmitting && !formik.pristine
							}
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
