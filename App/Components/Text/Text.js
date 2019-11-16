// @flow

import * as React from 'react'
import { Text } from 'react-native'
import { FontSizes } from '../../Styles'
import getStyles from './TextStyles'

type FontSizeSize = $Keys<typeof FontSizes>

type EllipseLineBreakMode = 'head' | 'middle' | 'tail' | 'clip'

type TextProps = {|
  accessibilityLabel?: string,
  accessible?: boolean,
  allowFontScaling?: boolean,
  bold?: boolean,
  inverse?: boolean,
  voice?: boolean,
  ellipsizeMode?: EllipseLineBreakMode,
  numberOfLines?: number,
  size?: FontSizeSize,
  style?: any,
  testID?: string,
  children?: React.Node,
|}

const TextElement = ({
  accessibilityLabel,
  accessible,
  allowFontScaling,
  bold,
  inverse,
  voice,
  ellipsizeMode,
  numberOfLines,
  size,
  style,
  testID,
  children,
}: TextProps) => {
  const styles = getStyles({
    bold,
    inverse,
    voice,
    size,
  })

  return (
    <Text
      accessibilityLabel={accessibilityLabel}
      accessible={accessible}
      allowFontScaling={allowFontScaling}
      ellipsizeMode={ellipsizeMode}
      numberOfLines={numberOfLines}
      style={[styles.text, style]}
      testID={testID}
    >
      {children}
    </Text>
  )
}

TextElement.defaultProps = {
  accessibilityLabel: undefined,
  accessible: true,
  allowFontScaling: true,
  bold: false,
  inverse: false,
  voice: false,
  ellipsizeMode: 'tail',
  numberOfLines: undefined,
  size: 'md',
  style: {},
  testID: undefined,
  children: undefined,
}

export default TextElement
