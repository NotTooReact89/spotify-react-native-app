import { StyleSheet, Platform, Dimensions } from 'react-native';
import { BaseStyles, Colors } from '../../Styles';

const screenHeight = Math.round(Dimensions.get('window').height);

export default StyleSheet.create({
  ...BaseStyles,

  imageView: {
    height: 120,
    borderRadius: 7,
  },

  contentContainer: {
    marginTop: screenHeight / 3,
    justifyContent: 'center',
    paddingHorizontal: 15,
  },

  text: {
    paddingBottom: 10,
  },
});
