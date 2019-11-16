// @flow

import React from 'react'
import { View, TouchableHighlight } from 'react-native'
import Icon from '../Icon'
import Text from '../Text'
import Styles from './BannerStyles'
import { Colors } from '../../Styles'
import { TestProps, CustomAnimations } from '../../Lib'

const Animatable = require('react-native-animatable')

const { slideOutUp } = CustomAnimations

Animatable.initializeRegistryWithDefinitions({
  slideOutUp,
})

const animationDuration = 1000

export type Props = {
  text: string,
  onPress: () => void,
  testId?: string,
}

class Banner extends React.Component<Props, *> {
  props: Props
  banner: ?Animatable.View

  handleDismiss = () => {
    if (this.banner) {
      this.banner.slideOutUp(animationDuration).then(this.props.onPress)
    }
  }

  render() {
    const { text } = this.props
    const testId = this.props.testId ? `${this.props.testId}_` : ''

    return (
      <Animatable.View
        ref={input => {
          this.banner = input
        }}
        duration={animationDuration}
        animation="slideInDown"
        {...TestProps(`${testId}banner_container`)}
      >
        <View style={Styles.container}>
          <View style={Styles.contentContainer}>
            <Icon type="infoInverse" />
            <Text
              inverse
              style={Styles.text}
              {...TestProps(`${testId}banner_txtMessage`)}
            >
              {text}
            </Text>
          </View>
          <TouchableHighlight
            style={Styles.iconContainer}
            onPress={this.handleDismiss}
            underlayColor={Colors.base.transparent}
            {...TestProps(`${testId}banner_btnClose`)}
          >
            <Icon type="closeInverse" />
          </TouchableHighlight>
        </View>
      </Animatable.View>
    )
  }
}

export default Banner
