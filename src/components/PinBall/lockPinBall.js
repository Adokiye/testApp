import React from 'react';
import {View} from 'react-native';
import LockPinBallStyle from './styles/lockPinBall.styles';

const LockPinBall = props => {
  // //console.log(props, '<<<<<<PROPS>>>>>>');
  // const {value} = this.props;
  let diameter = 8;
  return (
    <View style={LockPinBallStyle().container}>
      <View style={LockPinBallStyle(diameter).ball} />
    </View>
  );
};

export default LockPinBall;
