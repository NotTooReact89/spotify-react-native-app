// @flow

import 'react-native'
import React from 'react'
import renderer from 'react-test-renderer'
import Banner from './Banner'

it('should render banner correctly', () => {
  const tree = renderer
    .create(
      <Banner text="some text" onPress={jest.fn()} testId="test_screen" />
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
