import React, { Component } from 'react';
import { View, Image, TextInput } from 'react-native';

export default class LoginInput extends Component {
  onTextInput = value => {
    if (this.props.onInput) {
      this.props.onInput(value);
    }
  };

  render() {
    const {
      type,
      secure,
      placeholder,
      icon,
      iconWidth,
      iconHeight,
    } = this.props;

    return (
      <View
        style={{
          position: 'relative',
          height: 48,
          borderRadius: 4,
          paddingHorizontal: 16,
          borderWidth: 2,
          borderColor: 'white',
          marginBottom: 24,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        {icon && (
          <Image
            source={icon}
            resizeMethod="auto"
            resizeMode="cover"
            style={{ width: iconWidth, height: iconHeight, marginRight: 16 }}
          />
        )}
        <TextInput
          style={{
            flex: 1,
            fontSize: 15,
            fontFamily: 'Gilroy-Bold',
            color: 'white',
          }}
          selectionColor="white"
          autoCapitalize="none"
          keyboardType={type}
          secureTextEntry={secure}
          placeholder={placeholder}
          placeholderTextColor="white"
          onChangeText={this.onTextInput}
        />
      </View>
    );
  }
}
