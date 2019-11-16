// @flow
/* eslint-disable no-restricted-properties */
// use Math.pow instead of ** because the ** fails at runtime when commonRatio is a ternary or decimal variable

import deepFreeze from 'deep-freeze'
import Device from './Device'

const breakpointXsSpaceMd = 12
const breakpointMdSpaceMd = 20

const spaceBase = Device.isPhone() ? breakpointXsSpaceMd : breakpointMdSpaceMd
const spaceRatio = 2

const spaces: {
  xs: number,
  sm: number,
  md: number,
  lg: number,
  xl: number,
  xxl: number,
} = {
  xs: Math.round(spaceBase * Math.pow(spaceRatio, -2)),
  sm: Math.round(spaceBase * Math.pow(spaceRatio, -1)),
  md: spaceBase,
  lg: Math.round(spaceBase * Math.pow(spaceRatio, 1)),
  xl: Math.round(spaceBase * Math.pow(spaceRatio, 2)),
  xxl: Math.round(spaceBase * Math.pow(spaceRatio, 3)),
}

export default deepFreeze(spaces)
