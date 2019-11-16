// @flow

import apisauce from 'apisauce';
import Config from '../Config/AppConfig';
import { type ServiceResponse } from '.';
// const qs = require('qs')

export type PlaylistsServiceType = {
  getPlaylists: ({ [string]: string }, string[]) => ServiceResponse,
  getPlaylistTracks: (string, { [string]: string }) => ServiceResponse,
  getSongDetails: (string, { [string]: string }) => ServiceResponse,
};

const create = (baseURL: string = Config.baseApiURL): PlaylistsServiceType => {
  const getPlaylists = (countryCode, headers) => {
    const api = apisauce.create({
      baseURL,
      headers: headers,
      timeout: Config.requestTimeout,
    });

    return api.get(
      `browse/featured-playlists?&limit=20&country=${countryCode}`,
    );
  };

  const getPlaylistTracks = (id, headers) => {
    const api = apisauce.create({
      baseURL,
      headers,
      timeout: Config.requestTimeout,
    });
    return api.get(`playlists/${id}/tracks`);
  };

  const getSongDetails = (id, headers) => {
    const api = apisauce.create({
      baseURL,
      headers,
      timeout: Config.requestTimeout,
    });
    return api.get(`tracks/${id}`);
  };

  return {
    getPlaylists,
    getPlaylistTracks,
    getSongDetails,
  };
};

export default {
  create,
};
