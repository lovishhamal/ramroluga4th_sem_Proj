import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Login.css';
import * as actions from '../../Actions';

import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';

const emailRegx = RegExp(
	/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);

const formValid = ({ formErrors, ...rest }) => {
	let valid = true;

	//validate form errors being empty
	Object.values(formErrors).forEach((value) => {
		value.length > 0 && (valid = false);
	});

	//validate form was filled out
	Object.values(rest).forEach((value) => {
		value === null && (valid = false);
	});

	return valid;
};

class Login extends Component {
	state = {
		isOpen: false,
		email: null,
		username: null,
		password: null,
		address: null,
		number: null,
		city: null,
		formErrors: {
			email: '',
			username: '',
			password: '',
			number: '',
			address: '',
			city: ''
		}
	};

	async responseGoogleSignIn(res) {
		await this.props.googleOauth(res.accessToken);
	}

	async responseFacebookSignIn(res) {
		await this.props.facebookOauth(res.accessToken);
		if (!this.props.errorMessage) {
			window.location = '/';
		}
	}

	async responseGoogle(res) {
		await this.props.googleOauth(res.accessToken);
	}

	async responseFacebook(res) {
		console.log('Facebook res ->', res);

		await this.props.facebookOauth(res.accessToken);
	}

	async handleSubmit(e) {
		e.preventDefault();

		if (formValid(this.state)) {
			await this.props.signUp(this.state);
		} else {
			console.error('Form contains errors');
		}
	}
	async onSubmit(e) {
		e.preventDefault();
		console.log('Login start');

		await this.props.signIn(this.state);
		if (!this.props.errorSignin || this.props.successSignin) {
			window.location = '/';
		}
	}

	handleChange(e) {
		e.preventDefault();

		const { name, value } = e.target;
		let formErrors = this.state.formErrors;

		switch (name) {
			case 'email':
				formErrors.email = emailRegx.test(value) ? '' : 'Ivalid email fromat';
				break;
			case 'username':
				formErrors.username = value.length < 3 ? 'Minimum 3 characters' : '';
				break;
			case 'password':
				formErrors.password = value.length < 5 ? 'Atleast 5 char' : '';
				break;
			case 'number':
				formErrors.number = value.length < 10 || value.length > 10 ? 'No must be 10 digit' : '';
				break;
			case 'address':
				formErrors.address = value.length < 1 ? 'Full address' : '';
				break;
			case 'city':
				formErrors.city = value.length < 1 ? 'City' : '';
				break;
			default:
				break;
		}

		//set the states
		this.setState({ formErrors, [name]: value });
	}

	onChange(e) {
		e.preventDefault();
		const { name, value } = e.target;
		let formErrors = this.state.formErrors;
		switch (name) {
			case 'email':
				formErrors.email = formErrors.email;
				break;
			case 'password':
				formErrors.password = formErrors.password;
				break;
		}
		//set the state
		this.setState({ formErrors, [name]: value });
	}

