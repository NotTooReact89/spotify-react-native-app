// @flow

import 'react-native'
import Actions, { reducer, INITIAL_STATE } from './SyncRedux'

const syncDateTime = '123456789'
const syncError = 'unknownError'

it('should initialise state with empty values', () => {
  expect(INITIAL_STATE).toEqual(INITIAL_STATE)
})

it('set issyncing to true when sync button was clicked', () => {
  const state = reducer({ isSyncing: false }, Actions.syncFlagOn())
  expect(state.isSyncing).toEqual(true)
})

it('should store sync datetime and make isSyncing false after sync finished', () => {
  const state = reducer(INITIAL_STATE, Actions.finishSync(syncDateTime))
  expect(state.syncDateTime).toEqual(syncDateTime)
  expect(state.isSyncing).toEqual(false)
})

it('should handle sync errors by registering the error', () => {
  const state = reducer(INITIAL_STATE, Actions.updateSyncError(syncError, true))
  expect(state.syncError).toEqual(syncError)
  expect(state.isSyncing).toEqual(false)
})

it('should update reference id when there is a sync error', () => {
  const state = reducer(
    INITIAL_STATE,
    Actions.finishSync(syncDateTime, syncError, '1234')
  )
  expect(state.syncError).toEqual(syncError)
  expect(state.errorId).toEqual('1234')
})
