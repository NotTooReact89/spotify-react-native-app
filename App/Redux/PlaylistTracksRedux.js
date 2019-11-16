// flow

import { createReducer, createActions } from 'reduxsauce'
import type { Error } from '../types'

export type PlaylistTrackssAPIResponse = {
  data: any[],
}

/* ---------------------------------------------------- */

export type State = {
  playlistTracks: {
    data: any,
    error: ?Error,
    fetching: boolean,
  },
}

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  requestPlaylistTracks: ['id'],
  setPlaylistTracksData: ['data'],
  setPlaylistTracksError: ['error'],
})

export const PlaylistTracksTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = {
  data: [],
  fetching: false,
  error: null,
}

/* ------------- Reducers ------------- */

const request = state => {
  return {
    fetching: true,
    error: null,
  }
}

const success = (state, { data }) => {
  return {
    data,
    fetching: false,
    error: null,
  }
}

const failure = (state, { error }) => ({
  ...state,
  fetching: false,
  error,
})

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.REQUEST_PLAYLIST_TRACKS]: request,
  [Types.SET_PLAYLIST_TRACKS_DATA]: success,
  [Types.SET_PLAYLIST_TRACKS_ERROR]: failure,
})

/* ------------- Selectors ------------- */

export const getPlaylistTracksData = (state: State) => state.playlistTracks.data

export const getPlaylistTracksError = (state: State) =>
  state.playlistTracks.error

export const isFetchingPlaylistTracks = (state: State) =>
  state.playlistTracks.fetching
