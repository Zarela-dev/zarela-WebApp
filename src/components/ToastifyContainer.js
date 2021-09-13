import styled from 'styled-components';
import { ToastContainer } from 'react-toastify';

const CustomContainer = styled(ToastContainer)`
	width: ${(props) => (props.containerId === 'notify' && !props.isMobile ? '270px' : '')};
	@media only screen and (min-width: ${(props) => props.theme.tablet_sm_breakpoint}) {
		width: ${(props) => (props.containerId === 'notify' ? '96%' : '750px')};
		top: ${(props) => (props.containerId === 'notify' ? '124px' : 'unset')};
	}
	@media only screen and (max-width: ${(props) => props.theme.tablet_sm_breakpoint}) {
		width: ${(props) => (props.containerId === 'notify' ? '100%' : '90vw')};
		transform: translateX(-50%);
		left: 50%;
		top: ${(props) => (props.containerId === 'notify' ? '125px' : 'unset')};
	}

	& .Toastify__toast {
		padding: 0;
		margin-bottom: ${(props) => props.theme.spacing(1)};
		top: ${(props) => (props.containerId !== 'notify' ? '0' : props.isMobile ? '0' : '0')};
		right: ${(props) => (props.containerId === 'notify' ? '-20px' : 'unset')};
		height: fit-content;
		width: calc(100% - 20px);
	}
	@media only screen and (max-width: ${(props) => props.theme.tablet_sm_breakpoint}) {
		& .Toastify__toast {
			min-height: 45px;
		}
	}
	@media only screen and (min-width: ${(props) => props.theme.tablet_sm_breakpoint}) {
		& .Toastify__toast {
			height: fit-content;
		}
	}

	.Toastify__toast--success {
		background: ${(props) =>
			props.containerId === 'notify' ? 'rgba(232, 250, 246, 1)' : 'rgba(79, 207, 161, 0.7)'};
		border: ${(props) => (props.containerId === 'notify' ? 'none' : '1px solid #1d8a7f')};
		box-shadow: ${(props) => (props.containerId === 'notify' ? 'none !important' : '	')};
		box-sizing: border-box;
		border-radius: ${(props) => (props.containerId === 'notify' ? '9px 0 0 9px' : '3px')};
	}
	.Toastify__toast--error {
		background: #ffeff5;
		opacity: 0.8;
		border: 1px solid #f62d76;
		box-sizing: border-box;
		box-shadow: 0px 4px 18px #fff2f7;
		border-radius: 3px;
	}
	.Toastify__toast-body {
		margin: 0;
		padding: 0;
		overflow: hidden;
	}
`;

export default CustomContainer;
