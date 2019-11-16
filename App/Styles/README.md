
### Styles Folder
All of the basic building blocks of the styles for the app are stored here.

Instead of hard coding pixel values for every margin and padding in our JSX, we
instead use the space class with t-shirt classes.  So instead of:
  `margin: 8`
we use
  `margin: space.sm`

We use the same kind of t-shirt classes for font sizes.  So instead of:
  `fontSize: 24`
we use
  `fontSize: fontSize.lg`


### Methodology
This design means that the designs and implementations are simple, consistent, 
and can all be easily managed from a single stylesheet.

These values all tend to follow a geometric progression, each size is twice 
the size of the prior one.  The only exception to this is the font sizes which 
were hand tuned for readability and clarity.  What is consistent is the clear 
hierachy visible in these sizings.

Anywhere in the the app that specific font, margin, padding sizes are used is
a design code smell.


### Differences to React Web styles
Besides the obvious (flow instead of typescript) we've removed the following code as it didn't apply:
 - breakpoints
 - shadows


### React Native specific code
We've added platforms which gives us the following helper methods for the 
current device:
 - isPortrait (returns true if the screen is in portrait mode)
 - isLandscape (returns true if the screen is in landscape mode)
 - isTablet (returns true for tablets, eg iPads)
 - isPhone (returns true for phone sized devices, eg iPhones, iPod Touch)

These are intended to be used for cases where you need to implement different 
behaviour on a device - for instance using a master/detail split view instead 
of a master screen with child detail screen.

They are NOT intended to be used to layout the screen horizontally on a tablet
and vertically on a phone - you can do this with flexbox properties! Using 
flexbox to do it will also be significantly faster because it executes entirely 
in native code and doesn't have to cross the bridge to javascript and back.



