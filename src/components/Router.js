import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CreateOrder from '../pages/CreateOrder';
import OrderList from '../pages/OrderList';
import Header from './Header';
import OrderDetails from '../pages/OrderDetails';

const AppRouter = () => {
	return (
		<Router>
			<div>
				<Header />
				<Switch>
					<Route exact path='/' component={OrderList} />
					<Route exact path='/createOrder' component={CreateOrder} />
					<Route exact path='/order/:id' component={OrderDetails} />
				</Switch>
			</div>
		</Router>
	);
};

export default AppRouter;
