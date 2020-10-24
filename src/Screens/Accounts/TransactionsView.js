import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import moment from 'moment';
import { connect } from 'react-redux';

import styles from './styles/styles.transactionsView';
import { groupBy } from '../../helpers/libs';
import { fetchWalletTransactions } from '../../actions/account';
import TransactionCard from '../../components/Cards/TransactionCard';
import ShadowView from '../../components/ShadowView';
import { numToMoneyString } from '../../helpers/thousandSeparator';

/**
 * @todo
 * Add error message to be displayed if walletId === null
 */
const TransactionsView = props => {
  const { navigation, walletTransactions } = props;
  const [isAppLoading, setIsAppLoading] = useState(true);
  const walletId = navigation.getParam('walletId', null);

  const fetchData = async () => {
    if (!walletTransactions[walletId]) {
      await props.fetchWalletTransactions(walletId);
    }
    setIsAppLoading(false);
  };

  const refreshData = () => {
    /**
     * for pagination support,
     * query API with parameter indicating current page
     * Also, when a response comes in, check if there are remaining pages.
     * This would allow the component know when to display a loader at the end of the list
     */
  };

  const groupTransactions = allWalletTransactions => {
    const transactions = allWalletTransactions[walletId] || [];
    const datedTransactions = transactions.map(transaction => {
      return {
        ...transaction,
        date: moment(transaction.pub_date).format('DD MMMM, YYYY'),
      };
    });

    const groupedObject = groupBy(datedTransactions, 'date');
    const dates = Object.keys(groupedObject);

    const result = [];
    dates.forEach(date => {
      result.push({
        title: date,
        data: groupedObject[date],
      });
    });

    return result;
  };

  const prepareTransactionList = transactionsGroups => {
    return transactionsGroups.map((transGroup, index) => (
      <View style={styles.transGroupContainer} key={index}>
        <Text style={styles.transTitle}>{transGroup.title}</Text>
        <ShadowView style={styles.transGroup}>
          {transGroup.data.map((trans, childIndex) => (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() =>
                navigation.navigate('TransactionDetails', {
                  transaction: trans,
                })
              }
              key={trans + childIndex}>
              <TransactionCard
                type={
                  trans.tx_action.indexOf('credit') !== -1 ? 'credit' : 'debit'
                }
                clientName={trans.tx_note}
                bottomLeft={moment(trans.pub_date_actual).format('h:mm A')}
                topRight={numToMoneyString(trans.trans_amount)}
              />
            </TouchableOpacity>
          ))}
        </ShadowView>
      </View>
    ));
  };

  const groupedTransactions = groupTransactions(walletTransactions);
  const transactionList = prepareTransactionList(groupedTransactions);

  useEffect(() => {
    fetchData();
  });

  return (
    <ScrollView>
      {isAppLoading ? (
        <ActivityIndicator style={styles.activityIndicator} size="large" />
      ) : (
        <View style={styles.container}>{transactionList}</View>
      )}
    </ScrollView>
  );
};

const mapStateToProps = state => {
  const {
    account: { walletTransactions },
  } = state;
  return {
    walletTransactions,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchWalletTransactions: walletId =>
      dispatch(fetchWalletTransactions(walletId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TransactionsView);
