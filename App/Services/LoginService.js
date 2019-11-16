// @flow

import apisauce from 'apisauce';
import Config from '../Config/AppConfig';
import { type ServiceResponse } from '.';

export type LoginServiceType = {
  login: () => ServiceResponse,
};

const loginUrl = 'api/token';

const create = (
  baseURL: string = 'https://accounts.spotify.com',
): LoginServiceType => {
  const login = () => {
    const api = apisauce.create({
      baseURL,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization:
          'Basic ZDJkMDQ2OTRhZWFlNDVhYjhjYTg2ZWM4MTE3NjlhNTU6YTAwZjQ1YTRlNTY5NDExNTg3OGMyMDFkMTNhZTZiMmY=',
      },
      params: {
        grant_type: 'client_credentials',
        scope: 'playlist-read-private',
      },
    });
    // const requestBody = {
    //   grant_type: 'client_credentials',
    //   scope: 'playlist-read-private',
    // };
    return api.post(loginUrl);
  };

  return {
    login,
  };
};

export default {
  create,
};
