// @flow

export const slightFadeInUp = {
  from: {
    opacity: 0.5,
    translateY: 10,
  },
  to: {
    opacity: 1,
    translateY: 0,
  },
}

export const rotateUp = {
  from: {
    rotate: '0deg',
  },
  to: {
    rotate: '-180deg',
  },
}

export const rotateDown = {
  from: {
    rotate: '-180deg',
  },
  to: {
    rotate: '0deg',
  },
}

export const slideOutUp = {
  from: {
    height: 100,
    translateY: 0,
  },
  to: {
    height: 0,
    translateY: -700,
  },
}
