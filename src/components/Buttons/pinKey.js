import React, { Component } from 'react';
import { Text, TouchableHighlight, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import PinKeyStyle from './styles/pinKey.style';
import colors from '../../helpers/colors';

class PinKey extends Component {
  onKeyPress = () => {
    const { onPress = () => {} } = this.props;
    onPress(this.props.value);
  };

  render() {
    const { value, disabled = false } = this.props;

    return (
      <TouchableHighlight
        onPress={() => this.onKeyPress()}
        disabled={disabled}
        style={PinKeyStyle.container}
        underlayColor="#fa4a84"
        activeOpacity={0.85}>
        <View style={PinKeyStyle.view}>
          {value === 'backspace' ? (
            <Ionicons
              size={27}
              color={colors.PRIMARY_PURPLE}
              name="md-arrow-back"
            />
          ) : (
            <Text style={PinKeyStyle.keytext}>{value}</Text>
          )}
        </View>
      </TouchableHighlight>
    );
  }
}

export default PinKey;
