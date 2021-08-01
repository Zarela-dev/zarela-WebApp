import React from "react";
import { Web3ReactProvider } from "@web3-react/core";
import AppRouter from "./components/Router";
import { theme } from "./theme";
import { ThemeProvider } from "styled-components";
import { AppProvider } from "./state";
import { GlobalStyle } from "./globalStyle";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import getLibrary from "./utils/getLibrary";
import ErrorBoundary from "./hooks/ErrorBoundary";

function App() {
	return (
		<div className="App">
			{/* Error Boundary for web 3 logic layer errors */}
			<ErrorBoundary>
				<Web3ReactProvider getLibrary={getLibrary}>
					<AppProvider>
						<ThemeProvider theme={theme}>
							<AppRouter />
							<ToastContainer />
							<GlobalStyle />
						</ThemeProvider>
					</AppProvider>
				</Web3ReactProvider>
			</ErrorBoundary>
		</div>
	);
}

export default App;
