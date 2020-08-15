import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../Actions';

export default (OriginalComponent) => {
	class MixedComponent extends Component {
		async checkAuth() {
			if (!this.props.isAdminAuthenticated && !this.props.jwtToken) {
				await this.props.history.push('/admin-login');
			}
		}
		componentDidMount() {
			console.log('We are  in user auth', this.props.jwtToken);
			this.checkAuth();
		}

		componentDidUpdate() {
			this.checkAuth();
		}

		render() {
			return <OriginalComponent {...this.props} />;
		}
	}

	function mapStateToProps(state) {
		return {
			isAdminAuthenticated: state.auth.isAdminAuthenticated,
			jwtToken: state.auth.tokenadmin
		};
	}
	return connect(mapStateToProps, actions)(MixedComponent);
};
