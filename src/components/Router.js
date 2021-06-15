import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CreateOrder from '../pages/CreateOrder';
import OrderList from '../pages/OrderList';
import Header from './Header';
import OrderDetails from '../pages/OrderDetails';
import MyOrders from '../pages/MyOrders';
import MyAccount from '../pages/MyAccount';
import Wallet from '../pages/Wallet';

const AppRouter = () => {
	return (
		<Router>
			<div>
				<Header />
				<Switch>
					<Route exact path='/' component={OrderList} />
					<Route exact path='/createOrder' component={CreateOrder} />
					<Route exact path='/order/:id' component={OrderDetails} />
					<Route exact path='/my-orders' component={MyOrders} />
					<Route exact path='/account' component={MyAccount} />
					<Route exact path='/wallet' component={Wallet} />
				</Switch>
			</div>
		</Router>
	);
};

export default AppRouter;
