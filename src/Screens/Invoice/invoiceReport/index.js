import React from 'react';
import {View, Text} from 'react-native';

import styles from './styles';

const InvoiceReport = ({label, value, color = 'black'}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Text style={[styles.value, {color}]}>{value}</Text>
    </View>
  );
};

export default InvoiceReport;
