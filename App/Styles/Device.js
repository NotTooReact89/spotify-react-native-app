// @flow

import { Dimensions } from 'react-native'

const breakpointXs = 992

// Returns true if the screen is in portrait mode
const isPortrait = () => {
  const dim = Dimensions.get('screen')
  return dim.height >= dim.width
}

// Returns true if the screen is in landscape mode
const isLandscape = () => {
  const dim = Dimensions.get('screen')
  return dim.width >= dim.height
}

// Returns true if the device is a tablet
const isTablet = () => {
  const dim = Dimensions.get('screen')
  return dim.width >= breakpointXs || dim.height >= breakpointXs
}

// Returns true if the device is a phone
const isPhone = () => !isTablet()

export default {
  isPortrait,
  isLandscape,
  isTablet,
  isPhone,
}
