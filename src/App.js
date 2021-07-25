import React, { useState } from 'react';
import { Web3ReactProvider } from '@web3-react/core';
import AppRouter from './components/Router';
import { theme } from './theme';
import { ThemeProvider } from 'styled-components';
import { AppProvider } from './state';
import { GlobalStyle } from './globalStyle';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import getLibrary from './utils/getLibrary';
import Context from './utils/context';

function App() {
	const [device, setDevice] = useState('');

	const contextStore = {
		device,
		setDevice,
	};

	return (
		<div className="App" style={{ overflowX: 'hidden' }}>
			<Web3ReactProvider getLibrary={getLibrary}>
				<AppProvider>
					<Context.Provider value={contextStore}>
						<ThemeProvider theme={theme}>
							<AppRouter />
							<ToastContainer />
							<GlobalStyle />
						</ThemeProvider>
					</Context.Provider>
				</AppProvider>
			</Web3ReactProvider>
		</div>
	);
}

export default App;
