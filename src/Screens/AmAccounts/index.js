import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
} from 'react-native';

import styles from './styles';
import BackButton from '../../components/Buttons/BackButton';
import AccountSummary from '../../components/Cards/AccountSummary';
import AccountInfoCard from '../../components/Cards/AccountInfoCard';
import SubAccountInfoCard from './SubAccountInfoCard';
import { retrieveUserData, totalChargeCalculator } from '../../helpers/libs';
import { fetchTeamMembers } from '../../actions/team';
import Alert from '../../components/Alert/alert';
import Loader from '../../components/Loading/overlayLoader';
import colors from '../../helpers/colors';
import InfoCard from './InfoCard';
import { connect } from 'react-redux';
import moment from 'moment';
import AmAccountSplitting from '../AmAccountSplitting';

class AmAccounts extends Component {
  state = {
    isLoading: true,
    refreshing: false,
    summaryData: [],
    currentAccountDetails: {},
    inflowOutflow: {},
    business_account: {},
    wallets: [],
    error: false,
  };
  async componentDidMount() {
    this.setState({ isLoading: true });
    const userData = await retrieveUserData();
    const biz_account_id = userData.biz_account_id;
    const business_account = await this.props.businessAccounts.find(
      item => item.biz_account_id === biz_account_id,
    );
    const wallet_details = business_account.biz_account_wallet_details;
    const currentAccountDetails = await wallet_details.find(
      item => item.biz_wallet_type === 'current',
    );
    await this.props.fetchTeamMembers();
    this.setState(
      {
        wallets: business_account.biz_account_wallet_details,
        currentAccountDetails,
        inflowOutflow: this.props.inflowOutflow,
        business_account,
      },
      () => {
        console.log(business_account)
        this.setState({ isLoading: false });
      },
    );
  }

  render() {
    const {
      currentAccountDetails,
      business_account,
      wallets,
      isLoading,
      error,
    } = this.state;
    const { inflowOutflow, teams } = this.props;
    var check = moment();
    var month = check.format('MMMM');
    return (
      <View style={styles.container}>
        <Alert status="danger" message={error} />
        <SafeAreaView>
          <View style={styles.header}>
            <BackButton />
            <Text style={styles.screenTitle}>Accounts</Text>
          </View>
        </SafeAreaView>

        <ScrollView style={styles.backWhite}>
          {isLoading ? (
            <ActivityIndicator color={colors.PRIMARY_PINK} size="large" />
          ) : (
            <View style={styles.mainContent}>
              <AccountInfoCard
                type={currentAccountDetails.preferred_name + ' account'}
                bank={
                  currentAccountDetails.biz_account_number +
                  ' -' +
                  currentAccountDetails.partner_bank_name
                }
                info={currentAccountDetails.available_balance}
              />
              <SubAccountInfoCard
                type="Prospa account plan"
                bank={business_account.biz_account_plan.plan_type + ' plan'}
                info={'\u20A6' + business_account.biz_account_plan.plan_amount}
                subscript="/month"
                notice={
                  'Your plan renews on ' +
                  business_account.biz_account_plan.expired_date
                }
              />
              <AccountSummary
                data={[
                  {
                    label: 'Inflow',
                    value: inflowOutflow.inflow,
                    color: '#FA4A84',
                    percentageComplete: (inflowOutflow.inflow / 1000000) * 100,
                  },
                  {
                    label: 'Team members',
                    value:
                      teams.length +
                      '/' +
                      business_account.biz_account_plan.plan_team_limit,
                    color: '#FA4A84',
                    percentageComplete:
                      (teams.length /
                        business_account.biz_account_plan.plan_team_limit) *
                      100,
                  },
                  {
                    label: 'Sub-accounts',
                    value: wallets.length + '/5',
                    color: '#FA4A84',
                    percentageComplete: (wallets.length / 5) * 100,
                  },
                  {
                    label: 'Free transfers',
                    value:
                      business_account.biz_account_plan.plan_transfer_used +
                      '/' +
                      business_account.biz_account_plan.plan_free_transfer,
                    color: '#FA4A84',
                    percentageComplete:
                      (business_account.biz_account_plan.plan_transfer_used /
                        business_account.biz_account_plan.plan_free_transfer) *
                      100,
                  },
                ]}
                month={month}
              />
              <InfoCard
                title="Additional businesses"
                info={
                  business_account.biz_account_plan.plan_type !== 'free'
                    ? 'unlimited'
                    : '1'
                }
              />
              <InfoCard
                title="Total charges for this month"
                info={totalChargeCalculator(
                  inflowOutflow.inflow,
                  business_account.biz_account_plan.plan_amount,
                )}
              />
            </View>
          )}
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => {
  const {
    account: { businessAccounts, inflowOutflow },
  } = state;
  return {
    businessAccounts,
    inflowOutflow,
    isTeamLoading: state.team.isLoading,
    teams: state.team.teams,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchTeamMembers: (data) => {
      return dispatch(fetchTeamMembers(data));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AmAccounts);
