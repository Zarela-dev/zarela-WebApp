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
`;

const Divider = styled.div`
	width: 100%;
	background: rgba(144, 144, 144, 0.3);
	border-radius: 24px;
	height: 3px;
	margin: ${(props) => props.theme.spacing(5)} 0 ${(props) => props.theme.spacing(6)};
`;

const options = [
	{ value: 'chocolate1', label: 'Chocolate' },
	{ value: 'strawberry2', label: 'Strawberry' },
	{ value: 'vanilla3', label: 'Vanilla' },
	{ value: 'choc12321sfasate', label: 'Chocolate' },
	{ value: 'stra12321sfaserry', label: 'Strawberry' },
	{ value: 'vani1232fefsfasa', label: 'Vanilla' },
	{ value: 'choc1232fefsfasate', label: 'Chocolate' },
	{ value: 'stra1232fefsfaserry', label: 'Strawberry' },
	{ value: 'vani12321sfasa', label: 'Vanilla' },
	{ value: 'choc12321sfefasate', label: 'Chocolate' },
	{ value: 'stra12321sfefaserry', label: 'Strawberry' },
	{ value: 'vani12321sfefasa', label: 'Vanilla' },
	{ value: 'choc12321sfasate', label: 'Chocolate' },
	{ value: 'stra12321sfesfaserry', label: 'Strawberry' },
	{ value: 'vani12321sfesfasa', label: 'Vanilla' },
];

const CreateRequestForm = React.forwardRef(({ children, formik }, ref) => {
	const [selectedOption, setSelectedOption] = useState([]);
	const [selectInputValue, setSelectInputValue] = useState('');

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
				label="Allocated BBits *"
				type="text"
				name={'tokenPay'}
				error={formik.errors?.tokenPay}
				value={formik.values.tokenPay}
				onChange={(e) => {
					formik.setFieldValue('tokenPay', e.target.value);
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
				options={options}
				onChange={(e) => {
					formik.setFieldValue('category', e);
					setSelectedOption(e);
				}}
				error={formik.errors?.category}
				onKeyDown={(e) => {
					setSelectInputValue('');
					if (e.key === 'Enter') {
						setSelectedOption([
							...selectedOption,
							{ value: e.target.value, label: e.target.value },
						]);
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
			<Checkbox
				checked={formik.values.terms}
				name="terms"
				onChange={(e) => formik.setFieldValue('terms', e.target.checked)}
			>
				Your request won’t be able to be edited, make sure every data you added is correct
				and final. By marking this box you claim your agreement towards policies.
			</Checkbox>
			{formik.errors?.terms ? <Error>{formik.errors?.terms}</Error> : null}
			<Divider />
			<SubmitButton
				variant="primary"
				disabled={!formik.dirty || formik.isSubmitting}
				type="submit"
			>
				Submit
			</SubmitButton>
		</Form>
	);
});

export default CreateRequestForm;
