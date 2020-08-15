import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import * as actions from '../../Actions';
import { connect } from 'react-redux';

import './Navbar.css';
import logo from './logo-1.png';

import BackDrop from '../Backdrop/Backdrop';
import Login from '../Login/Login';

const Navbar = (props) => {
	const [ state, setstate ] = useState(false);

	let togglesearch = 'toggle-search';
	let input = 'inputsearch';
	let login;
	let backdrop;

	if (props.search) {
		togglesearch = 'toggle-search clear';
		input = 'expand';
	}

	if (state) {
		login = <Login onClick={() => setstate(false)} />;
		backdrop = <BackDrop onClick={() => setstate(false)} />;
	}

	const remove = async () => {
		await localStorage.removeItem('JWT_TOKEN');
	};

	const Nav = () => {
		return (
			<div className="nav-wrapper">
				<div className="navbar">
					<div className="menu-toggle" onClick={props.click}>
						<i className="fas fa-bars" />
					</div>
					<div className="logo">
						<img src={logo} />
					</div>
					<div className={togglesearch}>
						<ul className="nav-items">
							<li>
								<Link to="/">Home</Link>
							</li>
							<li>
								<Link to="/about">About</Link>
							</li>
							<li>
								<Link to="designer">Designers</Link>
							</li>
							<li>
								<Link to="/customersupport">Customer Support</Link>
							</li>
						</ul>
					</div>
					<input className={input} placeholder=" Find your product..." style={{ fontFamily: 'Muli' }} />
					<div className="nav-items-right">
						<div className="search" onClick={props.hide}>
							<i className="fas fa-search" />
						</div>
						{props.jwtToken ? (
							<div
								className="signout"
								onClick={() => {
									remove();
								}}
							>
								<a href="/">
									<i class="fas fa-sign-out-alt sign-out">
										<span className="sign-out">Sign Out</span>
									</i>
								</a>
							</div>
						) : (
							<div className="login" onClick={() => setstate(!state)}>
								<a href="#">
									Login <i className="fas fa-sign-in-alt" />
								</a>
							</div>
						)}
					</div>
				</div>
			</div>
		);
	};

	return (
		<div className="Nav">
			<Nav />
			{login}
			{backdrop}
		</div>
	);
};

function mapStateToProps(state) {
	return {
		jwtToken: state.auth.token
	};
}

export default connect(mapStateToProps, actions)(Navbar);
