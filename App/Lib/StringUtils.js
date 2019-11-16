// @flow

import sha256 from 'crypto-js/sha256'

export const getFirstName = (name: string) => name.split(' ')[0]

export const getSurname = (name: string) =>
  name.split(' ').length > 1 ? name.split(' ').pop() : ''

export const getInitials = (name: string) =>
  `${getFirstName(name).charAt(0)}${getSurname(name).charAt(0)}`

export const toTitleCase = (words: string) => {
  const wordArray: string[] = words.toLowerCase().split(' ')
  const titleCaseWordArray = wordArray.map(
    word => word.charAt(0).toUpperCase() + word.slice(1)
  )
  return titleCaseWordArray.join(' ')
}

export const hash = (word: string) => sha256(word).toString()

/* This function is adapted from https://gist.github.com/jed/982883 */
/* eslint-disable */
export const uniqueId = (
  a: any // placeholder
) => {
  return a // if the placeholder was passed, return
    ? // a random number from 0 to 15
      (
        a ^ // unless b is 8,
        ((Math.random() * // in which case
          16) >> // a random number from
          (a / 4))
      ) // 8 to 11
        .toString(16) // in hexadecimal
    : // or otherwise a concatenated string:
      '10000000-1000-4000-80000000-100000000000'.replace(
        // replacing
        /[018]/g, // zeroes, ones, and eights with
        uniqueId // random hex digits
      )
}
/* eslint-enable */
