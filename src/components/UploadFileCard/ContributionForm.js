import React, { useState } from 'react';
import { SmallCheckbox } from '../Elements/Checkbox';
import TextField from '../Elements/TextField';
import Button, { ThemeButton } from '../Elements/Button';
import ConnectDialog from '../Dialog/ConnectDialog';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useWeb3React } from '@web3-react/core';
import styled from 'styled-components';
import { CustomFileInput } from './FileCard';
import backIcon from '../../assets/icons/left-arrow.svg';
import angelIcon from '../../assets/icons/angel.png';
import hubIcon from '../../assets/icons/hub.png';
import angelIconActive from '../../assets/icons/angel-active.png';
import hubIconActive from '../../assets/icons/hub-active.png';

const ModalBackIcon = styled.img`
	position: absolute;
	top: 26px;
	left: 26px;
	cursor: pointer;
	width: 10px;
`;

const ButtonWrapper = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	margin-top: ${(props) => props.theme.spacing(2)};
`;

const RewardGainerWrapper = styled.section`
	display: flex;
	flex-wrap: nowrap;
	justify-content: center;
`;

const RewardGainerIcon = styled.img`
	height: 60px;
`;

const RewardGainerLabel = styled.p`
	font-weight: bold;
	font-size: 16px;
	font-weight: ${(props) => (props.active ? 700 : 400)};
	color: ${(props) => (props.active ? '#D13ADE' : props.theme.textPrimary)};
	margin-top: ${(props) => props.theme.spacing(2)};
`;

const RewardGainerItem = styled.div`
	flex: 0 0 120px;
`;

const ContinueButton = styled(ThemeButton)`
	margin: 0;
`;

const Box = styled.div`
	display: ${(props) => (props.show ? 'block' : 'none')};
`;
const Form = styled.form``;

const RewardGainerDescription = styled.p`
	color: #212121;
	margin: 4px auto 19px auto;
	font-size: 18px;
	font-weight: bold;
	width: 60%;

	@media (max-width: 767px) {
		width: 80%;
	}
