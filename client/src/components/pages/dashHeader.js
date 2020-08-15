import React, { Component } from 'react';
import './dashboard.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../../Actions';

export class dashHeader extends Component {
	async signOut() {
		await this.props.signout();
	}
	render() {
		return (
			<section className="header">
				<h5 style={{ color: 'black' }}>Dashboard</h5>
				<div>
					<Link to="/dashboardproduct">
						<h5 style={{ color: 'black', marginLeft: '100px' }}>Upload Product</h5>
					</Link>
				</div>
				<div>
					<Link to="/dashboarddesigner">
						<h5 style={{ color: 'black', marginLeft: '10px' }}>Upload Designer</h5>
					</Link>
				</div>
				<div className="spacer" />
				<div className="log">
					{this.props.isAuth ? (
						<h5 className="sign out" style={{ color: 'black' }}>
							<Link
								to="/"
								style={{ textDecoration: 'none', color: 'black' }}
								onClick={this.signOut.bind(this)}
							>
								Sign Out
							</Link>
						</h5>
					) : (
						''
					)}
				</div>
			</section>
		);
	}
}

function mapStateToProps(state) {
	return {
		isAuth: state.auth.isAdminAuthenticated
	};
}

export default connect(mapStateToProps, actions)(dashHeader);
