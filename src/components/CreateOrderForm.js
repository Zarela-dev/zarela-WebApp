import React from 'react';
import styled from 'styled-components';
import FileInput from './FileInput';
import Checkbox from './Elements/Checkbox';
import { Button } from './Elements/Button';
import TextField, { Error } from './Elements/TextField';

const SubmitButton = styled.button`
	${Button};
	width: 190px;
	height: 50px;
	margin-bottom: ${props => props.theme.spacing(4)};
	font-size: 20px;
	font-weight: 500;
	color: #252222;
`;

const Divider = styled.div`
	width: 100%;
	background: rgba(144, 144, 144, 0.3);
	border-radius: 24px;
	height: 3px;
	margin: ${props => props.theme.spacing(5)} 0 ${props => props.theme.spacing(6)};
`;

const CreateOrderForm = React.forwardRef(({ children, formik }, ref) => {
	return (
		<form onSubmit={formik.handleSubmit}>
			{children}
			<TextField
				placeholder={'write main topics in your test'}
				label='Title *'
				type='text'
				name={'title'}
				error={formik.errors?.title}
				value={formik.values.title}
				onChange={(e) => {
					formik.setFieldValue('title', e.target.value);
				}}
			/>
			<TextField
				placeholder={'What’s your test about?'}
				multiline
				label='Description *'
				type='text'
				name={'desc'}
				error={formik.errors?.desc}
				value={formik.values.desc}
				onChange={(e) => {
					formik.setFieldValue('desc', e.target.value);
				}}
			/>
			<TextField
				placeholder={'How many biobits will you pay for each contributor?'}
				label='Allocated Biobits *'
				type='text'
				name={'tokenPay'}
				error={formik.errors?.tokenPay}
				value={formik.values.tokenPay}
				onChange={(e) => {
					formik.setFieldValue('tokenPay', e.target.value);
				}}
			/>
			<TextField
				placeholder={'How many people do you need to done the test?'}
				label='Contributors *'
				type='text'
				name={'instanceCount'}
				error={formik.errors?.instanceCount}
				value={formik.values.instanceCount}
				onChange={(e) => {
					formik.setFieldValue('instanceCount', e.target.value);
				}}
			/>
			<TextField
				placeholder={'Write your related hashtags here'}
				label='Hashtags *'
				type='text'
				name={'category'}
				error={formik.errors?.category}
				value={formik.values.category}
				onChange={(e) => {
					formik.setFieldValue('category', e.target.value);
				}}
			/>
			<FileInput
				hasBorder={false}
				showSelected
				buttonLabel='Upload'
				label={'Upload your white paper here'}
				ref={ref}
				name={'whitepaper'}
				error={formik.errors?.whitepaper}
				value={formik.values.whitepaper}
				onChange={(e) => {
					formik.setFieldValue('whitepaper', e.target.value);
				}}
			/>
			<Checkbox checked={formik.values.terms} name='terms' onChange={(e) => formik.setFieldValue('terms', e.target.checked)}>
				Your request won’t be able to be edited, make sure every data you added is correct and final. By marking this box you claim your agreement towards policies.
			</Checkbox>
			{
				formik.errors?.terms ?
					<Error>
						{
							formik.errors?.terms
						}
					</Error>
					: null
			}
			<Divider />
			<SubmitButton type='submit'>
				Submit
			</SubmitButton>
		</form>
	);
});

export default CreateOrderForm;
