import React from 'react';
import { View } from 'react-native';

const ProgressMeter = ({ color = '', percentageComplete = 0 }) => {
  if (percentageComplete > 100) {
    percentageComplete = 100;
  }
  const styles = {
    parentMeter: {
      height: 5,
      backgroundColor: color + '35',
      borderRadius: 5,
    },
    insideMeter: {
      width: `${percentageComplete}%`,
      height: 5,
      borderRadius: 5,
      backgroundColor: color,
    },
  };

  return (
    <View style={styles.parentMeter}>
      <View style={styles.insideMeter} />
    </View>
  );
};

export default ProgressMeter;
