import {
  NavigationActions,
  StackActions,
  type getNavigation,
  type NavigationState,
} from 'react-navigation'

let navigator: getNavigation<NavigationState, {}>

function setAppNavigator(navigatorRef: getNavigation<NavigationState, {}>) {
  navigator = navigatorRef
}

function reset(routeName: string) {
  navigator.dispatch(
    StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName })],
    })
  )
}

export default {
  setAppNavigator,
  reset,
}
