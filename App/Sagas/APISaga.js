// @flow

import { put, call, select } from 'redux-saga/effects';
import NavigationService from '../Navigation/NavigationService';
import UserProfileActions, {
  getAccessToken,
} from '../Redux/Authentication/UserProfileRedux';
import SyncActions from '../Redux/SyncRedux';
import { type ServiceResponse } from '../Services';
import { ApiUtils } from '../Lib';
import { authenticate } from './LoginSagas';
import { LoginService } from '../Services';

export default function* apiCall(
  serviceCall: *,
  ...args: *
): Generator<*, *, *> {
  const loginService = LoginService.create();
  let accessToken: string = yield select(state => getAccessToken(state));
  let serviceCallResponse: ServiceResponse = yield call(
    serviceCall,
    ...args,
    accessToken && ApiUtils.createApiHeaders(accessToken),
  );

  if (serviceCallResponse.status) {
    if (hasSessionTimedOut(serviceCallResponse.status)) {
      yield* authenticate(loginService);
    }
  }
  return serviceCallResponse;
}

const hasSessionTimedOut = (statusCode: number) => {
  if (statusCode === 401) {
    return true;
  }
  return false;
};
