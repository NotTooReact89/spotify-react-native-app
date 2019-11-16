// flow

import { createReducer, createActions } from 'reduxsauce'
import type { Error } from '../types'

export type SongDetailsAPIResponse = {
  data: any[],
}

/* ---------------------------------------------------- */

export type State = {
  songDetails: {
    data: any,
    error: ?Error,
    fetching: boolean,
  },
}

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  requestSongDetails: ['id'],
  setSongDetailsData: ['data'],
  setSongDetailsError: ['error'],
})

export const SongDetailsTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = {
  data: [],
  fetching: false,
  error: null,
  errorId: null,
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
  [Types.REQUEST_SONG_DETAILS]: request,
  [Types.SET_SONG_DETAILS_DATA]: success,
  [Types.SET_SONG_DETAILS_ERROR]: failure,
})

/* ------------- Selectors ------------- */

export const getSongDetailsData = (state: State) => state.songDetails.data

export const getSongDetailsError = (state: State) => state.songDetails.error

export const isFetchingSongDetails = (state: State) =>
  state.songDetails.fetching
