// @flow

import deepFreeze from 'deep-freeze'
import palette from './Palette'

const mix = (color1: string, color2: string, weight: number) => {
  let result = '#'

  for (let i = 1; i <= 5; i += 2) {
    const v1 = parseInt(color1.substr(i, 2), 16)
    const v2 = parseInt(color2.substr(i, 2), 16)

    let val = Math.round(v2 + (v1 - v2) * weight).toString(16)

    if (val.length < 2) {
      val = `0${val}`
    }

    result += val
  }

  return result
}

const base = {
  transparent: palette.transparent,
  whiteLight: palette.whiteAlpha20,
  whiteDark: palette.whiteAlpha70,
  blackLight: palette.blackAlpha20,
  blackDark: palette.blackAlpha60,
  listHeaderBackground: palette.mineShaft,
  lightBackground: palette.woodSmoke,

  background: palette.white,
  backgroundInverse: palette.black,

  text: palette.black,
  textInverse: palette.white,

  mutedText: palette.stone,
  mutedTextInverse: palette.steel,

  button: palette.tealPrimaryAccessible,
  buttonHover: mix(palette.tealPrimaryAccessible, palette.black, 0.75),
  buttonActive: mix(palette.tealPrimaryAccessible, palette.black, 0.6),

  buttonInverse: palette.tealPrimaryInverse,
  buttonInverseHover: mix(palette.tealPrimaryInverse, palette.black, 0.75),
  buttonInverseActive: mix(palette.tealPrimaryInverse, palette.black, 0.6),

  buttonInverseOnColor: palette.white,
  buttonInverseOnColorActive: mix(palette.white, palette.black, 0.6),

  textLink: palette.tealPrimaryAccessible,
  textLinkInverse: palette.tealPrimaryInverse,

  border: palette.steel,
  borderInverse: palette.stone,

  formControlBorder: palette.stone,
  formControlBorderInverse: palette.steel,

  // The contrast ratios between these are below 4.5, but that is allowed for disabled elements
  disabledText: palette.steel,
  disabledTextInverse: palette.steel,
  disabledBackground: palette.storm,
  disabledBackgroundInverse: palette.stone,

  selected: palette.tealPrimaryAccessible,
  selectedInverse: palette.tealPrimaryInverse,

  attention: palette.violetPrimary,

  danger: palette.red,
  warning: palette.orange,
  success: palette.greenPrimary,
  info: palette.tealPrimaryAccessible,

  sectionBackground: palette.storm,
}

const navigation = {
  background: palette.black,
  title: base.textInverse,
  backButton: base.textInverse,
  info: base.mutedTextInverse,
}

const calendar = {
  bar: palette.violetPrimary,
  disabled: palette.whiteAlpha33,
  selected: palette.tealPrimaryProduct,
  background: palette.blackAlpha60,
}

export default deepFreeze({
  base,
  navigation,
  calendar,
})
