import React from 'react';
import {View, TextInput} from 'react-native';

import styles from './styles';

class InputBox extends React.Component {
  state = {
    inputFocusStyle: {},
  };

  onFocus = () => {
    this.setState({
      inputFocusStyle: styles.inputFocusStyle,
    });
  };

  onRemoveFocus = () => {
    this.setState({
      inputFocusStyle: {},
    });
  };

  render() {
    const {value, fieldLabel, placeholder, ...textInputProps} = this.props;
    const {inputFocusStyle} = this.state;

    return (
      <View>
        <TextInput
          {...textInputProps}
          onChangeText={this.props.onChange}
          value={value}
          style={[styles.inputBox, inputFocusStyle]}
          onFocus={this.onFocus}
          onEndEditing={this.onRemoveFocus}
          autoCompleteType="off"
          textContentType="none"
          placeholder={placeholder}
        />
      </View>
    );
  }
}

export default InputBox;
