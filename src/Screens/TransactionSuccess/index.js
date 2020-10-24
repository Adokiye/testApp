import React from 'react';
import { View, SafeAreaView, StatusBar } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import { CustomText } from '../../components/Text';
import LineBreak from '../../components/LineBreak';
import colors from '../../helpers/colors';
import styles from './styles';
import ButtonMain from '../../components/Buttons/buttonMain';
import { numToMoneyString } from '../../helpers/thousandSeparator';

const TransactionSuccess = ({ navigation, transactionDetails, onDismiss }) => {
  // Arguments can be passed as props or as navigation params
  if (!transactionDetails) {
    transactionDetails = navigation.getParam('transactionDetails', {});
    onDismiss = navigation.getParam('onDismiss', () => {});
  }

  const {
    amount,
    accountName,
    accountNumber,
    bankName,
    transferRef,
  } = transactionDetails;

  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView />
      <StatusBar barStyle="dark-content" />
      <View style={styles.contentArea}>
        <View style={styles.topSection}>
          <Ionicons
            size={70}
            color={colors.MEDIUM_GREEN_01}
            name="ios-checkmark-circle"
          />
          <CustomText style={styles.title}>Payment successful</CustomText>
          <CustomText style={styles.amount}>
            {numToMoneyString(amount)}
          </CustomText>
        </View>
        <LineBreak />
        <View style={styles.bottomSection}>
          <View style={styles.infoSection}>
            <CustomText label>Date</CustomText>
            <CustomText style={styles.infoText}>
              {moment().format('D MMMM, YYYY')}
            </CustomText>
          </View>
          <View style={styles.infoSection}>
            <CustomText label>Time</CustomText>
            <CustomText style={styles.infoText}>
              {moment().format('h:mm A')}
            </CustomText>
          </View>
          <View style={styles.infoSection}>
            <CustomText label>Paid to</CustomText>
            <CustomText style={styles.infoText}>{accountName}</CustomText>
          </View>
          <View style={styles.infoSection}>
            <CustomText label>Account Number</CustomText>
            <CustomText style={styles.infoText}>{accountNumber}</CustomText>
          </View>
          <View style={styles.infoSection}>
            <CustomText label>Bank</CustomText>
            <CustomText style={styles.infoText}>{bankName}</CustomText>
          </View>
          {transferRef && (
            <View style={styles.infoSection}>
              <CustomText label>Transfer Ref</CustomText>
              <CustomText style={styles.infoText}>{transferRef}</CustomText>
            </View>
          )}
        </View>
        <View style={styles.dismissButton}>
          <ButtonMain onPress={onDismiss} text="Got it" />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default TransactionSuccess;
