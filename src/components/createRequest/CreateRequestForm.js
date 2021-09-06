import React, { useState, useContext } from 'react';
import { mainContext } from '../../state';
import styled from 'styled-components';
import FileInput from './../UploadFileCard/FileInput';
import Checkbox from './../Elements/Checkbox';
import Button from './../Elements/Button';
import TextField, { Error } from './../Elements/TextField';
import ReactSelect from './../ReactSelect';
import FeeEstimation from './FeeEstimation';

const FormWrapper = styled.div`
	width: 100%;
	display: flex;
	flex-direction: row;
	align-items: flex-start;
`;

const SubmitButton = styled(Button)`
	width: 190px;
	margin-bottom: ${(props) => props.theme.spacing(4)};
`;

const Form = styled.form`
	max-width: 510px;
	padding-left: ${(props) => props.theme.spacing(2)};
`;

const Divider = styled.div`
	width: 100%;
	background: rgba(144, 144, 144, 0.3);
	border-radius: 24px;
	height: 3px;
	margin: ${(props) => props.theme.spacing(5)} 0 ${(props) => props.theme.spacing(6)};
`;

const CustomCheckbox = styled(Checkbox)`
	margin-top: ${(props) => props.theme.spacing(2)};
`;

const options = [
	{ value: 'EEG', label: 'EEG' },
	{ value: 'ECG', label: 'ECG' },
	{ value: 'EMG', label: 'EMG' },
	{ value: 'EOG ', label: 'EOG' },
	{ value: 'ERG', label: 'ERG' },
	{ value: 'EGG', label: 'EGG' },
	{ value: 'GSR', label: 'GSR' },
];

const CreateRequestForm = React.forwardRef(({ children, formik }, ref) => {
	const [selectedOption, setSelectedOption] = useState([]);
	const [estimateEthFee, setEstimateEthFee] = useState(null);
	const [gas, setGas] = useState(null);
	const { appState } = useContext(mainContext);

	const estimateFeeHandler = (target, values) => {
		let gas = +appState.gas.average / 10; //Gwei
		setGas(gas);
		const { title, desc, angelTokenPay, laboratoryTokenPay, instanceCount, category } = values;
		let SeedString = [
			title,
			desc,
			// ipfsResponse.path,
			+angelTokenPay * Math.pow(10, 9), // angel
			+laboratoryTokenPay * Math.pow(10, 9), // laboratory
			instanceCount,
			category.map((item) => item.value).join(','),
			process.env.REACT_APP_ZARELA_BUSINESS_CATEGORY,
			// encryptionPublicKey,
		].join('');
		function ConvertStringToHex(str) {
			var arr = [];
			for (var i = 0; i < str.length; i++) {
				arr[i] = str.charCodeAt(i).toString(16);
			}
			return arr.join('');
		}
		let zeros = 0;
		function ZeroCounter(strHex) {
			let total = strHex.length;
			for (var i = 0; i < strHex.length; i++) {
				if (strHex[i] == 0) {
					zeros = zeros + 1;
				}
			}
			return [total, zeros, total - zeros];
		}
		var HexString = ConvertStringToHex(SeedString);
		const HexInfo = ZeroCounter(HexString);
		let gaslimit = 21000 + HexInfo[0] * 270;
		let ethFee = (gaslimit * gas) / 1000000000;
		return Number(ethFee);
		// setEstimateEthFee(Number(ethFee));
	};

	return (
		<FormWrapper>
			<Form onSubmit={formik.handleSubmit}>
				{children}
				<TextField
					placeholder={'write main topics in your study'}
					label="Title *"
					type="text"
					name={'title'}
					error={formik.errors?.title}
					value={formik.values.title}
					onChange={(e) => {
						formik.setFieldValue('title', e.target.value);
						setEstimateEthFee(estimateFeeHandler(e.target.value, formik.values));
					}}
				/>
				<TextField
					placeholder={'What’s your study about?'}
					multiline
					label="Description *"
					type="text"
					name={'desc'}
					error={formik.errors?.desc}
					value={formik.values.desc}
					onChange={(e) => {
						formik.setFieldValue('desc', e.target.value);
						setEstimateEthFee(estimateFeeHandler(e.target.value, formik.values));
					}}
				/>
				<TextField
					placeholder={'How many BBits will you pay for each contributor?'}
					label="Allocated BBits For Angels*"
					type="text"
					name={'angelTokenPay'}
					error={formik.errors?.angelTokenPay}
					value={formik.values.angelTokenPay}
					onChange={(e) => {
						formik.setFieldValue('angelTokenPay', e.target.value);
						setEstimateEthFee(estimateFeeHandler(e.target.value, formik.values));
					}}
				/>
				<TextField
					placeholder={'How many BBits will you pay for each laboratory?'}
					label="Allocated BBits For laboratories*"
					type="text"
					name={'laboratoryTokenPay'}
					error={formik.errors?.laboratoryTokenPay}
					value={formik.values.laboratoryTokenPay}
					onChange={(e) => {
						formik.setFieldValue('laboratoryTokenPay', e.target.value);
						setEstimateEthFee(estimateFeeHandler(e.target.value, formik.values));
					}}
				/>
				<TextField
					placeholder={'How many people do you need to done the study?'}
					label="Contributors *"
					type="text"
					name={'instanceCount'}
					error={formik.errors?.instanceCount}
					value={formik.values.instanceCount}
					onChange={(e) => {
						formik.setFieldValue('instanceCount', e.target.value);
						setEstimateEthFee(estimateFeeHandler(e.target.value, formik.values));
					}}
				/>
				<ReactSelect
					classNamePrefix="Select"
					placeholder="Choose the category of your project from the box"
					label="Category"
					options={options}
					onChange={(e) => {
						formik.setFieldValue('category', e);
						setSelectedOption(e);
						setEstimateEthFee(estimateFeeHandler(e, formik.values));
					}}
					error={formik.errors?.category}
					onKeyDown={(e) => {
						if (e.key === 'Enter') {
							setSelectedOption([...selectedOption, { value: e.target.value, label: e.target.value }]);
							formik.setFieldValue('category', [
								...selectedOption,
								{ value: e.target.value, label: e.target.value },
							]);
						}
					}}
					isMulti
					value={selectedOption}
				/>

				<FileInput
					hasBorder={false}
					showSelected
					buttonLabel="Select Files"
					label={'Upload your Zpaper here'}
					ref={ref}
					name={'zpaper'}
					error={formik.errors?.zpaper}
					value={formik.values.zpaper}
					onChange={(e) => {
						formik.setFieldValue('zpaper', e.target.value);
						if (e.target.value !== '' && e.target.value !== null) {
							formik.setFieldError('zpaper', null);
							formik.setSubmitting(false);
							setEstimateEthFee(estimateFeeHandler(e.target.value, formik.values));
						}
					}}
				/>
				<CustomCheckbox
					checked={formik.values.terms}
					name="terms"
					onChange={(e) => {
						formik.setFieldValue('terms', e.target.checked);
						setEstimateEthFee(estimateFeeHandler(e.target.checked, formik.values));
					}}
				>
					Your request won’t be able to be edited, make sure every data you added is correct and final.
				</CustomCheckbox>
				{formik.errors?.terms ? <Error>{formik.errors?.terms}</Error> : null}
				<Divider />
				<SubmitButton variant="primary" disabled={!formik.dirty || formik.isSubmitting} type="submit">
					Submit
				</SubmitButton>
			</Form>
			<FeeEstimation gas={gas} fee={estimateEthFee} />
		</FormWrapper>
	);
});

export default CreateRequestForm;
