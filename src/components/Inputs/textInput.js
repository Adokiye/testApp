import React from 'react';
import {TextInput} from 'react-native';
import TextInputStyle from './styles/textInput.style';

const TextInputs = props => {
  const {
    type,
    secure,
    placeholder,
    onInputFocus,
    onInputBlur,
    onTextInput,
  } = props;
  return (
    <TextInput
      style={TextInputStyle.container}
      selectionColor="#fa4a84"
      autoCapitalize="none"
      keyboardType={type}
      secureTextEntry={secure}
      placeholder={placeholder}
      placeholderTextColor="#dcdcee"
      onFocus={onInputFocus}
      onBlur={onInputBlur}
      onChangeText={onTextInput}
    />
  );
};

export default TextInputs;
