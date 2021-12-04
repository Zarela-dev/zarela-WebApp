import React from 'react';
import { Web3ReactProvider } from '@web3-react/core';
import AppRouter from './Router';
import ToastifyContainer from './components/ToastifyContainer';
import ThemeProvider from './theme/index';
import { AppProvider } from './state';
import { PendingFilesProvider } from './state/pendingFilesProvider';
import { LocalStorageProvider } from './state/localStorageProvider/LocalStoragePriveder';
import { NotificationProvider } from './state';
import { GlobalStyle } from './globalStyle';
import getLibrary from './utils/getLibrary';
import ErrorBoundary from './ErrorBoundary';
import 'react-toastify/dist/ReactToastify.css';
import { ApolloProvider } from '@apollo/client';
import { client } from './apolloClient';

function App() {
	return (
		<div className="App">
			<ThemeProvider>
				<ErrorBoundary>
					<Web3ReactProvider getLibrary={getLibrary}>
						<AppProvider>
							<ApolloProvider client={client}>
								<PendingFilesProvider>
									<LocalStorageProvider>
										<NotificationProvider>
											<AppRouter />
											<ToastifyContainer enableMultiContainer containerId={'toastify'} limit={3} />
											<GlobalStyle />
										</NotificationProvider>
									</LocalStorageProvider>
								</PendingFilesProvider>
							</ApolloProvider>
						</AppProvider>
					</Web3ReactProvider>
				</ErrorBoundary>
			</ThemeProvider>
		</div>
	);
}

export default App;
