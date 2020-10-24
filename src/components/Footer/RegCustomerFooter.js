/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {Text, Animated, Easing} from 'react-native';

import ProspaButton from '../../components/Buttons/prospaButton';

class RegisterCustomerFooter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appearance: new Animated.Value(0),
    };
  }

  componentDidUpdate() {
    if (this.props.viewCount > 0) {
      Animated.timing(this.state.appearance, {
        toValue: 1,
        duration: 300,
        easing: Easing.ease,
      }).start();
    } else {
      Animated.timing(this.state.appearance, {
        toValue: 0,
        duration: 300,
        easing: Easing.ease,
      }).start();
    }
  }

  render() {
    const opacity = this.state.appearance.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0],
    });
    const position = this.state.appearance.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -75],
    });

    const height = this.state.appearance.interpolate({
      inputRange: [0, 1],
      outputRange: [100, 0],
    });

    return (
      <Animated.View
        style={{height: height, paddingTop: 10, paddingHorizontal: 24}}>
        <Animated.View
          style={{
            flex: 1,
            position: 'relative',
            left: 0,
            bottom: position,
            opacity: opacity,
          }}>
          <Text
            style={{
              fontSize: 15,
              lineHeight: 15,
              fontFamily: 'Gilroy-Medium',
              textAlign: 'center',
              color: '#5d6262',
              marginBottom: 10,
            }}>
            or do you have an account?
          </Text>
          <ProspaButton handleClick={() => this.props.login()} text="log in" />
        </Animated.View>
      </Animated.View>
    );
  }
}

export default RegisterCustomerFooter;
