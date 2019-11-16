// @flow
//
// Leave off @2x/@3x extensions as React Native handles image sizes automatically.
//

import deepFreeze from 'deep-freeze';

const icons = {
  closeInverse: require('./Icons/cross-inverse.png'),
  infoInverse: require('./Icons/info-inverse.png'),
  tickInverse: require('./Icons/tick-inverse.png'),
};

export default deepFreeze({
  icons,
});
