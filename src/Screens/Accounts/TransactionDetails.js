import React from 'react';
import { View, StatusBar, SafeAreaView, ScrollView } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';

import styles from './styles/styles.transactionDetails';
import CloseButton from '../../components/Buttons/CloseButton';
import { numToMoneyString } from '../../helpers/thousandSeparator';
import { CustomText } from '../../components/Text';
import LineBreak from '../../components/LineBreak';

const TransactionDetails = ({ navigation }) => {
  const transaction = navigation.getParam('transaction', {});
  const {
    trans_amount,
    tx_note,
    child_category,
    pub_date,
    tx_ref,
    is_done,
  } = transaction;

  const status = is_done ? 'Completed' : 'Pending';
  return (
    <View style={styles.container}>
      <CloseButton />
      <SafeAreaView style={styles.flex1}>
        <ScrollView contentContainerStyle={styles.flex1}>
          <View style={styles.content}>
            <StatusBar barStyle="dark-content" />
            <View style={styles.topArea}>
              <View style={styles.topIcon}>
                <MaterialIcon name="account-balance" color="#fff" size={35} />
              </View>
              <CustomText style={styles.amount}>
                {numToMoneyString(trans_amount)}
              </CustomText>
              <CustomText style={styles.description}>{tx_note}</CustomText>
              {child_category !== '' && (
                <View style={styles.category}>
                  <CustomText style={styles.categoryText}>
                    {child_category}
                  </CustomText>
                </View>
              )}
            </View>
            <LineBreak />
            <View style={styles.bottomArea}>
              <View style={styles.infoPair}>
                <CustomText label>Paid by: </CustomText>
              </View>
              <View style={styles.infoPair}>
                <CustomText label>Reference:</CustomText>
                <CustomText selectable medium>
                  {tx_ref}
                </CustomText>
              </View>
              <View style={styles.infoPair}>
                <CustomText label>Description: </CustomText>
                <CustomText medium>{tx_note}</CustomText>
              </View>
              <View style={styles.infoPair}>
                <CustomText label>Status: </CustomText>
                <CustomText medium>{status}</CustomText>
              </View>

              <View style={styles.infoPair}>
                <CustomText label>Date: </CustomText>
                <CustomText medium>
                  {moment(pub_date).format('D MMMM, Y')}
                  {' - '}
                  {moment(pub_date).format('h:mm A')}
                </CustomText>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default TransactionDetails;
