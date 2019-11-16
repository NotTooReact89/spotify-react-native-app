// @flow

import { createReducer, createActions } from 'reduxsauce'
import type { Error } from '../types'

export type AccessDetails = {
  isLoggingIn: boolean,
  accessToken: string,
  loginError: ?Error,
}

export type State = {
  userProfile: {
    access: AccessDetails,
  },
}

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  loginRequest: [],
  storeUserDetails: ['accessToken'],
  loginFailure: ['loginError'],
  resetValues: [],
})

export const UserProfileTypes = Types
export default Creators

/* ------------- Initial State ------------- */

const accessDetailsInitialState = {
  loginError: null,
  userDetailsError: null,
  isLoggingIn: false,
  accessToken: '',
}

export const INITIAL_STATE = {
  access: accessDetailsInitialState,
}

/* ------------- Reducers ------------- */

const loginRequest = state => ({
  ...state,
  access: {
    ...state.access,
    isLoggingIn: true,
    loginError: null,
  },
})

const loginSuccess = (state, action) => {
  const { accessToken } = action

  return {
    ...state,
    access: {
      ...state.access,
      accessToken,
      isLoggingIn: false,
      loginError: null,
    },
  }
}

const loginFailure = (state, { loginError, errorId = null }) => ({
  ...state,
  access: {
    ...state.access,
    isLoggingIn: false,
    loginError,
  },
})

const reset = state => INITIAL_STATE

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOGIN_REQUEST]: loginRequest,
  [Types.STORE_USER_DETAILS]: loginSuccess,
  [Types.LOGIN_FAILURE]: loginFailure,
  [Types.RESET_VALUES]: reset,
})

/* ------------- Selectors ------------- */

export const isLoggingIn = (state: State) =>
  state.userProfile.access.isLoggingIn

export const isLoggedIn = (state: State) =>
  state.userProfile.access.accessToken !== ''
export const getLoginError = (state: State) =>
  state.userProfile.access.loginError
export const getAccessToken = (state: State) =>
  state.userProfile.access.accessToken
