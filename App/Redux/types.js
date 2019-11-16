// @flow

import { type State as DeviceConfigState } from './Authentication/DeviceConfigRedux'
import { type State as UserProfileState } from './Authentication/UserProfileRedux'
import { type State as SyncState } from './SyncRedux'
import { type State as StartupState } from './StartupRedux'

export type Error =
  | 'sessionTimeoutError'
  | 'appVersionDenied'
  | 'deviceAgentOrApplicationAgentError'
  | 'badRequestError'
  | 'unauthorizedError'
  | 'apiTimeoutError'
  | 'clientError'
  | 'dataError'
  | 'serverError'
  | 'genericError'
  | 'noInternetConnection'

export type Store = DeviceConfigState &
  UserProfileState &
  SyncState &
  StartupState

/* -------------------- forms -------------------- */

export type Status = 'draft' | 'complete' | 'delivered'
