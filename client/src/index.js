import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import reducers from './Reducers';
import axios from 'axios';

import './index.css';
import App from './App';
import LandingPage from './components/Landingpage/Landingpage';
import Dashboard from './components/pages/dashboard';
import About from './components/pages/About';
import Designers from './components/pages/Designers';

import CustomerSuppert from './components/pages/Customersupport';
import AadminLogin from './components/pages/admin-login';
import AdminLoginVerify from './components/pages/admin-login-verify';
import authAdmin from './components/HOC/authAdmin';
import authuser from './components/HOC/authUser';
import Product from './components/pages/dashboardproduct';
import Designer from './components/pages/dashboarddesigner';
import { ProductProvider } from './context';
import Modal from './productComponents/model';

import Details from './productComponents/Details';
import Cart from './productComponents/cart/Cart';

import Checkout from './productComponents/cart/checkout';

import * as serviceWorker from './serviceWorker';

//check if jwt token exists and put it in state so redux remembers it
//get jwt token from localStorage
const jwtToken = localStorage.getItem('JWT_TOKEN');
const adminToken = localStorage.getItem('ADMIN_TOKEN');
const getuser = JSON.parse(localStorage.getItem('user'));

//let backend know we are authenticated
axios.defaults.headers.common['Authorization'] = jwtToken;
axios.defaults.headers.common['Authorization'] = adminToken;

ReactDOM.render(
	<Provider
		store={createStore(
			reducers,
			{
				auth: {
					token: jwtToken,
					isAuthenticate: jwtToken ? true : false,
					tokenadmin: adminToken,
					isAdminAuthenticated: adminToken ? true : false,
					userData: getuser
				}
			},
			applyMiddleware(reduxThunk)
		)}
	>
		<ProductProvider>
			<Router>
				<App>
					<Route path="/" exact component={LandingPage} />
					<Route path="/dashboard" exact component={authAdmin(Dashboard)} />
					<Route path="/about" exact component={About} />
					<Route path="/designers" exact component={Designers} />
					<Route path="/customersupport" exact component={CustomerSuppert} />
					<Route path="/admin-login" exact component={AadminLogin} />
					<Route path="/adminloginverify" exact component={AdminLoginVerify} />
					<Route path="/dashboardproduct" exact component={authAdmin(Product)} />
					<Route path="/dashboarddesigner" exact component={authAdmin(Designer)} />
					<Route path="/details" exact component={Details} />
					<Route path="/cart" exact component={Cart} />
					<Route path="/checkout" exact component={authuser(Checkout)} />
					<Modal />
				</App>
			</Router>
		</ProductProvider>
	</Provider>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
