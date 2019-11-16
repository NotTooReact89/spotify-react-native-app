// flow

import { put, call, select } from 'redux-saga/effects';
import apiCall from './APISaga';
import UserProfileActions, {
  getAccessToken,
} from '../Redux/Authentication/UserProfileRedux';
import DeviceConfigActions from '../Redux/Authentication/DeviceConfigRedux';
import SyncActions from '../Redux/SyncRedux';
import { isConnectedToInternet } from '../Redux/StartupRedux';
import type { LoginServiceType } from '../Services/LoginService';
import { ApiUtils, DateTimeUtils } from '../Lib';
import NavigationService from '../Navigation/NavigationService';
import { Analytics } from '../Lib';

type Params = {
  username: string,
  password: string,
};

export function* login(
  authenticator: Function,
  loginService: LoginServiceType,
  action: Params,
): Generator<*, *, *> {
  yield* authenticator(loginService);
}

export function* getDeviceConfig(): Generator<*, *, *> {
  DeviceConfigActions.deviceConfigSuccess(6000);
}

export function* authenticate(
  loginService: LoginServiceType,
): Generator<*, *, *> {
  try {
    const loginResponse = yield call(loginService.login);

    if (!loginResponse.ok) {
      if (loginResponse.data) {
        const errorMessage = ApiUtils.apiResolveError({
          statusCode: loginResponse.status,
          serviceResponse: loginResponse,
        });
        yield put(UserProfileActions.loginFailure(errorMessage));
        if (errorMessage === 'unauthorizedError') {
          yield put(SyncActions.hideOnScreenMessage());
        } else {
          yield put(SyncActions.showOnScreenMessage());
        }
      } else {
        yield put(
          UserProfileActions.loginFailure(
            ApiUtils.apiResolveError({
              statusCode: loginResponse.status,
              serviceResponse: loginResponse,
            }),
          ),
        );
        yield put(SyncActions.showOnScreenMessage());
      }
      return;
    }

    yield put(
      UserProfileActions.storeUserDetails(loginResponse.data.access_token),
    );
  } catch (err) {
    yield put(
      UserProfileActions.loginFailure(
        ApiUtils.apiResolveError({
          statusCode: null,
          serviceResponse: null,
        }),
      ),
    );
  }
}
