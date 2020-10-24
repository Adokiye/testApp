import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';

import styles from './styles';

const ButtonOutline = ({ text, onPress = () => {} }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={onPress}
      style={styles.container}>
      <View>
        <Text style={styles.text}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ButtonOutline;
