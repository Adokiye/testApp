import { connect } from 'react-redux';
import React, { Component } from 'react';
import {
  SafeAreaView,
  Text,
  View,
  ScrollView,
  AppState,
  FlatList,
  StatusBar,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import moment from 'moment';

import styles from './styles/styles.accounts';
import AccountInfoCard from '../../components/Cards/AccountInfoCard';
import { numToMoneyString } from '../../helpers/thousandSeparator';
import { prepareSummaryData } from '../../helpers/libs';
import AccountSummary from '../../components/Cards/AccountSummary';
import FadeInOutView from '../../components/FadeInOutView';
import SlideUpInView from '../../components/SlideUpInView';
import { getBusinessAccounts, getInflowOutflow } from '../../actions/account';
import colors from '../../helpers/colors';

class Accounts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appState: AppState.currentState,
      businessAccount: '',
      refreshing: false,
      isAppLoading: true,
    };
  }

  componentDidMount() {
    this.prepareData();
  }

  prepareData = async () => {
    const { selectedBusinessAccount } = this.props;

    if (!selectedBusinessAccount.biz_account_id) {
      await this.fetchData();
    }
    await this.props.getInflowOutflow();
    this.setState({
      isAppLoading: false,
    });
  };

  fetchData = async () => {
    await this.props.getBusinessAccounts();
    await this.props.getInflowOutflow();
  };

  onScreenRefresh = async () => {
    this.setState({
      refreshing: true,
    });

    await this.fetchData();

    this.setState({
      refreshing: false,
    });
  };

  render() {
    const { selectedBusinessAccount, inflowOutflow } = this.props;
    const { refreshing, isAppLoading } = this.state;

    const businessName = selectedBusinessAccount.biz_friendly_name;
    const walletDetails = selectedBusinessAccount.biz_account_wallet_details;

    const summaryData = prepareSummaryData(inflowOutflow);

    return (
      <SafeAreaView style={styles.container}>
        <StatusBar
          barStyle="light-content"
          backgroundColor={colors.PRIMARY_PURPLE}
        />
        <View style={styles.backWhite}>
          {isAppLoading && <ActivityIndicator size="large" />}
        </View>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={this.onScreenRefresh}
              tintColor="#fff"
            />
          }>
          <FadeInOutView
            duration={500}
            style={styles.header}
            isShown={!refreshing}>
            <Text numberOfLines={1} style={styles.businessName}>
              {businessName}
            </Text>
            <Text style={styles.welcomeText}>Welcome back!</Text>
          </FadeInOutView>
          {!isAppLoading && (
            <SlideUpInView>
              <FlatList
                data={walletDetails}
                renderItem={({ item }) => (
                  <>
                    {item.biz_wallet_type === 'current' ? (
                      <View style={styles.accountCard}>
                        <AccountInfoCard
                          onPress={() =>
                            this.props.navigation.navigate('AccountDetails', {
                              walletId: item.biz_wallet_id,
                              accountName: item.preferred_name,
                              accountNumber: item.biz_account_number,
                              balance: item.available_balance,
                            })
                          }
                          type={item.preferred_name.toUpperCase()}
                          bank={`${item.biz_account_number} - ${item.partner_bank_name}`}
                          info={numToMoneyString(item.available_balance)}
                          colorTheme="pink"
                        />
                      </View>
                    ) : (
                      <View style={styles.accountCard}>
                        <AccountInfoCard
                          onPress={() =>
                            this.props.navigation.navigate('AccountDetails', {
                              walletId: item.biz_wallet_id,
                              accountName: item.preferred_name,
                              accountNumber: item.biz_account_number,
                              balance: item.available_balance,
                            })
                          }
                          type={item.preferred_name.toUpperCase()}
                          bank="SUB-ACCOUNT"
                          info={numToMoneyString(item.available_balance)}
                        />
                      </View>
                    )}
                  </>
                )}
                keyExtractor={(item, index) => `${item.biz_account_id}${index}`}
                contentContainerStyle={styles.accountsList}
              />
              <View style={styles.summary}>
                <AccountSummary
                  month={moment().format('MMMM')}
                  data={summaryData}
                />
              </View>
            </SlideUpInView>
          )}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  const { account } = state;

  return {
    selectedBusinessAccount: account.selectedBusinessAccount,
    inflowOutflow: account.inflowOutflow,
  };
};

const mapDispatchToProps = {
  getBusinessAccounts,
  getInflowOutflow,
};

export default connect(mapStateToProps, mapDispatchToProps)(Accounts);