`;

const ContributionForm = React.forwardRef(({ submitSignal, fileInputProps }, ref) => {
	const addressRegex = new RegExp(/^0x[a-fA-F0-9]{40}$/);
	const { account } = useWeb3React();
	const [showConnectDialog, setConnectDialogVisibility] = useState(false);

	const formik = useFormik({
		initialValues: {
			step: 1,
			file: '',
			angelAddress: '',
			hasHub: false,
			hubAddress: '',
			rewardGainer: 'angel',
		},
		validationSchema: yup.object().shape({
			step: yup.string(),
			file: yup.string().required('you must select a file to upload'),
			angelAddress: yup.string().when('step', {
				is: true,
				then: yup
					.string()
					.matches(addressRegex, 'wrong Ethereum address')
					.required('this filed can not be empty'),
				otherwise: yup.string().nullable(),
			}),
			hasHub: yup.boolean().nullable(),
			hubAddress: yup.string().when('hasHub', {
				is: true,
				then: yup
					.string()
					.matches(addressRegex, 'wrong Ethereum address')
					.required('this filed can not be empty'),
				otherwise: yup.string().nullable(),
			}),
			rewardGainer: yup.string().when('hubAddress', {
				is: true,
				then: yup.string().required('you must choose'),
			}),
		}),
		onSubmit: (values) => {
			if (!account) {
				setConnectDialogVisibility(true);
			} else {
				setConnectDialogVisibility(false);
				const { angelAddress, hasHub, hubAddress, rewardGainer, step } = values;
				if (step == 1) {
					if (ref.current?.files?.length > 0) {
						formik.setFieldValue('step', 2);
					} else {
						formik.setFieldError('file', 'you must select a file to upload');
					}
				} else if (step == 2) {
					if (hasHub) {
						if (
							angelAddress.toLowerCase() === account.toLowerCase() ||
							hubAddress.toLowerCase() === account.toLowerCase()
						)
							formik.setFieldValue('step', 3);
						else formik.setFieldError('angelAddress', 'your connected account must be either hub or angel');
					} else {
						if (angelAddress.toLowerCase() === account.toLowerCase())
							submitSignal(angelAddress, angelAddress, rewardGainer);
						else formik.setFieldError('angelAddress', "you need to enter your connected account's address");
					}
				} else if (step == 3) {
					if (
						angelAddress.toLowerCase() === account.toLowerCase() ||
						hubAddress.toLowerCase() === account.toLowerCase()
					)
						submitSignal(angelAddress, hubAddress, rewardGainer);
					else formik.setFieldError('angelAddress', 'your connected account must be either hub or angel');
				} else {
					return;
				}
			}
		},
	});

	return (
		<Form onSubmit={formik.handleSubmit}>
			<ConnectDialog isOpen={!account && showConnectDialog} onClose={() => setConnectDialogVisibility(false)} />

			<input type="hidden" name={'step'} value={formik.values.step} />
			{formik.values.step > 1 && (
				<ModalBackIcon src={backIcon} onClick={() => formik.setFieldValue('step', formik.values.step - 1)} />
			)}
			<Box show={formik.values.step == 1}>
				<CustomFileInput
					ref={ref}
					{...fileInputProps}
					hasBorder
					disableUpload={false}
					label={'select your file here'}
					fileSizeLimit="*File size must be smaller than 95MB"
					buttonLabel="select file"
					name="file"
					error={formik.errors.file}
					onChange={() => formik.setFieldValue('file', ref.current.value)}
				/>
			</Box>
			<Box show={formik.values.step == 2}>
				<TextField
					placeholder={'Angel Address'}
					label="Enter Angel Address"
					type="text"
					name={'angelAddress'}
					error={formik.errors?.angelAddress}
					value={formik.values.angelAddress}
					onChange={(e) => {
						formik.setFieldValue('angelAddress', e.target.value);
					}}
				/>
				<SmallCheckbox
					checked={formik.values.hasHub}
					name="hasHub"
					onChange={(e) => {
						formik.setFieldValue('hasHub', e.target.checked);
					}}
				>
					There is a hub engaged with this request?
				</SmallCheckbox>
			</Box>
			<Box show={formik.values.step == 2 && formik.values.hasHub}>
				<TextField
					placeholder={'Hub Address'}
					hasTopMargin
					label="Enter Hub Address"
					type="text"
					name={'hubAddress'}
					error={formik.errors?.hubAddress}
					value={formik.values.hubAddress}
					onChange={(e) => {
						formik.setFieldValue('hubAddress', e.target.value);
					}}
				/>
			</Box>
			<Box show={formik.values.step == 3}>
				<RewardGainerDescription>Which contributor would you like to gain the reward?</RewardGainerDescription>
				<RewardGainerWrapper>
					<RewardGainerItem
						active={formik.values.rewardGainer === 'angel'}
						onClick={() => formik.setFieldValue('rewardGainer', 'angel')}
					>
						{formik.values.rewardGainer === 'angel' ? (
							<>
								<RewardGainerIcon src={angelIconActive} />
								<RewardGainerLabel active>Angel</RewardGainerLabel>
							</>
						) : (
							<>
								<RewardGainerIcon src={angelIcon} />
								<RewardGainerLabel>Angel</RewardGainerLabel>
							</>
						)}
					</RewardGainerItem>
					<RewardGainerItem
						active={formik.values.rewardGainer === 'hub'}
						onClick={() => formik.setFieldValue('rewardGainer', 'hub')}
					>
						{formik.values.rewardGainer === 'hub' ? (
							<>
								<RewardGainerIcon src={hubIconActive} />
								<RewardGainerLabel active>Hub</RewardGainerLabel>
							</>
						) : (
							<>
								<RewardGainerIcon src={hubIcon} />
								<RewardGainerLabel>Hub</RewardGainerLabel>
							</>
						)}
					</RewardGainerItem>
				</RewardGainerWrapper>
			</Box>
			<ButtonWrapper>
				<ContinueButton size='medium' type="submit" variant="secondary">
					Continue
				</ContinueButton>
			</ButtonWrapper>
		</Form>
	);
});

export default ContributionForm;