	render() {
		let slash;
		let password = 'password';
		slash = <i className="fas fa-eye" />;

		if (this.state.isOpen) {
			slash = <i className="fas fa-eye-slash" />;
			password = 'text';
		}
		console.log('error-> ', this.state.formErrors.number);
		console.log('error-> ', this.state.formErrors.address);
		let { formErrors } = this.state;
		return (
			<div className="Login">
				<div className="main">
					<div className="close" onClick={(this.props.onClick, this.props.onClick)}>
						<i className="far fa-times-circle" style={{ color: '#fff' }} />
					</div>
					<div className="main-component">
						<div className="sign-up">
							<h3>Sign Up</h3>
							<FacebookLogin
								className="social"
								appId="1161848254020383"
								callback={this.responseFacebook.bind(this)}
								render={(renderProps) => (
									<button
										style={{ background: '#4267b2', color: '#fff' }}
										onClick={renderProps.onClick}
										className="social"
									>
										<div style={{ textDecoration: 'none', background: 'none' }}>
											<i className="fab fa-facebook-f" />
											<span
												className="social-msg"
												style={{ textDecoration: 'none', background: 'none' }}
											>
												Sign Up using Facebook
											</span>
										</div>
									</button>
								)}
							/>
							<GoogleLogin
								className="social"
								clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
								onSuccess={this.responseGoogle.bind(this)}
								onFailure={this.responseGoogle}
								render={(renderProps) => (
									<button
										onClick={renderProps.onClick}
										disabled={renderProps.disabled}
										className="social"
									>
										<div style={{ textDecoration: 'none', background: 'none' }}>
											<img
												style={{ width: '25px', height: '25px', padding: '0', margin: '0' }}
												src="https://img.icons8.com/color/48/000000/google-logo.png"
											/>
											<span
												className="social-msg"
												style={{ textDecoration: 'none', background: 'none' }}
											>
												Sign Up using Google
											</span>
										</div>
									</button>
								)}
								buttonText="Login"
								cookiePolicy={'single_host_origin'}
							/>
							{this.props.errorMessage ? (
								<div className="alert alert-danger">{this.props.errorMessage}</div>
							) : null}
							{this.props.successMessage ? (
								<div className="alert alert-success">{this.props.successMessage}</div>
							) : null}
							<div className="Form">
								<form onSubmit={this.handleSubmit.bind(this)}>
									<div>
										<input
											type="text"
											className="form-control"
											onChange={this.handleChange.bind(this)}
											name="email"
											noValidate
											required
										/>
										<label htmlFor="email">Email</label>
									</div>
									{formErrors.email ? <span className="errorMessage">{formErrors.email}</span> : ''}
									<br />
									<div>
										<input
											type="text"
											className="form-control "
											onChange={this.handleChange.bind(this)}
											name="username"
											noValidate
											required
										/>
										<label htmlFor="username">Username</label>
									</div>
									{formErrors.username.length ? (
										<span className="errorMessage">{formErrors.username}</span>
									) : (
										''
									)}
									<br />
									<div className="password">
										<div>
											<input
												type={password}
												className="form-control"
												onChange={this.handleChange.bind(this)}
												name="password"
												noValidate
												required
											/>
											<label htmlFor="password">Password</label>
										</div>
										<div
											onClick={() => {
												this.setState({
													isOpen: !this.state.isOpen
												});
											}}
											className="eye"
										>
											{slash}
										</div>
									</div>
									{formErrors.password.length ? (
										<span className="errorMessage">{formErrors.password}</span>
									) : (
										''
									)}
									<br />
									<div>
										<input
											type="number"
											className="form-control"
											onChange={this.handleChange.bind(this)}
											name="number"
											noValidate
											required
										/>
										<label htmlFor="number">Contact Number</label>
									</div>
									{formErrors.number.length ? (
										<span className="errorMessage">{formErrors.number}</span>
									) : (
										''
									)}
									<br />
									<div className="address">
										<div>
											<input
												type="text"
												name="address"
												className="form-control"
												onChange={this.handleChange.bind(this)}
												noValidate
												required
											/>
											<label htmlFor="address">Shipping Address</label>
										</div>
										<div>
											<div>
												<input
													type="text"
													name="city"
													className="form-control"
													onChange={this.handleChange.bind(this)}
													noValidate
													required
												/>
												<span className="address-span" />
												<label htmlFor="address">City</label>
											</div>
										</div>
									</div>
									{formErrors.address.length ? (
										<span className="errorMessage">{formErrors.address}</span>
									) : (
										''
									)}
									{formErrors.city.length ? (
										<span className="errorMessage">{formErrors.city}</span>
									) : (
										''
									)}
									<br />
									<button
										type="submit"
										variant="contained"
										color="primary"
										className="btn btn-primary"
									>
										Sign Up
									</button>
								</form>
							</div>
						</div>

						<span className="line" />
						<div className="sign-in">
							<h3>Sign In</h3>
							<FacebookLogin
								className="social"
								appId="1161848254020383"
								callback={this.responseFacebookSignIn.bind(this)}
								render={(renderProps) => (
									<button
										style={{ background: '#4267b2', color: '#fff' }}
										onClick={renderProps.onClick}
										className="social"
									>
										<div style={{ textDecoration: 'none', background: 'none' }}>
											<i className="fab fa-facebook-f" />
											<span
												className="social-msg"
												style={{ textDecoration: 'none', background: 'none' }}
											>
												Continue with Facebook
											</span>
										</div>
									</button>
								)}
							/>
							<GoogleLogin
								clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
								onSuccess={this.responseGoogleSignIn.bind(this)}
								render={(renderProps) => (
									<button
										onClick={renderProps.onClick}
										disabled={renderProps.disabled}
										className="social"
									>
										<div style={{ textDecoration: 'none', background: 'none' }}>
											<img
												style={{ width: '25px', height: '25px', padding: '0', margin: '0' }}
												src="https://img.icons8.com/color/48/000000/google-logo.png"
											/>
											<span
												className="social-msg"
												style={{ textDecoration: 'none', background: 'none' }}
											>
												Continue with Google
											</span>
										</div>
									</button>
								)}
								buttonText="Login"
								cookiePolicy={'single_host_origin'}
							/>
							{this.props.errorSignin ? (
								<div className="alert alert-danger">{this.props.errorSignin}</div>
							) : null}
							{this.props.successSignin ? (
								<div className="alert alert-success">{this.props.successSignin}</div>
							) : null}
							<div className="Form">
								<form onSubmit={this.onSubmit.bind(this)}>
									<div>
										<input
											type="text"
											className="form-control "
											name="email"
											required
											onChange={this.onChange.bind(this)}
										/>
										<label className="">Email</label>
									</div>
									<br />
									<div>
										<input
											type={password}
											className=" form-control"
											name="password"
											required
											onChange={this.onChange.bind(this)}
										/>
										<label>Password</label>
									</div>
									<button
										type="submit"
										variant="contained"
										color="secondary"
										className="btn btn-danger"
									>
										Sign In
									</button>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		errorMessage: state.auth.errorMessage,
		successMessage: state.auth.successMessage,
		successSignin: state.auth.successSignin,
		errorSignin: state.auth.errorSignin
	};
}

export default connect(mapStateToProps, actions)(Login);
