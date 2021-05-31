import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import OrderList from '../pages/OrderList';

const AppRouter = () => {
	return (
		<Router>
			<Switch>
				<Route exact path='/' component={OrderList}/>
			</Switch>
		</Router>
	);
};

export default AppRouter;
