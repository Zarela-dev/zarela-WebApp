import React, { useEffect, useContext } from 'react';
import { toast as originalToast } from 'react-toastify';
import styled from 'styled-components';
import checkedBoxImage from '../assets/icons/checked-box.svg';
import alertImage from '../assets/icons/alert.svg';
import copyImageGreen from '../assets/icons/copy-green.svg';
import copyImageRed from '../assets/icons/copy-red.svg';
import closeImageGreen from '../assets/icons/close-green.svg';
import closeImageRed from '../assets/icons/close-red.svg';
import { Spacer } from '../components/Elements/Spacer';
import { CopyableText } from './CopyableText';
import { actionTypes, mainContext } from '../state';

const Container = styled.div`
	display: flex;
	align-items: center;
	height: 100%;
	padding: ${(props) =>
		props.usage === 'notify'
			? props.theme.spacing(0.5)
			: props.theme.spacing(2)};
`;

const ToastMessage = styled.div`
	font-weight: 500;
	font-size: 16px;
	line-height: 18px;
	color: ${(props) => props.theme.textPrimary};
	margin: 0 ${(props) => props.theme.spacing(1)};
	margin-right: ${(props) =>
		props.usage === 'notify' ? '0 !important' : 'unset'};
	white-space: ${(props) => (props.isHash ? 'nowrap' : 'normal')};
	overflow: hidden;
	text-overflow: ellipsis;
`;

const Icon = styled.img`
	width: 24px;
`;

const NotifySuccess = styled.div`
	min-width: 20px;
	min-height: 20px;
	display: flex;
	background-color: rgba(58, 222, 163, 1);
	border-radius: 10px;
	justify-content: center;
	align-items: center;
`;

const Message = ({
	text,
	copyable,
	textToCopy,
	closeToast,
	toastProps,
	usage = 'toastify',
}) => {
	const { appState, dispatch } = useContext(mainContext);

	useEffect(() => {
		if (usage === 'notify') {
			dispatch({
				type: actionTypes.SET_NOTIFICATION_COUNT,
				payload: +appState.notificationCount + 1,
			});
		}
	}, [text]);
	return (
		<Container usage={usage}>
			{usage === 'notify' ? (
				toastProps.type === 'success' ? (
					null
					// <NotifySuccess>3</NotifySuccess>
				) : (
					<Icon src={alertImage} />
				)
			) : (
				<Icon
					src={toastProps.type === 'success' ? checkedBoxImage : alertImage}
				/>
			)}
			<ToastMessage isHash={copyable} usage={usage}>
				{text}
			</ToastMessage>
			<Spacer />
			{copyable ? (
				<CopyableText textToCopy={textToCopy}>
					<Icon
						src={toastProps.type === 'success' ? copyImageGreen : copyImageRed}
					/>
				</CopyableText>
			) : null}
			{usage === 'notify' ? null : (
				<Icon
					onClick={closeToast}
					src={toastProps.type === 'success' ? closeImageGreen : closeImageRed}
				/>
			)}
		</Container>
	);
};

export const toast = (
	message,
	variant = 'info',
	copyable,
	textToCopy /*  = message */,
	toastOptions = {}
) => {
	return originalToast(
		<Message text={message} copyable={copyable} textToCopy={textToCopy} />,
		{
			position: originalToast.POSITION.BOTTOM_CENTER,
			containerId: 'toastify',
			pauseOnHover: true,
			pauseOnFocusLoss: true,
			closeOnClick: false,
			draggable: true,
			closeButton: false,
			autoClose: 5 * 1000,
			draggablePercent: 20,
			type: variant,
			...toastOptions,
		}
	);
};

export const log = (
	message,
	variant = 'info',
	copyable,
	textToCopy /*  = message */,
	toastOptions = {}
) => {
	return originalToast(
		<Message
			text={message}
			copyable={copyable}
			textToCopy={textToCopy}
			usage='notify'
		/>,
		{
			position: originalToast.POSITION.TOP_RIGHT,
			containerId: 'notify',
			pauseOnHover: true,
			pauseOnFocusLoss: true,
			closeOnClick: false,
			draggable: false,
			closeButton: false,
			autoClose: false,
			draggablePercent: 20,
			type: variant,
			...toastOptions,
		}
	);
};
