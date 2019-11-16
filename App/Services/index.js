// @flow

import LoginService from './LoginService'
import SpotifyService from './SpotifyService'

export type ServiceResponse = {
  ok: boolean,
  problem: ?string,
  data: any,
  status: ?number,
  headers?: Object,
  config?: Object,
  duration?: Object,
}

export { LoginService, SpotifyService }
