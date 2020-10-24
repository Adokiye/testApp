import React from 'react';
import { Text } from 'react-native';
import processStyle from './styles';

export const CustomText = ({ children, style = {}, ...params }) => {
  const styles = processStyle(params);

  return (
    <Text selectable={params.selectable || false} style={[styles.text, style]}>
      {children}
    </Text>
  );
};
