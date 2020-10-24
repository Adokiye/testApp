import React from 'react';
import { View } from 'react-native';

import PinKey from '../../../components/Buttons/pinKey';
import styles from './styles';

const Keypad = ({
  value,
  onKeyPress = () => {},
  limit,
  onComplete = () => {},
}) => {
  const keys = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '',
    '0',
    'backspace',
  ];

  const onPress = char => {
    let newValue = '';
    if (char === 'backspace') {
      newValue = value.substring(0, value.length - 1);
    } else {
      if (value.length === limit) {
        return;
      }
      newValue = value + char;
    }

    onKeyPress(newValue);
    if (newValue.length === limit) {
      onComplete(newValue);
    }
  };

  return (
    <View style={styles.container}>
      {keys.map(char => {
        return (
          <View style={styles.button}>
            <PinKey
              onPress={() => onPress(char)}
              disabled={char === ''}
              value={char}
            />
          </View>
        );
      })}
    </View>
  );
};

export default Keypad;
