import React, { useEffect } from 'react';
import { Web3ReactProvider } from '@web3-react/core';
import AppRouter from './Router';
import ToastifyContainer from './components/ToastifyContainer';
import { ThemeProvider } from 'styled-components';
import { AppProvider } from './state';
import { NotificationProvider } from './state';
import { GlobalStyle } from './globalStyle';
import { theme } from './theme';
import getLibrary from './utils/getLibrary';
import ErrorBoundary from './ErrorBoundary';
import 'react-toastify/dist/ReactToastify.css';
import {log , toast} from './utils'

function App() {
	useEffect(() => {
		log(
			`signal submitted on requesefe signal submitted on requesefe signal submitted on requesefe`,
			'success',
			false,
			null,
		);
		toast(
			`signal submitted on requesefe`,
			'success',
			false,
			null,
		);
	})
	return (
		<div className='App'>
			<ErrorBoundary>
				<Web3ReactProvider getLibrary={getLibrary}>
					<AppProvider>
						<ThemeProvider theme={theme}>
							<NotificationProvider>
								<AppRouter />
								<ToastifyContainer
									enableMultiContainer
									containerId={'toastify'}
									limit={3}
								/>
								<GlobalStyle />
							</NotificationProvider>
						</ThemeProvider>
					</AppProvider>
				</Web3ReactProvider>
			</ErrorBoundary>
		</div>
	);
}

export default App;
