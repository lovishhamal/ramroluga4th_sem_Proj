import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../Actions';

export default (OriginalComponent) => {
	class MixedComponent extends Component {
		async checkAuth() {
			if (!this.props.isAuth && !this.props.jwtToken) {
				await this.props.history.push('/cart');
			}
		}
		componentDidMount() {
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
			isAuthenticated: state.auth.isAuthenticated,
			jwtToken: state.auth.token
		};
	}
	return connect(mapStateToProps, actions)(MixedComponent);
};
