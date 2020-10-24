import React from 'react';
import { View, Text } from 'react-native';

import styles from './styles';
import colors from '../../../helpers/colors';

const ProcessedAvatar = ({ text, backgroundColor }) => {
  return (
    <View style={[styles.initialsOval, { backgroundColor }]}>
      <Text style={styles.initialsText}>{text}</Text>
    </View>
  );
};

const TransactionCard = ({
  clientName,
  topRight,
  bottomLeft,
  bottomRight,
  type,
  style: customStyle = {},
}) => {
  const abbrev = clientName[0];
  let color = colors.LIGHT_PURPLE_01;
  let amountPrefix = '- ';
  let amountStyle = {};
  if (type === 'credit') {
    color = '#3cba54';
    amountStyle = {
      color,
    };
    amountPrefix = '+ ';
  }

  return (
    <View style={[styles.container, customStyle]}>
      <ProcessedAvatar text={abbrev} backgroundColor={color} />

      <View style={styles.infoArea}>
        <View style={styles.contentRow}>
          <Text style={styles.companyNameText} numberOfLines={1}>
            {clientName}
          </Text>
          <Text style={[styles.topRight, amountStyle]}>
            {amountPrefix}
            {topRight}
          </Text>
        </View>
        <View style={styles.contentRow}>
          <Text style={styles.text}>{bottomLeft}</Text>
          <Text style={[styles.text, styles.bottomRight]}>{bottomRight}</Text>
        </View>
      </View>
    </View>
  );
};

export default TransactionCard;
