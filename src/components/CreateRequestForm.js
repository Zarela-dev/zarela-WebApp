import React, { useState } from 'react';
import styled from 'styled-components';
import FileInput from './UploadFileCard/FileInput';
import Checkbox from './Elements/Checkbox';
import Button from './Elements/Button';
import TextField, { Error } from './Elements/TextField';
import ReactSelect from './ReactSelect';

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

	return (
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
					}
				}}
			/>
			<CustomCheckbox
				checked={formik.values.terms}
				name="terms"
				onChange={(e) => formik.setFieldValue('terms', e.target.checked)}
			>
				Your request won’t be able to be edited, make sure every data you added is correct and final.
			</CustomCheckbox>
			{formik.errors?.terms ? <Error>{formik.errors?.terms}</Error> : null}
			<Divider />
			<SubmitButton variant="primary" disabled={!formik.dirty || formik.isSubmitting} type="submit">
				Submit
			</SubmitButton>
		</Form>
	);
});

export default CreateRequestForm;
