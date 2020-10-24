import React from 'react';
import { TouchableOpacity, View, Text, ActivityIndicator } from 'react-native';

import styles from './styles';

const ButtonMain = ({ text, onPress = () => {}, isLoading, disabled }) => {
  let textStyles = {};
  if (disabled) {
    textStyles = {
      opacity: 0.6,
    };
  }

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      disabled={disabled || isLoading}
      style={styles.container}>
      <View style={styles.content}>
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={[styles.text, textStyles]}>{text}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default ButtonMain;
