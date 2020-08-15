import React, { Component } from 'react';
import './admin.css';

import * as actions from '../../Actions';
import { connect } from 'react-redux';

export class AdminLogin extends Component {
	state = {
		form: {
			email: '',
			password: ''
		}
	};

	async onsubmit(e) {
		e.preventDefault();
		try {
			await this.props.AdminSignIn(this.state.form);
			if (this.props.AdminLoginsuccess) {
				setTimeout(() => {
					window.location = '/dashboard';
				}, 500);
			}
			if (this.props.AdminLoginerror) {
				setTimeout(() => {
					window.location = '/adminloginverify';
				}, 500);
			}
		} catch (error) {}
	}

	onchange(e) {
		e.preventDefault();
		const { name, value } = e.target;
		const form = this.state.form;
		switch (name) {
			case 'email':
				form.email = value;
				break;
			case 'password':
				form.password = value;
				break;
			default:
				break;
		}
		this.setState({ form });
	}

	render() {
		return (
			<section>
				<form className="Adminform" onSubmit={this.onsubmit.bind(this)}>
					{this.props.AdminLoginsuccess ? (
						<div className="alert alert-success">{this.props.AdminLoginsuccess}</div>
					) : (
						''
					)}
					{this.props.AdminLoginerror ? (
						<div className="alert alert-danger">{this.props.AdminLoginerror}</div>
					) : (
						''
					)}
					<h1 style={{ color: '#024fc0' }}>Login Admin</h1>
					<h2 style={{ color: '#024fc0' }} className="heading">
						Are You Registered?
					</h2>
					<input
						name="email"
						type="text"
						placeholder="Type Your Email"
						value={this.state.form.email}
						onChange={this.onchange.bind(this)}
						required
					/>
					<input
						name="password"
						type="password"
						placeholder="Type 6 Digit Code"
						value={this.state.form.code}
						onChange={this.onchange.bind(this)}
						required
					/>
					<button type="submit" className="btn btn-outline-success">
						Submit
					</button>
				</form>
			</section>
		);
	}
}
function mapStateToProps(state) {
	return {
		AdminLoginsuccess: state.auth.AdminLoginsuccess,
		AdminLoginerror: state.auth.AdminLoginerror
	};
}

export default connect(mapStateToProps, actions)(AdminLogin);
