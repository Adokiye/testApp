import React from 'react';
import {View, Text} from 'react-native';

import styles from './styles';
import ShadowView from '../../../components/ShadowView';

const SubAccountInfoCard = ({type, bank, info, subscript, notice}) => {
  return (
    <ShadowView style={styles.container}>
      <View>
        <Text style={styles.type}>{type}</Text>
        <Text style={styles.bank}>{bank}</Text>
        <Text>
          <Text style={styles.mainInfo}>{info}</Text>
          <Text style={styles.subscript}>{subscript}</Text>
        </Text>
        <Text style={styles.notice}>{notice}</Text>
      </View> 
    </ShadowView>
  );
};

export default SubAccountInfoCard;
