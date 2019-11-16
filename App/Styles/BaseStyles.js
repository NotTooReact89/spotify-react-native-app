// @flow

import deepFreeze from 'deep-freeze'
import Colors from './Colors'

const BaseStyles = {
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.base.backgroundInverse,
  },

  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
}

export default deepFreeze(BaseStyles)
