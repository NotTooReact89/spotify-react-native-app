//
// @flow
//

import { createReducer, createActions } from 'reduxsauce'
import type { Error } from './types'

export type SyncData = {
  isOnScreenMessageVisible: boolean,
  syncDateTime: number,
  syncError: ?Error,
  isSyncing: boolean,
  errorId: ?string,
}

export type State = {
  syncData: SyncData,
}

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  startSync: [],
  syncFlagOn: [],
  finishSync: ['syncDateTime', 'syncError', 'errorId'],
  updateSyncError: ['syncError'],
  showOnScreenMessage: [],
  hideOnScreenMessage: [],
  syncReset: [],
})

export const SyncTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = {
  syncDateTime: 0,
  isSyncing: false,
  syncError: null,
  isOnScreenMessageVisible: false,
  errorId: null,
}

/* ------------- Reducers ------------- */

const startSync = state => ({
  ...state,
  isSyncing: false,
  syncError: null,
})

const syncFlagOn = state => ({
  ...state,
  isSyncing: true,
})

const finishSync = (state, action) => {
  const { syncDateTime, syncError = null, errorId = null } = action

  return {
    ...state,
    syncDateTime,
    syncError,
    errorId,
    isSyncing: false,
  }
}

const updateSyncError = (state, action) => {
  const { syncError } = action

  return {
    ...state,
    syncError,
    isSyncing: false,
  }
}

const showOnScreenMessage = state => ({
  ...state,
  isOnScreenMessageVisible: true,
})

const hideOnScreenMessage = state => ({
  ...state,
  isOnScreenMessageVisible: false,
})

const syncReset = state => ({
  ...state,
  isSyncing: false,
  syncError: null,
})

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.START_SYNC]: startSync,
  [Types.SYNC_FLAG_ON]: syncFlagOn,
  [Types.FINISH_SYNC]: finishSync,
  [Types.UPDATE_SYNC_ERROR]: updateSyncError,
  [Types.SHOW_ON_SCREEN_MESSAGE]: showOnScreenMessage,
  [Types.HIDE_ON_SCREEN_MESSAGE]: hideOnScreenMessage,
  [Types.SYNC_RESET]: syncReset,
})

export const getLastSyncedTimestamp = (state: State) =>
  state.syncData.syncDateTime
export const isSyncing = (state: State) => state.syncData.isSyncing
export const getSyncError = (state: State) => state.syncData.syncError
export const getSyncErrorId = (state: State) => state.syncData.errorId
export const isOnScreenMessageVisible = (state: State) =>
  state.syncData.isOnScreenMessageVisible
