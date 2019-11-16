// @flow
/* eslint-disable no-restricted-properties */
// use Math.pow instead of ** because the ** fails at runtime when commonRatio is a ternary or decimal variable

import deepFreeze from 'deep-freeze'
import Device from './Device'

const breakpointXsCommonRatio = 1.19
const breakpointXsFontSizeMd = 15

const breakpointMdCommonRatio = 1.27
const breakpointMdFontSizeMd = 15
const overideMdFontSizeSm = 13 // breaking the geometric progression since it gets too small

const commonRatio = Device.isPhone()
  ? breakpointXsCommonRatio
  : breakpointMdCommonRatio
const fontSize = Device.isPhone()
  ? breakpointXsFontSizeMd
  : breakpointMdFontSizeMd

const fontSizes: {
  sm: number,
  md: number,
  lg: number,
  xl: number,
  xxl: number,
  mega: number,
  giga: number,
} = {
  sm: overideMdFontSizeSm,
  md: fontSize,
  lg: Math.round(fontSize * Math.pow(commonRatio, 1)),
  xl: Math.round(fontSize * Math.pow(commonRatio, 2)),
  xxl: Math.round(fontSize * Math.pow(commonRatio, 3)),
  mega: Math.round(fontSize * Math.pow(commonRatio, 4)),
  giga: Math.round(fontSize * Math.pow(commonRatio, 5)),
}

export default deepFreeze(fontSizes)
