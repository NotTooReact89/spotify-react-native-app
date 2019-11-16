// @flow

import { StyleSheet } from 'react-native';
import { Colors, Spaces, BaseStyles } from '../../Styles';

export default StyleSheet.create({
  ...BaseStyles,

  container: {
    position: 'relative',
    height: '100%',
    backgroundColor: Colors.base.text,
  },
});
