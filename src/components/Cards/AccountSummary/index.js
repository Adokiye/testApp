import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

import styles from './styles';
import ShadowView from '../../ShadowView';
import ProgressMeter from '../../ProgressMeter';

const AccountSummary = ({
  month = '',
  data = [],
  isLoading = false,
  style: extraStyle = {},
}) => {
  return (
    <ShadowView style={[styles.container, extraStyle]}>
      <Text style={styles.subTitle}>Account Summary</Text>
      <Text style={styles.mainTitle}>{month} Summary</Text>
      {data.map((item, index) => (
        <View style={styles.summaryBar} key={index}>
          <View style={styles.labelRow}>
            <Text style={styles.labelLeft}>{item.label}</Text>
            {isLoading ? (
              <ActivityIndicator />
            ) : (
              <Text style={styles.labelRight}>{item.value}</Text>
            )}
          </View>
          <ProgressMeter
            color={item.color}
            percentageComplete={item.percentageComplete}
          />
        </View>
      ))}
    </ShadowView>
  );
};

export default AccountSummary;
