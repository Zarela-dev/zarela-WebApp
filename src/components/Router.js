import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CreateRequest from "../pages/CreateRequest";
import Header from "./Header";
import RequestDetails from "../pages/RequestDetails/RequestDetails";
import Inbox from "../pages/Inbox";
import IntroModal from "./IntroModal";
import BottomNavigation from "./BottomNavigation";
import styled from "styled-components";
import Wallet from "../pages/Wallet/Wallet";
import RequestsList from "../pages/RequestsList";
import MyAccount from "../pages/MyAccount";
import Log from "../pages/Log/Log";
import { mainContext } from "./../state";

const AppWrapper = styled.div`
	padding-bottom: ${(props) => props.theme.spacing(5)};
`;

const AppRouter = () => {
	const provider = window.ethereum;
	const { appState } = useContext(mainContext);

	if (!provider)
		return (
			<>
				<IntroModal />
			</>
		);
	return (
		<Router>
			<AppWrapper>
				{appState.device === "Mobile" ? (
					<>
						<Header device="mobile" />
						<BottomNavigation />
					</>
				) : (
					<Header device="desktop" />
				)}
				<Switch>
					<Route exact path="/" component={RequestsList} />
					<Route exact path="/request/create" component={CreateRequest} />
					<Route exact path="/request/:id" component={RequestDetails} />
					<Route exact path="/inbox" component={Inbox} />
					<Route exact path="/account" component={MyAccount} />
					<Route path="/wallet" component={Wallet} />
					<Route path="/log" component={Log} />
				</Switch>
			</AppWrapper>
		</Router>
	);
};

export default AppRouter;
