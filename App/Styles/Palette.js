// @flow

import deepFreeze from 'deep-freeze'

const palette = {
  transparent: '#ffffff00',
  whiteAlpha70: '#ffffffB3',
  whiteAlpha33: '#ffffff55',
  whiteAlpha20: '#ffffff33',
  blackAlpha60: '#00000060',
  blackAlpha20: '#00000020',

  black: '#000000',
  stone: '#767676',
  steel: '#bbbbbb',
  storm: '#e5e5e5',
  white: '#ffffff',

  greenPrimary: '#65a500',
  greenSecondary: '#00843d',

  tealPrimaryAccessible: '#008392',
  tealPrimaryProduct: '#0097a9',
  tealPrimaryInverse: '#4cd6e6',
  tealSecondary: '#00a0d0',

  crimsonPrimary: '#9f0737',
  crimsonSecondary: '#6c0439',

  violetPrimary: '#981d97',
  violetSecondary: '#5e366e',

  gold: '#d4b127',

  red: '#ec040f',
  orange: '#ff600a',

  mineShaft: '#333333',

  woodSmoke: '#15181D',
}

export default deepFreeze(palette)
