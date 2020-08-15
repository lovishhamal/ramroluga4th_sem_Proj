import axios from 'axios';
import {
	AUTH_SIGN_UP,
	AUTH_SIGN_IN,
	AUTH_SIGN_UP_ERROR,
	AUTH_SUCCESS_MESSAGE,
	AUTH_SIGN_IN_ERROR,
	AUTH_SIGN_IN_SUCCESS,
	ADMIN_SIGN_UP,
	ADMIN_SIGN_UP_ERROR,
	ADMIN_SIGN_IN,
	ADMIN_SIGN_IN_ERROR,
	AUTH_SIGNOUT,
	USER_DATA,
	ORDER
} from './types';

/*
ActionCreators -> create/return actions -> dispatch -> middleware ->reducers
*/

export const order = (data) => {
	return (dispatch) => {
		console.log('step -1');
		axios.post('http://127.0.0.1:5000/product/confirmorder', data);
		console.log('reached order action');
		dispatch({
			type: ORDER,
			payload: 'Order Placed Successfully'
		});
	};
};

export const googleOauth = (data) => {
	return async (dispatch) => {
		const res = await axios.post('http://127.0.0.1:5000/user/googleOauth', {
			access_token: data
		});

		dispatch({
			type: AUTH_SIGN_IN,
			payload: res.data.Token
		});
		localStorage.setItem('JWT_TOKEN', res.data.Token);
	};
};

export const facebookOauth = (data) => {
	return async (dispatch) => {
		const res = await axios.post('http://127.0.0.1:5000/user/facebookOauth', {
			access_token: data
		});

		dispatch({
			type: AUTH_SIGN_IN,
			payload: res.data.Token
		});
		localStorage.setItem('JWT_TOKEN', res.data.Token);
	};
};

export const signUp = (data) => {
	return async (dispatch) => {
		try {
			const res = await axios.post('http://127.0.0.1:5000/user/signup', data);

			dispatch({
				type: AUTH_SIGN_UP,
				payload: res.data.Token
			});

			localStorage.setItem('JWT_TOKEN', res.data.Token);
			//if success dispatch
			dispatch({
				type: AUTH_SUCCESS_MESSAGE,
				payload: 'You are successfully registered.'
			});
		} catch (err) {
			console.log('[Action error got called]', err);

			//if error dispatch
			dispatch({
				type: AUTH_SIGN_UP_ERROR,
				payload: 'Email already In use.'
			});
		}
	};
};

export const signIn = (data) => {
	return async (dispatch) => {
		try {
			const res = await axios.post('http://127.0.0.1:5000/user/signin', data).then((data) => {
				localStorage.setItem('user', JSON.stringify(data.data));
				dispatch({
					type: AUTH_SIGN_IN,
					payload: data.data.Token
				});
				localStorage.setItem('JWT_TOKEN', data.Token);
				//if success
				dispatch({
					type: USER_DATA,
					payload: data.data.user
				});

				dispatch({
					type: AUTH_SIGN_IN_SUCCESS,
					payload: 'You are logged In.'
				});
			});
		} catch (error) {
			console.log('error in signin dispact-> ', error);

			dispatch({
				type: AUTH_SIGN_IN_ERROR,
				payload: ' Wrong username/password combination. '
			});
		}
	};
};

export const signout = () => {
	return async (dispatch) => {
		try {
			await localStorage.removeItem('ADMIN_TOKEN');
			dispatch({
				type: AUTH_SIGNOUT,
				payload: ''
			});
		} catch (error) {
			return error;
		}
	};
};

export const AdminSignUp = (data) => {
	return async (dispatch) => {
		try {
			await axios.post('http://127.0.0.1:5000/admin/adminRegister', data);
			dispatch({
				type: ADMIN_SIGN_UP,
				payload: 'You are registered.'
			});
		} catch (error) {
			dispatch({
				type: ADMIN_SIGN_UP_ERROR,
				payload: 'Username/Email already exists.'
			});
		}
	};
};

export const AdminSignIn = (data) => {
	return async (dispatch) => {
		try {
			const res = await axios.post('http://127.0.0.1:5000/user/adminsignin', data);

			localStorage.setItem('ADMIN_TOKEN', res.data.Token);

			dispatch({
				type: ADMIN_SIGN_IN,
				payload: 'Yo are logged in'
			});
		} catch (error) {
			dispatch({
				type: ADMIN_SIGN_IN_ERROR,
				payload: 'Wrong Username/Password'
			});
		}
	};
};
