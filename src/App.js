import React from 'react';
import AppRouter from './components/Router';
import { theme } from './theme';
import { ThemeProvider } from 'styled-components';
import { Web3Provider } from './web3Provider';

function App() {
	return (
		<div className="App">
			<Web3Provider>
				<ThemeProvider theme={theme}>
					<AppRouter />
				</ThemeProvider>
			</Web3Provider>
		</div>
	);
}

export default App;
