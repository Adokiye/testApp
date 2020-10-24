import React from 'react';
import { View } from 'react-native';
import styles from './styles';
import colors from '../../../helpers/colors';

const InputArea = ({ boxCount = 4, value, error }) => {
  const renderBoxes = () => {
    const boxes = [];
    const borderColor = error ? '#FF6C6C' : colors.LIGHT_GREEN_01;
    for (let i = 0; i < boxCount; i++) {
      const boxValue = value[i];
      const extraStyles = boxValue ? { borderColor } : {};

      boxes.push(
        <View style={[styles.inputBox, extraStyles]}>
          {boxValue && <View style={styles.dot} />}
        </View>,
      );
    }
    return boxes;
  };

  return <View style={styles.container}>{renderBoxes()}</View>;
};

export default InputArea;
