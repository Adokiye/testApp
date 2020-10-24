import React from 'react';
import {View, Text} from 'react-native';

import styles from './styles';

const InvoiceCard = ({invoiceNumber, clientName, amount, dueDate}) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftContent}>
        <Text style={styles.text}>{clientName}</Text>
        <Text style={[styles.text, styles.invoiceNumber]}>{invoiceNumber}</Text>
      </View>
      <View style={styles.rightContent}>
        <Text style={styles.text}>{amount}</Text>
        <Text style={[styles.text, styles.dueDate]}>{dueDate}</Text>
      </View>
    </View>
  );
};

export default InvoiceCard;
