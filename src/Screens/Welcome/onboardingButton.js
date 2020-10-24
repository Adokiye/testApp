import React, {Component} from 'react';
import {Animated, View, Easing, Dimensions} from 'react-native';
import ProspaButton from '../../components/Buttons/prospaButton';

import WelcomeButton from './styles/styles.button';

const screen = Dimensions.get('screen');

class ButtonControl extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appearance: new Animated.Value(0),
    };
  }

  componentDidUpdate() {
    if (this.props.viewCount === 2) {
      Animated.timing(this.state.appearance, {
        toValue: 1,
        duration: 300,
        easing: Easing.ease,
      }).start();
    }
  }

  handleLoginClick = () => {
    this.props.handleLoginClick && this.props.handleLoginClick();
  };

  handleRegisterClick = () => {
    this.props.handleRegisterClick && this.props.handleRegisterClick();
  };

  render() {
    const {navigation} = this.props;


    const opacity = this.state.appearance.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    });
    const position = this.state.appearance.interpolate({
      inputRange: [0, 1],
      outputRange: [-72, 0],
    });

    return (
      <Animated.View
        style={{
          backgroundColor: 'white',
          position: 'absolute',
          bottom: position,
          left: 0,
          opacity: opacity,
          width: screen.width,
          zIndex: 10,
        }}>
        <View style={WelcomeButton().controlView}>
          <View style={WelcomeButton().login}>
            <ProspaButton
              text="log in"
              flex={1}
              handleClick={this.handleLoginClick}
            />
          </View>
          <View style={WelcomeButton().register}>
            <ProspaButton
              text="register"
              flex={1}
              gradient={true}
              handleClick={this.handleRegisterClick}
            />
          </View>
        </View>
      </Animated.View>
    );
  }
}

export default ButtonControl;
