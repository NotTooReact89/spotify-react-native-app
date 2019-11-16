// @flow

import { StyleSheet } from 'react-native'
import { Fonts, Colors, FontSizes } from '../../Styles'

type GetStylesParams = {
  bold?: boolean,
  inverse?: boolean,
  voice?: boolean,
  size?: $Keys<typeof FontSizes>,
}

const getStyles = ({ bold, inverse, voice, size }: GetStylesParams) => {
  const fontSize = size ? FontSizes[size] : FontSizes.md
  const lineHeight = voice ? fontSize : fontSize * 1.5
  const color = inverse ? Colors.base.textInverse : Colors.base.text

  let fontFamily = Fonts.base.regular
  if (bold) {
    fontFamily = Fonts.base.bold
  } else if (voice) {
    fontFamily = Fonts.voice.blackItalic
  }

  return StyleSheet.create({
    text: {
      fontFamily,
      fontSize,
      lineHeight,
      color,
    },
  })
}

export default getStyles
