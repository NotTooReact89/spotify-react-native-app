// @flow

import { StyleSheet } from 'react-native'
import { Colors, Spaces } from '../../Styles'

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.base.info,
    flexDirection: 'row',
    padding: Spaces.md,
    zIndex: 10,
  },

  contentContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },

  text: {
    marginLeft: Spaces.md,
    flex: 1,
  },

  iconContainer: {
    paddingLeft: Spaces.lg,
  },
})
