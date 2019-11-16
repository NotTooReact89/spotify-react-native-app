// flow

import React from 'react'
import { Image } from 'react-native'
import Images from '../../Images'
import { TestProps } from '../../Lib'
import Styles, { iconSize } from './IconStyles'

export type IconType = $Keys<typeof Images.icons>

export type IconProps = {
  type: IconType,
  size?: number,
  testId?: string,
  style?: any,
}

const Icon = ({ type, size, testId, style }: IconProps) => {
  const testProps = testId ? TestProps(testId) : null
  return (
    <Image
      source={Images.icons[type]}
      style={[Styles.icon, { height: size, width: size }, style]}
      {...testProps}
    />
  )
}

Icon.defaultProps = {
  testId: '',
  size: iconSize,
  style: {},
}

export default Icon
