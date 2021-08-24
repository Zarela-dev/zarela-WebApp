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

const Container = styled.div`
	display: flex;
	align-items: center;
	height: 100%;
	padding: ${(props) => props.theme.spacing(2)};
`;

const ToastMessage = styled.div`
	font-weight: 500;
	font-size: 16px;
	line-height: 18px;
	color: ${(props) => props.theme.textPrimary};
	margin: 0 ${(props) => props.theme.spacing(1)};
	white-space: ${props => props.isHash ? 'nowrap' : 'normal'};
	overflow: hidden;
	text-overflow: ellipsis;
`;

const Icon = styled.img`
	width: 24px;
`;

const Message = ({ text, copyable, textToCopy, closeToast, toastProps }) => {
	return (
		<Container>
			<Icon src={toastProps.type === 'success' ? checkedBoxImage : alertImage} />
			<ToastMessage isHash={copyable}>{text}</ToastMessage>
			<Spacer />
			{copyable ? (
				<CopyableText textToCopy={textToCopy}>
					<Icon src={toastProps.type === 'success' ? copyImageGreen : copyImageRed} />
				</CopyableText>
			) : null}
			<Icon onClick={closeToast} src={toastProps.type === 'success' ? closeImageGreen : closeImageRed} />
		</Container>
	);
};

export const toast = (message, variant = 'info', copyable, textToCopy /*  = message */, toastOptions = {}) => {
	return originalToast(<Message text={message} copyable={copyable} textToCopy={textToCopy} />, {
		position: originalToast.POSITION.BOTTOM_CENTER,
		pauseOnHover: true,
		pauseOnFocusLoss: true,
		closeOnClick: false,
		draggable: true,
		closeButton: false,
		autoClose: 5 * 1000,
		draggablePercent: 20,
		type: variant,
		...toastOptions,
	});
};
