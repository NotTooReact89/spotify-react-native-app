// @flow

import { createReducer, createActions } from 'reduxsauce'

export type State = {
  startup: {
    isConnectedToInternet: boolean,
  },
}

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  initialIsConnected: null,
  isConnected: ['isConnectedToInternet'],
})

export const StartupTypes = Types
export default Creators

export const INITIAL_STATE = {
  isConnectedToInternet: false,
}

const initialConnectionStatus = state => ({
  ...state,
  isConnectedToInternet: true,
})

const connectionStatus = (state, { isConnectedToInternet }) => ({
  ...state,
  isConnectedToInternet,
})

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.IS_CONNECTED]: connectionStatus,
  [Types.INITIAL_IS_CONNECTED]: initialConnectionStatus,
})

/* ------------- Selectors ------------- */

export const isConnectedToInternet = (state: State) =>
  state.startup.isConnectedToInternet
