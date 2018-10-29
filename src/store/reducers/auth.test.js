import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

describe('auth reducer', () => {
  const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: "/"
  };

  it('should return the initial state', function () {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should store the token upon login', function () {
    const idToken = 'some-token';
    const userId = 'some-user-id';

    expect(reducer(initialState, {
      type: actionTypes.AUTH_SUCCESS,
      idToken: idToken,
      userId: userId
    })).toEqual({
      ...initialState,
      token: idToken,
      userId: userId
    });
  });
});