// @flow

import 'react-native';
import Actions, { reducer, INITIAL_STATE } from './PlaylistTracksRedux';

const playlistTracksWorkingState = {
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

it('should set fetching when making playlistTracks request', () => {
  const state = reducer(INITIAL_STATE, Actions.requestPlaylistTracks('123'));

  expect(state.fetching).toEqual(true);
});

it('should handle successful playlistTracks', () => {
  const state = reducer(
    INITIAL_STATE,
    Actions.setPlaylistTracksData(playlistTracksWorkingState.data),
  );

  expect(state.data[0].name).toEqual('awesome');
});

it('should stop fetching on successful fetch of playlistTracks', () => {
  const initialState = {
    playlistTracks: {
      fetching: true,
    },
  };
  const state = reducer(
    initialState,
    Actions.setPlaylistTracksData(playlistTracksWorkingState.data),
  );
  expect(state.fetching).toEqual(false);
});

it('should reset playlistsError on successful fetch of playlistTracks', () => {
  const initialState = {
    playlistTracks: {
      error: 'clientError',
    },
  };
  const state = reducer(
    initialState,
    Actions.setPlaylistTracksData(playlistTracksWorkingState.data),
  );
  expect(state.error).toEqual(null);
});

it('should handle playlistTracks failure', () => {
  const error = 'some error';
  const state = reducer(INITIAL_STATE, Actions.setPlaylistTracksError(error));
  expect(state.error).toEqual(error);
});
