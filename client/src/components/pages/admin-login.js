import React, { Component } from 'react';
import './admin.css';
import { connect } from 'react-redux';
import * as actions from '../../Actions';

import { Link } from 'react-router-dom';

export class Admin extends Component {
	state = {
		form: {
			username: '',
			email: '',
			number: ''
		}
	};

	onChange(e) {
		e.preventDefault();
		const { name, value } = e.target;
		let form = this.state.form;
		switch (name) {
			case 'username':
				form.username = value;
				break;
			case 'email':
				form.email = value;
				break;
			case 'number':
				form.number = value;
				break;
			default:
				break;
		}
		this.setState({ form });
	}

	async onsubmit(e) {
		e.preventDefault();
		await this.props.AdminSignUp(this.state.form);
	}

	render() {
		return (
			<section className="Admin-page">
				<h1 style={{ color: '#1389fd' }}>Become Admin</h1>
				<div className="admin-wrapper" style={{ color: '#fff' }}>
					{this.props.AdminSuccess ? (
						<div className="alert alert-success">{this.props.AdminSuccess}</div>
					) : (
						''
					)}

					{this.props.Adminerror ? <div className="alert alert-danger">{this.props.Adminerror}</div> : ''}
					<form className="form" onSubmit={this.onsubmit.bind(this)}>
						<input
							name="username"
							type="text"
							placeholder="Enter Username"
							value={this.state.username}
							onChange={this.onChange.bind(this)}
							required
						/>
						<input
							name="email"
							type="email"
							placeholder="Enter Your Email"
							value={this.state.email}
							onChange={this.onChange.bind(this)}
							required
						/>
						<input
							name="number"
							type="number"
							placeholder="Enter your Number"
							value={this.state.number}
							onChange={this.onChange.bind(this)}
							required
						/>
						<button type="submit" className="btn btn-outline-primary submit" style={{ width: '150px' }}>
							Submit
						</button>
					</form>
					<p style={{ color: '#1389fd', fontSize: '15px', marginLeft: '10px' }}>
						You will get an email with 6 digit code after you are verified.
					</p>
				</div>
				<p className="code">
					Already have a code ?{' '}
					<Link to="adminloginverify" className="link" style={{ color: '#1389fd' }}>
						Click Here
					</Link>
				</p>
			</section>
		);
	}
}

function mapStateToProps(state) {
	return {
		AdminSuccess: state.auth.AdminSuccess,
		Adminerror: state.auth.Adminerror
	};
}

export default connect(mapStateToProps, actions)(Admin);
