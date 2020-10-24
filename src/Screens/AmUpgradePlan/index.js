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
import PlanInfoCard from './PlanInfoCard';
import { retrieveUserData, } from '../../helpers/libs';
import { changePlan } from '../../actions/account';
import Alert from '../../components/Alert/alert';
import Loader from '../../components/Loading/overlayLoader';
import colors from '../../helpers/colors';
import { connect } from 'react-redux';
import moment from 'moment';

class AmUpgradePlan extends Component {
  state = {
    isLoading: false,
    refreshing: false,
    biz_account_id: '',
    error: false,
  };
  async componentDidMount() {
    this.setState({ isLoading: true });
    const userData = await retrieveUserData();
    const biz_account_id = userData.biz_account_id;
    this.setState(
      {
        biz_account_id,
      },
      () => {
        this.setState({ isLoading: false });
      },
    );
  }

  changePlan = async data => {
    const { biz_account_id } = this.state;
    this.setState({
      isLoading: true,
      error: null,
    });
    const response = await this.props.changePlan({
      plan_type: data,
      biz_account_id,
    });
    //
    if (response.error) {
      this.setState({
        error: response.error.message,
        isLoading: false,
      });
      return;
    }
    this.setState({
      isLoading: false,
    });
  };

  render() {
    const { isLoading, error } = this.state;
    return (
      <View style={styles.container}>
        <Alert status="danger" message={error} />
        <SafeAreaView>
          <View style={styles.header}>
            <BackButton />
            <Text style={styles.screenTitle}>Upgrade Plan</Text>
          </View>
        </SafeAreaView>

        <ScrollView style={styles.backWhite}>
          <View style={styles.mainContent}>
            <PlanInfoCard
              type={'Free plan'}
              subscript={'/month'}
              info={'0'}
              features={['1 sub-accounts', '1 additional business']}
              name={'Free'}
              changePlan={this.changePlan}
            />
            <PlanInfoCard
              type={'Standard plan'}
              subscript={'/month'}
              info={'3,700'}
              features={[
                '5 sub-accounts',
                '5 team members',
                '7 free transfers',
                'Unlimited additional business',
              ]}
              name={'Standard'}
              changePlan={this.changePlan}
            />
            <PlanInfoCard
              type={'Micro plan'}
              subscript={'/month'}
              info={'2,000'}
              features={[
                '3 sub-accounts',
                '3 team members',
                '4 free transfers',
                'Unlimited additional business',
              ]}
              name={'Micro'}
              changePlan={this.changePlan}
            />
          </View>
        </ScrollView>
        {isLoading ? <Loader loader={isLoading} /> : null}
      </View>
    );
  }
}

const mapStateToProps = state => {
  const {
    account: { businessAccounts },
  } = state;
  return {
    businessAccounts,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changePlan: data => {
      return dispatch(changePlan(data));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AmUpgradePlan);
