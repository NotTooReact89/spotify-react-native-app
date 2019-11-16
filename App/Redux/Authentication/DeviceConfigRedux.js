// @flow

import { createReducer, createActions } from 'reduxsauce'
import type { Error } from '../types'
import { VersionUtils } from '../../Lib'

export type State = {
  deviceConfig: {
    syncInterval: number,
  },
}

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  deviceConfigRequest: [],
  deviceConfigSuccess: ['syncInterval'],
})

export const DeviceConfigTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = {
  syncInterval: 0,
}

const deviceConfigRequest = state => ({
  ...state,
  syncInterval: 0,
})

const deviceConfigSuccess = state => ({
  ...state,
  syncInterval: 10000,
})

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.DEVICE_CONFIG_REQUEST]: deviceConfigRequest,
  [Types.DEVICE_CONFIG_SUCCESS]: deviceConfigSuccess,
})

/* ------------- Selectors ------------- */

export const getSyncInterval = (state: State) => state.deviceConfig.syncInterval
