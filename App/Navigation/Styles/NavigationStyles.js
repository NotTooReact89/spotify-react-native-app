// @flow

import { StyleSheet, Platform, Dimensions } from 'react-native'
import { Colors, Spaces, Fonts, Device } from '../../Styles'

const screenWidth = Dimensions.get('screen').width

export default StyleSheet.create({
  headerStyle: {
    backgroundColor: Colors.navigation.background,
    borderBottomWidth: 0,
    elevation: 0,
    shadowOpacity: 0,
  },

  headerRightContainer: {
    maxWidth: screenWidth / 3,
    marginRight: Spaces.md,
    alignSelf: 'center',
  },

  headerTitleStyle: {
    color: Colors.navigation.title,
    fontFamily: Fonts.base.regular,
  },

  headerBackTitleStyle: {
    maxWidth: screenWidth / 3 - 30, // 30 is the back arrow width
    color: Colors.navigation.backButton,
    marginLeft: Device.isPhone() ? 0 : Spaces.sm,
    fontFamily: Fonts.base.bold,
  },
})
