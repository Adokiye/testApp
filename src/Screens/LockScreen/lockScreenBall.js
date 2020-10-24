import React, {Component} from 'react';
import {View} from 'react-native';
import LockPinBall from '../../components/PinBall/lockPinBall';

import LockScreenBallStyle from './styles/lockScreenBall';

class LockScreenBall extends Component {
  render() {
    // const {listValue} = this.props;

    return (
      <View style={LockScreenBallStyle.container}>
        <View style={LockScreenBallStyle.view}>
          <LockPinBall />
          <LockPinBall />
          <LockPinBall />
          <LockPinBall />
        </View>
      </View>
    );
  }
}

export default LockScreenBall;
