import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CreateOrder from '../pages/CreateOrder';
import OrderList from '../pages/OrderList';

const AppRouter = () => {
	return (
		<Router>
			<Switch>
				<Route exact path='/' component={OrderList}/>
				<Route exact path='/createOrder' component={CreateOrder}/>
			</Switch>
		</Router>
	);
};

export default AppRouter;
