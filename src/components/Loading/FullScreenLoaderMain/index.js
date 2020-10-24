import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { CustomText } from '../../Text';
import styles from './styles';

const FullScreenLoaderMain = () => {
  return (
    <View style={styles.loaderContainer}>
      <ActivityIndicator size="large" />
      <CustomText style={styles.loaderText}>Processing...</CustomText>
    </View>
  );
};

export default FullScreenLoaderMain;
