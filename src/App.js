import React , {useEffect} from 'react';
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
import { log } from './utils/toast';

function App() {
	useEffect(() => {
		log(
			`signal submitted on request fef`,
			'success',
			false,
			null,
			{
				toastId: 1245,
			}
		);
	},[])
	
	return (
		<div className='App'>
			<ErrorBoundary>
				<Web3ReactProvider getLibrary={getLibrary}>
					<AppProvider>
						<ThemeProvider theme={theme}>
							<NotificationProvider>
								<AppRouter />
								<ToastifyContainer enableMultiContainer containerId={'toastify'} limit={3} />
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
