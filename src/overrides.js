import { css } from 'styled-components';

export default css`
	/** Used to define container behavior: width, position: fixed etc... **/
	.Toastify__toast-container {
		min-width: 750px;
	}

	/** Used to define the position of the ToastContainer **/
	.Toastify__toast-container--top-left {
	}
	.Toastify__toast-container--top-center {
	}
	.Toastify__toast-container--top-right {
	}
	.Toastify__toast-container--bottom-left {
	}
	.Toastify__toast-container--bottom-center {
	}
	.Toastify__toast-container--bottom-right {
	}

	/** Classes for the displayed toast **/
	.Toastify__toast {
		height: 60px;
		padding: 0;
	}
	.Toastify__toast--rtl {
	}
	.Toastify__toast--dark {
	}
	.Toastify__toast--default {
	}
	.Toastify__toast--info {
	}
	.Toastify__toast--success {
		background: rgba(79, 207, 161, 0.7);
		border: 1px solid #1D8A7F;
		box-sizing: border-box;
		border-radius: 3px;
	}
	.Toastify__toast--warning {
	}
	.Toastify__toast--error {
		background: #FFEFF5;
		opacity: 0.8;
		border: 1px solid #F62D76;
		box-sizing: border-box;
		box-shadow: 0px 4px 18px #FFF2F7;
		border-radius: 3px;
	}
	.Toastify__toast-body {
		margin: 0;
		padding: 0;
	}

	/** Classes for the close button. Better use your own closeButton **/
	.Toastify__close-button {
	}
	.Toastify__close-button--default {
	}
	.Toastify__close-button > svg {
	}
	.Toastify__close-button:hover, .Toastify__close-button:focus {
	}

	/** Classes for the progress bar **/
	.Toastify__progress-bar {
	}
	.Toastify__progress-bar--animated {
	}
	.Toastify__progress-bar--controlled {
	}
	.Toastify__progress-bar--rtl {
	}
	.Toastify__progress-bar--default {
	}
	.Toastify__progress-bar--dark {
	}
`;