// @flow

import 'react-native';
import Actions, { reducer, INITIAL_STATE } from './PlaylistsRedux';

const playlistsWorkingState = {
  error: null,
  fetching: false,
  data: [
    {
      id: '1',
      name: 'awesome',
    },
  ],
};

it('should initialise state with the default values', () => {
  const state = reducer(INITIAL_STATE, {});

  expect(state).toEqual(INITIAL_STATE);
});

it('should set fetching when making playlists request', () => {
  const state = reducer(INITIAL_STATE, Actions.requestPlaylists('NZ'));

  expect(state.fetching).toEqual(true);
});

it('should handle successful playlists', () => {
  const state = reducer(
    INITIAL_STATE,
    Actions.setPlaylistsData(playlistsWorkingState.data),
  );

  expect(state.data[0].name).toEqual('awesome');
});

it('should stop fetching on successful fetch of playlists', () => {
  const initialState = {
    playlists: {
      fetching: true,
    },
  };
  const state = reducer(
    initialState,
    Actions.setPlaylistsData(playlistsWorkingState.data),
  );
  expect(state.fetching).toEqual(false);
});

it('should reset playlistsError on successful fetch of playlists', () => {
  const initialState = {
    playlists: {
      error: 'clientError',
    },
  };
  const state = reducer(
    initialState,
    Actions.setPlaylistsData(playlistsWorkingState.data),
  );
  expect(state.error).toEqual(null);
});

it('should handle playlists failure', () => {
  const error = 'some error';
  const state = reducer(INITIAL_STATE, Actions.setPlaylistsError(error));
  expect(state.error).toEqual(error);
});
