// @flow

import { Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { type ServiceResponse } from '../Services';

type ApiError = {|
  statusCode: ?number,
  serviceResponse?: ?ServiceResponse,
|};

export const createApiHeaders = (accessToken: ?string) => {
  if (accessToken) {
    return {
      Authorization: `Bearer ${accessToken}`,
    };
  }
  return;
};

export const apiResolveError = ({ statusCode, serviceResponse }: ApiError) => {
  let data = null;
  if (serviceResponse) {
    data = serviceResponse.data || serviceResponse.problem;
  }

  if (statusCode && data) {
    switch (true) {
      case statusCode === 400:
        return 'badRequestError';
      case statusCode === 401:
        return 'unauthorizedError';
      case statusCode > 401 && statusCode < 500:
        return 'clientError';
      case statusCode > 499:
        return 'serverError';
      default:
        return 'clientError';
    }
  } else if (statusCode === null && !data) {
    return 'dataError';
  } else {
    return 'apiTimeoutError';
  }
};

export const convertApiErrorToText = (error: string, errorId: ?string) => {
  switch (error) {
    case 'noInternetConnection':
      return 'You are offline. Please connect to the network and try again.';
    case 'badRequestError':
      return 'There was a problem fetching data. Please try again later.';
    case 'clientError':
      return 'There was a problem fetching data. Please try again later.';
    case 'serverError':
      return 'There was a problem fetching data. Please try again later.';
    case 'dataError':
      return 'There was a problem fetching data. Please try again later.';
    case 'apiTimeoutError':
      return 'The request timed out. Please try again later.';
    default:
      return 'There was a problem fetching data. Please try again later.';
  }
};
