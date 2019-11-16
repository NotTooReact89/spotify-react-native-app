// flow

import { createReducer, createActions } from 'reduxsauce';
import type { Error } from '../types';

export type PlaylistsAPIResponse = {
  data: any[],
};

/* ---------------------------------------------------- */

export type State = {
  playlists: {
    data: any,
    error: ?Error,
    fetching: boolean,
  },
};

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  requestPlaylists: ['countryCode'],
  setPlaylistsData: ['data'],
  setPlaylistsError: ['error'],
});

export const PlaylistsTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = {
  data: [],
  fetching: false,
  error: null,
};

/* ------------- Reducers ------------- */

const request = state => {
  return {
    fetching: true,
    error: null,
  };
};

const success = (state, { data }) => {
  return {
    data,
    fetching: false,
    error: null,
  };
};

const failure = (state, { error }) => ({
  ...state,
  fetching: false,
  error,
});

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.REQUEST_PLAYLISTS]: request,
  [Types.SET_PLAYLISTS_DATA]: success,
  [Types.SET_PLAYLISTS_ERROR]: failure,
});

/* ------------- Selectors ------------- */

export const getPlaylistsData = (state: State) => state.playlists.data;

export const getPlaylistsError = (state: State) => state.playlists.error;

export const isFetchingPlaylists = (state: State) => state.playlists.fetching;
