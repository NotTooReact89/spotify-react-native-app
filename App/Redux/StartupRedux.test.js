// @flow

import 'react-native'
import Actions, { reducer, INITIAL_STATE } from '../../App/Redux/StartupRedux'

it('should initialise state with null values', () => {
  const expectedInitialState = {
    isConnectedToInternet: false,
  }

  expect(INITIAL_STATE).toEqual(expectedInitialState)
})

it('should set connection status when device connection state changes', () => {
  const result = reducer(
    { isConnectedToInternet: true },
    Actions.isConnected(true)
  )
  expect(result).toEqual({ isConnectedToInternet: true })
})
