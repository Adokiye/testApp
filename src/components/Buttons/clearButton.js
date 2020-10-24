import React, {Component} from 'react';
import {Image, TouchableHighlight, View} from 'react-native';
import ClearButtonStyle from './styles/clearButton.style';

class Clear extends Component {
  onKeyPress = () => {
    this.props.onClear();
  };

  render() {
    return (
      <TouchableHighlight
        onPress={() => this.onKeyPress()}
        style={ClearButtonStyle.container}
        underlayColor="#fa4a84"
        activeOpacity={0.85}>
        <View style={ClearButtonStyle.clearView}>
          <Image
            source={require('../../assets/icons/backspace.png')}
            resizeMethod="auto"
            resizeMode="center"
          />
        </View>
      </TouchableHighlight>
    );
  }
}

export default Clear;
