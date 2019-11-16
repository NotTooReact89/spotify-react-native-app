// @flow

import 'react-native'
import React from 'react'
import renderer from 'react-test-renderer'
import Icon from './Icon'

it('should render an icon', () => {
  const tree = renderer
    .create(<Icon type="tickInverse" testId="someId" />)
    .toJSON()
  expect(tree).toMatchSnapshot()
})

it('should render an icon with custom size', () => {
  const tree = renderer
    .create(<Icon type="tickInverse" size={14} testId="someId" />)
    .toJSON()
  expect(tree).toMatchSnapshot()
})

it('should render an icon with custom style', () => {
  const tree = renderer
    .create(
      <Icon
        type="tickInverse"
        style={{ backgroundColor: 'purple' }}
        testId="someId"
      />
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
