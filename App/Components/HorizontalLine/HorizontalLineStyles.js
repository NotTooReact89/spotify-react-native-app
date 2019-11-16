// @flow

import { StyleSheet } from 'react-native'
import { Spaces, Colors } from '../../Styles'

export default StyleSheet.create({
  horizontalLine: {
    width: '100%',
    borderBottomWidth: 1,
    marginVertical: Spaces.sm,
  },
  light: {
    borderBottomColor: Colors.base.blackLight,
  },
  lightInverse: {
    borderBottomColor: Colors.base.whiteLight,
  },
  default: {
    borderBottomColor: Colors.base.text,
  },
  inverse: {
    borderBottomColor: Colors.base.textInverse,
  },
})
