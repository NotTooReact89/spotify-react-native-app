// @flow

import React from 'react'
import { View } from 'react-native'
import renderer from 'react-test-renderer'
import { ScrollViewWithPullDownRefresh } from './ScrollViewWithPullDownRefresh'

const props = {
  background: 'morningLight',
  hideOnScreenMessage: jest.fn(),
  isConnectedToInternet: true,
  screenName: 'testScreen',
  startSync: jest.fn(),
  userId: '12345',
}

describe('render notification banner when sync fails', () => {
  it('with error id', () => {
    const tree = renderer.create(
      <ScrollViewWithPullDownRefresh
        {...props}
        syncErrorId="23456"
        syncError="genericError"
        showAppBanner
        isSyncing={false}
      >
        <View />
      </ScrollViewWithPullDownRefresh>
    )
    expect(tree).toMatchSnapshot()
  })

  it('without error id', () => {
    const tree = renderer.create(
      <ScrollViewWithPullDownRefresh
        {...props}
        syncErrorId=""
        syncError="genericError"
        showAppBanner
        isSyncing={false}
      >
        <View />
      </ScrollViewWithPullDownRefresh>
    )
    expect(tree).toMatchSnapshot()
  })
})

it('should render scroll view with pull down to refresh', () => {
  const tree = renderer.create(
    <ScrollViewWithPullDownRefresh
      {...props}
      syncErrorId=""
      syncError={null}
      showAppBanner={false}
      isSyncing={false}
    >
      <View />
    </ScrollViewWithPullDownRefresh>
  )
  expect(tree).toMatchSnapshot()
})

it('should render loading icon when sync is running', () => {
  const tree = renderer.create(
    <ScrollViewWithPullDownRefresh
      {...props}
      syncErrorId=""
      syncError={null}
      showAppBanner={false}
      isSyncing
    >
      <View />
    </ScrollViewWithPullDownRefresh>
  )
  expect(tree).toMatchSnapshot()
})
