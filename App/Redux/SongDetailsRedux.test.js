// @flow

import 'react-native';
import Actions, { reducer, INITIAL_STATE } from './SongDetailsRedux';

const songDetailsWorkingState = {
  error: null,
  fetching: false,
  data: {
    id: '1',
    name: 'awesome',
  },
};

it('should initialise state with the default values', () => {
  const state = reducer(INITIAL_STATE, {});

  expect(state).toEqual(INITIAL_STATE);
});

it('should set fetching when making songDetails request', () => {
  const state = reducer(INITIAL_STATE, Actions.requestSongDetails('123'));

  expect(state.fetching).toEqual(true);
});

it('should handle successful songDetails', () => {
  const state = reducer(
    INITIAL_STATE,
    Actions.setSongDetailsData(songDetailsWorkingState.data),
  );

  expect(state.data.name).toEqual('awesome');
});

it('should stop fetching on successful fetch of songDetails', () => {
  const initialState = {
    songDetails: {
      fetching: true,
    },
  };
  const state = reducer(
    initialState,
    Actions.setSongDetailsData(songDetailsWorkingState.data),
  );
  expect(state.fetching).toEqual(false);
});

it('should reset playlistsError on successful fetch of songDetails', () => {
  const initialState = {
    songDetails: {
      error: 'clientError',
    },
  };
  const state = reducer(
    initialState,
    Actions.setSongDetailsData(songDetailsWorkingState.data),
  );
  expect(state.error).toEqual(null);
});

it('should handle songDetails failure', () => {
  const error = 'some error';
  const state = reducer(INITIAL_STATE, Actions.setSongDetailsError(error));
  expect(state.error).toEqual(error);
});
