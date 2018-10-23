import * as actionTypes from './actionTypes';
import axios from 'axios';

const AUTH_API_KEY = 'AIzaSyASI7CKHope01yMAuOVHHMtPZPAGdOT0_0';
const AUTH_URL_BASE = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/';
const AUTH_URL_SIGN_UP = AUTH_URL_BASE + 'signupNewUser?key=' + AUTH_API_KEY;
const AUTH_URL_SIGN_IN = AUTH_URL_BASE + 'verifyPassword?key=' + AUTH_API_KEY;
// const AUTH_URL_GET_USER_DATA = AUTH_URL_BASE + 'getAccountInfo?key=' + AUTH_API_KEY;

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = (idToken, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: idToken,
    userId: userId,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
  localStorage.removeItem('expirationDate');
  return {
    type: actionTypes.AUTH_LOGOUT
  }
};

export const checkAuthTimeout = (expirationTime) => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const auth = (email, password, isSignup) => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    };
    const url = isSignup ? AUTH_URL_SIGN_UP : AUTH_URL_SIGN_IN;
    axios.post(url, authData)
      .then(response => {
        console.log({response: response});
        const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
        localStorage.setItem('token', response.data.idToken);
        localStorage.setItem('userId', response.data.localId);
        localStorage.setItem('expirationDate', expirationDate);
        dispatch(authSuccess(response.data.idToken, response.data.localId));
        dispatch(checkAuthTimeout(response.data.expiresIn));
      }).catch(error => {
      console.log({error: error});
      dispatch(authFail(error));
    });
  };
};

export const setAuthRedirectPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path
  };
};

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem('token');
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'));
      if (expirationDate > new Date()) {
        const userId = localStorage.getItem('userId');
        const timeDifference = (expirationDate.getTime() - new Date().getTime()) / 1000;
        dispatch(authSuccess(token, userId));
        dispatch(checkAuthTimeout(timeDifference));
      } else {
        dispatch(logout());
      }
    }
  };
};