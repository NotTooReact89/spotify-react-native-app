// @flow

import { put, select } from 'redux-saga/effects'
import { isConnectedToInternet } from '../Redux/StartupRedux'
import UserProfileActions, {
  getAccessToken,
} from '../Redux/Authentication/UserProfileRedux'
import { returnToLoginScreen } from './APISaga'
import { DateTimeUtils } from '../Lib'
import SyncActions, {
  isSyncing,
  getLastSyncedTimestamp,
} from '../Redux/SyncRedux'
import { getDeviceConfig } from './LoginSagas'
import { getPlaylists, getPlaylistTracks, getSongDetails } from './SpotifySaga'

export function* syncWithDeviceConfig(): Generator<*, *, *> {
  try {
    yield* getDeviceConfig()

    yield* sync()
  } catch (err) {
    const syncDateTime = yield select(state => getLastSyncedTimestamp(state))
    yield* handleSyncError(syncDateTime, 'unknownError')
  }
}

export function* sync(): Generator<*, *, *> {
  try {
    const accessToken = yield select(state => getAccessToken(state))
    const isOnline = yield select(state => isConnectedToInternet(state))
    const isSyncInProgress = yield select(state => isSyncing(state))

    if (!isOnline || isSyncInProgress) {
      if (!isOnline) {
        yield put(SyncActions.updateSyncError('noInternetConnection'))
        yield put(SyncActions.showOnScreenMessage())
      }
      return
    }

    const lastSyncedDateTime = yield select(state =>
      getLastSyncedTimestamp(state)
    )
    if (lastSyncedDateTime) {
      const lastSyncedInterval = DateTimeUtils.getDurationInMilliseconds(
        DateTimeUtils.now(),
        lastSyncedDateTime
      )
      const syncInterval = 6000
      if (lastSyncedInterval < syncInterval) {
        return
      }
    }

    yield put(SyncActions.syncFlagOn())

    yield* getPlaylists()

    yield put(SyncActions.finishSync(DateTimeUtils.now()))
    yield put(SyncActions.hideOnScreenMessage())
  } catch (err) {
    const lastSyncedDateTime = yield select(state =>
      getLastSyncedTimestamp(state)
    )
    yield* handleSyncError(lastSyncedDateTime, 'dataError')
  }
}

function* handleSyncError(syncDateTime, syncErrorMessage) {
  yield put(SyncActions.updateSyncError(syncErrorMessage))
  yield put(SyncActions.finishSync(syncDateTime, syncErrorMessage))
  yield put(SyncActions.showOnScreenMessage())
}
