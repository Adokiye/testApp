import React, { Component } from 'react';
import { Text, View, TouchableOpacity, SafeAreaView } from 'react-native';

import styles from './styles/styles.accoutdetails';
import TransactionsView from './TransactionsView';
import BackButton from '../../components/Buttons/BackButton';
import SummaryView from './SummaryView';

class AccountDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      walletId: this.props.navigation.getParam('walletId', null),
      accountName: this.props.navigation.getParam('accountName', ''),
      accountNumber: this.props.navigation.getParam('accountNumber', ''),
      balance: this.props.navigation.getParam('balance', ''),
      active: '',
      bar: 'transactions',
    };
  }

  getTabDisplay = tabName => {
    const { bar } = this.state;
    if (bar !== tabName) {
      return 'none';
    }
    return 'flex';
  };

  render() {
    const { walletId, accountName, accountNumber } = this.state;
    // return <View />;

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <BackButton
            onPress={() => this.props.navigation.navigate('Accounts')}
          />
          <Text numberOfLines={1} style={styles.title}>
            {accountName} Account
          </Text>
        </View>
        <View style={styles.parentTransferBar}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => this.setState({ bar: 'transactions' })}>
            <View
              style={
                this.state.bar === 'transactions'
                  ? styles.activeButton
                  : styles.inactiveButton
              }>
              <Text
                style={
                  this.state.bar === 'transactions'
                    ? styles.activeText
                    : styles.inactiveText
                }>
                Transactions
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => this.setState({ bar: 'summary' })}>
            <View
              style={
                this.state.bar === 'summary'
                  ? styles.activeButton
                  : styles.inactiveButton
              }>
              <Text
                style={
                  this.state.bar === 'summary'
                    ? styles.activeText
                    : styles.inactiveText
                }>
                Summary
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.backWhite}>
          <View style={{ display: this.getTabDisplay('transactions') }}>
            <TransactionsView
              walletId={walletId}
              name={accountName}
              number={accountNumber}
              navigation={this.props.navigation}
            />
          </View>

          <View style={{ display: this.getTabDisplay('summary') }}>
            <SummaryView
              navigation={this.props.navigation}
              walletId={walletId}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

export default AccountDetails;
