// @flow

import React from 'react'
import { View } from 'react-native'
import Styles from './HorizontalLineStyles'

export type HorizontalLineProps = {
  light?: boolean,
  inverse?: boolean,
  style?: any, // $FlowFixMe
}

const HorizontalLine = ({ light, inverse, style }: HorizontalLineProps) => {
  let lineStyle = null
  if (light && inverse) {
    lineStyle = Styles.lightInverse
  } else if (light) {
    lineStyle = Styles.light
  } else if (inverse) {
    lineStyle = Styles.inverse
  } else {
    lineStyle = Styles.default
  }

  return <View style={[Styles.horizontalLine, lineStyle, style]} />
}

HorizontalLine.defaultProps = {
  light: false,
  inverse: false,
  style: {},
}

export default HorizontalLine
