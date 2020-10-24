import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, RefreshControl } from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';

import styles from './styles/styles.summaryView';
import AccountSummary from '../../components/Cards/AccountSummary';
import { numToMoneyString } from '../../helpers/thousandSeparator';
import { prepareSummaryData } from '../../helpers/libs';
import { getWalletInflowOutflow as getFlow } from '../../actions/account';

const SummaryView = ({
  navigation,
  walletId,
  selectedBusinessAccount,
  walletInflowOutflow,
  getWalletInflowOutflow,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  if (!walletId) {
    navigation.navigate('Account');
  }

  const { biz_account_wallet_details } = selectedBusinessAccount;
  const selectedWallet = biz_account_wallet_details.find(
    wallet => wallet.biz_wallet_id === walletId,
  );
  const selectedFlow = walletInflowOutflow[walletId] || {};
  const {
    available_balance,
    partner_bank_name,
    biz_account_number,
  } = selectedWallet;
  const summaryData = prepareSummaryData(selectedFlow);

  const fetchData = async () => {
    await getWalletInflowOutflow(walletId);
    setIsLoading(false);
  };

  useEffect(() => {
    if (!walletInflowOutflow[walletId]) {
      fetchData();
    }
  });

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <View style={styles.infoContainer}>
        <View>
          <Text style={styles.label}>balance</Text>
          <Text style={styles.infoText}>
            {numToMoneyString(available_balance)}
          </Text>
        </View>
        <View>
          <Text style={styles.label}>account number</Text>
          <Text style={styles.infoText}>{biz_account_number}</Text>
        </View>
        <View>
          <Text style={styles.label}>bank name</Text>
          <Text style={styles.infoText}>{partner_bank_name}</Text>
        </View>
      </View>
      <AccountSummary
        isLoading={isLoading}
        style={styles.summaryContainer}
        month={moment().format('MMMM')}
        data={summaryData}
      />
    </ScrollView>
  );
};

const mapStateToProps = state => {
  const {
    account: { selectedBusinessAccount, walletInflowOutflow },
  } = state;
  return {
    selectedBusinessAccount,
    walletInflowOutflow,
  };
};

const mapDispatchToProps = {
  getWalletInflowOutflow: getFlow,
};

export default connect(mapStateToProps, mapDispatchToProps)(SummaryView);
