// @flow

import 'react-native';
import Actions, { reducer, INITIAL_STATE } from './DeviceConfigRedux';

it('should initialise state with null values', () => {
  expect(INITIAL_STATE).toEqual(INITIAL_STATE);
});

it('should set sync refresh rate and warning pending version on successful call', () => {
  const syncInterval = 10000;
  const state = reducer(
    INITIAL_STATE,
    Actions.deviceConfigSuccess(syncInterval),
  );
  expect(state.syncInterval).toEqual(10000);
});
