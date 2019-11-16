// @flow

import 'react-native';
import Actions, { reducer, INITIAL_STATE } from './UserProfileRedux';

const username = 'some username';
const password = 'some encrypted password';

const accessDetailsWorkingState = {
  loginError: null,
  isLoggingIn: false,
  accessToken: 'some access token',
};

it('should initialise state with default values', () => {
  expect(INITIAL_STATE).toEqual(INITIAL_STATE);
});

it('should set isLoggingIn when making login request', () => {
  const state = reducer(INITIAL_STATE, Actions.loginRequest());

  expect(state.access.isLoggingIn).toEqual(true);
});

it('should handle successful login', () => {
  const state = reducer(
    INITIAL_STATE,
    Actions.storeUserDetails(accessDetailsWorkingState.accessToken),
  );

  expect(state.access.accessToken).toEqual(
    accessDetailsWorkingState.accessToken,
  );
});

it('should stop isLoggingIn on successful login', () => {
  const initialState = {
    access: {
      isLoggingIn: true,
    },
  };
  const state = reducer(
    initialState,
    Actions.storeUserDetails(username, password),
  );
  expect(state.access.isLoggingIn).toEqual(false);
});

it('should reset loginError on successful login', () => {
  const initialState = {
    access: {
      loginError: 'clientError',
    },
  };
  const state = reducer(
    initialState,
    Actions.storeUserDetails(username, password),
  );
  expect(state.access.loginError).toEqual(null);
});

it('should handle login failure', () => {
  const error = 'some error';
  const state = reducer(INITIAL_STATE, Actions.loginFailure(error));
  expect(state.access.loginError).toEqual(error);
});

it('should reset the state', () => {
  const initialState = {
    access: accessDetailsWorkingState,
  };
  const state = reducer(initialState, Actions.resetValues());

  expect(state).toEqual(INITIAL_STATE);
});
