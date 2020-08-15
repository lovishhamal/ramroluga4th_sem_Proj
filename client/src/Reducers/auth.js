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
} from '../Actions/types';

const initialState = {
	isAuthenticated: false,
	token: '',
	errorMessage: '',
	successMessage: '',
	successSignin: '',
	errorSignin: '',
	AdminSuccess: '',
	Adminerror: '',
	AdminLoginsuccess: '',
	AdminLoginerror: '',
	ordersuccess: '',
	userData: []
};

export default (state = initialState, action) => {
	switch (action.type) {
		case AUTH_SIGN_UP:
			return { ...state, token: action.payload, isAuthenticated: true, errorMessage: '' };

		case AUTH_SIGN_IN:
			return { ...state, token: action.payload, isAuthenticated: true, errorMessage: '' };

		case AUTH_SUCCESS_MESSAGE:
			return { ...state, successMessage: action.payload };

		case AUTH_SIGN_UP_ERROR:
			return { ...state, errorMessage: action.payload };

		case AUTH_SIGN_IN_SUCCESS:
			return { ...state, successSignin: action.payload };

		case AUTH_SIGN_IN_ERROR:
			return { ...state, errorSignin: action.payload };

		case USER_DATA:
			return {
				...state,
				userData: action.payload.local
			};
		case ADMIN_SIGN_UP:
			return { ...state, AdminSuccess: action.payload };

		case ADMIN_SIGN_UP_ERROR:
			return { ...state, Adminerror: action.payload };

		case ADMIN_SIGN_IN:
			return { ...state, AdminLoginsuccess: action.payload };

		case ADMIN_SIGN_IN_ERROR:
			return { ...state, AdminLoginerror: action.payload };

		case AUTH_SIGNOUT:
			return { ...state, token: action.payload, isAuthenticated: false, errorMessage: '' };
		case ORDER:
			return { ...state, ordersuccess: action.payload };

		default:
			return state;
	}
};
