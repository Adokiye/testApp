import React from 'react';
import { View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    borderRadius: 5,
    backgroundColor: '#fff',
    elevation: 2,
  },
});

const ShadowView = ({ children, style = {} }) => {
  return <View style={[styles.container, style]}>{children}</View>;
};

export default ShadowView;
