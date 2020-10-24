import React from 'react';
import { TextInput } from 'react-native';
import TextInputStyle from './styles/textInput.style';

const DashboardTextInput = props => {
  const {
    type,
    placeholder,
    onInputFocus,
    onInputBlur,
    onTextInput,
    editable,
    autoFocus,
    value,
  } = props;
  return (
    <TextInput
      style={TextInputStyle.container}
      keyboardType={type}
      placeholder={placeholder}
      placeholderTextColor="#9CA0A5"
      onFocus={onInputFocus}
      onBlur={onInputBlur}
      editable={editable}
      autoFocus={autoFocus}
      onChangeText={onTextInput}
      value={value}
    />
  );
};

export default DashboardTextInput;
