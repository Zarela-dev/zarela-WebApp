import React from 'react';
import { Web3ReactProvider } from '@web3-react/core';
import AppRouter from './components/Router';
import { theme } from './theme';
import { ThemeProvider } from 'styled-components';
import { AppProvider } from './state';
import { GlobalStyle } from './globalStyle';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import getLibrary from './utils/getLibrary';
import ErrorBoundary from './hooks/ErrorBoundary';
import styled from 'styled-components';

const CustomContainer = styled(ToastContainer)`
	@media only screen and (min-width: ${(props) => props.theme.tablet_sm_breakpoint}) {
		width: 750px;
	}
	@media only screen and (max-width: ${(props) => props.theme.tablet_sm_breakpoint}) {
		width: 90vw;
		transform: translateX(-50%);
		left: 50%;
		bottom: 70px;
	}

	& .Toastify__toast {
		padding: 0;
		margin-bottom: ${(props) => props.theme.spacing(1)};
	}
	@media only screen and (max-width: ${(props) => props.theme.tablet_sm_breakpoint}) {
		& .Toastify__toast {
			min-height: 45px;
		}
	}
	@media only screen and (min-width: ${(props) => props.theme.tablet_sm_breakpoint}) {
		& .Toastify__toast {
			height: 60px;
		}
	}

	.Toastify__toast--success {
		background: rgba(79, 207, 161, 0.7);
		border: 1px solid #1d8a7f;
		box-sizing: border-box;
		border-radius: 3px;
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

function App() {
	return (
		<div className="App">
			{/* Error Boundary for web 3 logic layer errors */}
			<ErrorBoundary>
				<Web3ReactProvider getLibrary={getLibrary}>
					<AppProvider>
						<ThemeProvider theme={theme}>
							<AppRouter />
							<CustomContainer />
							<GlobalStyle />
						</ThemeProvider>
					</AppProvider>
				</Web3ReactProvider>
			</ErrorBoundary>
		</div>
	);
}

export default App;
