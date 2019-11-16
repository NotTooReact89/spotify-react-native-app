//
// @flow
//
// The naming standard for fonts is [camelcase name]-[Weight][Style], eg Helvetica-RegularItalic
// If there is no style then ommit it, eg Helvetica-Regular
//
// We often have to do platform specific names because:
// - Fonts on iOS reference the INTERNAL FONT NAME INSIDE the font
// - Fonts on Android (and every other platform) reference the FILENAME of the font
// and some of our fonts don't have internal / external matching names.
//
// If you're having trouble getting the exact internal name of the font for iOS, add
// the following code to your AppDelegate didFinishLaunchingWithOptions method
//
// for (NSString* family in [UIFont familyNames])
// {
//   NSLog(@"%@", family);
//   for (NSString* name in [UIFont fontNamesForFamilyName: family])
//   {
//     NSLog(@" %@", name);
//   }
// }
//

import deepFreeze from 'deep-freeze'

const fonts: {
  base: {
    regular: string,
    bold: string,
  },
  voice: {
    blackItalic: string,
  },
} = {
  base: {
    regular: 'Lato-Light',
    bold: 'Lato-Light',
  },
  voice: {
    blackItalic: 'MagistralC-Bold',
  },
}

export default deepFreeze(fonts)
