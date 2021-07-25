import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CreateRequest from '../pages/CreateRequest';
import Header from './Header';
import RequestDetails from '../pages/RequestDetails/RequestDetails';
import Inbox from '../pages/Inbox';
import MyAccount from '../pages/MyAccount';
import Wallet from '../pages/Wallet/Wallet';
import NoMetamaskMessage from './NoMetamaskMessage';
import NoMobileSupportMessage from './NoMobileSupportMessage';
import RequestsList from '../pages/RequestsList/RequestsList';
import Log from './../pages/Log/Log';
import Context from './../utils/context';

const AppRouter = () => {
	const context = useContext(Context);

	useEffect(() => {
		if ((/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))) {
			context.setDevice("Mobile");
		} else {
			context.setDevice("Desktop");
		};
	}, [context.device]);

	if (!window.web3)
		return <>
			<NoMetamaskMessage />
			<RequestsList />
		</>;

	return (
		<Router>
			<>
				{context.device === "Mobile" ?
					<Header device="mobile" />
					:
					<Header device="desktop" />
				}
				<Switch>
					<Route exact path='/' component={RequestsList} />
					<Route exact path='/request/create' component={CreateRequest} />
					<Route exact path='/request/:id' component={RequestDetails} />
					<Route exact path='/inbox' component={Inbox} />
					<Route exact path='/account' component={MyAccount} />
					<Route path='/wallet' component={Wallet} />
					<Route exact path='/log' component={Log} />
				</Switch>
			</>
		</Router>
	);

};

export default AppRouter;
