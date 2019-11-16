// @flow

import 'react-native'
import React from 'react'
import renderer from 'react-test-renderer'
import HorizontalLine from './HorizontalLine'

jest.mock('Dimensions')

it('should render a light HorizontalLine correctly', () => {
  const tree = renderer.create(<HorizontalLine />).toJSON()
  expect(tree).toMatchSnapshot()
})

it('should render a light inverse HorizontalLine correctly', () => {
  const tree = renderer.create(<HorizontalLine inverse />).toJSON()
  expect(tree).toMatchSnapshot()
})

it('should render a strong HorizontalLine correctly', () => {
  const tree = renderer.create(<HorizontalLine strong />).toJSON()
  expect(tree).toMatchSnapshot()
})

it('should render a strong inverse HorizontalLine correctly', () => {
  const tree = renderer.create(<HorizontalLine strong inverse />).toJSON()
  expect(tree).toMatchSnapshot()
})
