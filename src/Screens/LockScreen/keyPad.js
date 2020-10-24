import React, {Component} from 'react';
import {View} from 'react-native';

import PinKey from '../../components/Buttons/pinKey';
import ClearButton from '../../components/Buttons/clearButton';

import KeyPadStyle from './styles/keyPad';

class Keypad extends Component {
  onKeyPress = value => {
    this.props.onKeyPress(value);
  };

  onClear = () => {
    this.props.onClear();
  };

  render() {
    return (
      <View style={KeyPadStyle.container}>
        <View style={KeyPadStyle.viewContainer}>
          <View style={KeyPadStyle.view}>
            <PinKey onPress={this.onKeyPress} value="1" />
            <PinKey onPress={this.onKeyPress} value="2" />
            <PinKey onPress={this.onKeyPress} value="3" />
          </View>
          <View style={KeyPadStyle.view}>
            <PinKey onPress={this.onKeyPress} value="4" />
            <PinKey onPress={this.onKeyPress} value="5" />
            <PinKey onPress={this.onKeyPress} value="6" />
          </View>
          <View style={KeyPadStyle.view}>
            <PinKey onPress={this.onKeyPress} value="7" />
            <PinKey onPress={this.onKeyPress} value="8" />
            <PinKey onPress={this.onKeyPress} value="9" />
          </View>
          <View style={KeyPadStyle.zeroView}>
            <PinKey onPress={this.onKeyPress} value="0" />
            <ClearButton onClear={this.onClear} />
          </View>
        </View>
      </View>
    );
  }
}

export default Keypad;
