import React from 'react';
import styled from 'styled-components';
import FileInput from './FileInput';
import Checkbox from './Elements/Checkbox';
import { Button } from './Elements/Button';
import TextField from './Elements/TextField';

const SubmitButton = styled.button`
	${Button};
	width: 260px;
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
	margin: ${props => props.theme.spacing(4)}  0;
`;

const CreateOrderForm = React.forwardRef(({onSubmit, formValues, setFormValues}, ref) => {
	return (
		<form onSubmit={onSubmit}>
			<TextField
				placeholder={'write main topics in your test'}
				label='Title *'
				type='text'
				name={'title'}
				value={formValues.title}
				onChange={(e) => {
					setFormValues(values => ({
						...values,
						title: e.target.value
					}));
				}}
			/>
			<TextField
				placeholder={'How many people do you need to done the test?'}
				label='Description *'
				type='text'
				name={'desc'}
				value={formValues.desc}
				onChange={(e) => {
					setFormValues(values => ({
						...values,
						desc: e.target.value
					}));
				}}
			/>
			<TextField
				placeholder={'How many biobits will you pay for each contributor?'}
				label='Allocated Biobits *'
				type='text'
				name={'tokenPay'}
				value={formValues.tokenPay}
				onChange={(e) => {
					setFormValues(values => ({
						...values,
						tokenPay: e.target.value
					}));
				}}
			/>
			<TextField
				placeholder={'What’s your test about?'}
				label='Contributors *'
				type='text'
				name={'instanceCount'}
				value={formValues.instanceCount}
				onChange={(e) => {
					setFormValues(values => ({
						...values,
						instanceCount: e.target.value
					}));
				}}
			/>
			<TextField
				placeholder={'Category'}
				label='Category *'
				type='text'
				name={'category'}
				value={formValues.category}
				onChange={(e) => {
					setFormValues(values => ({
						...values,
						category: e.target.value
					}));
				}}
			/>
			<FileInput
				hasBorder={false}
				showSelected
				buttonLabel='Upload'
				label={'Upload your white paper here'}
				ref={ref}
				name={'whitepaper'}
				value={formValues.whitepaper}
				onChange={(e) => {
					setFormValues(values => ({
						...values,
						whitepaper: e.target.value
					}));
				}}
			/>
			{/* <button type='submit'>
								submit
							</button> */}
			<Divider />
			<Checkbox checked={formValues.agreement} onChange={(e) => setFormValues(data => ({ ...data, agreement: e.target.checked }))}>
				Your request won’t be able to be edited, make sure every data you added is correct and final. By marking this box you claim your agreement towards policies.
			</Checkbox>
			<SubmitButton>
				Submit
			</SubmitButton>
		</form>
	);
});

export default CreateOrderForm;
