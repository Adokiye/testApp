import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

import { retrieveUserData, statementMonths } from '../../helpers/libs';
import Alert from '../../components/Alert/alert';
import Loader from '../../components/Loading/overlayLoader';
import { connect } from 'react-redux';
import { getStatements } from '../../actions/account';
import styles from './styles';
import colors from '../../helpers/colors';
import BackButton from '../../components/Buttons/BackButton';
import ShadowView from '../../components/ShadowView';
class AmStatements extends Component {
  state = {
    isLoading: false,
    downloadLoader: false,
    refreshing: false,
    error: false,
    business_account: {},
    statement_months: [],
    biz_account_id: '',
  };
  async componentDidMount() {
    this.setState({ isLoading: true });
    const userData = await retrieveUserData();
    const biz_account_id = userData.biz_account_id;
    const business_account = await this.props.businessAccounts.find(
      item => item.biz_account_id === biz_account_id,
    );
    var statement_months = await statementMonths(business_account.pub_date);
    this.setState(
      {
        business_account,
        statement_months,
        biz_account_id,
      },
      () => {
        this.setState({ isLoading: false });
      },
    );
  }
  getStatement = async data => {
    const { biz_account_id } = this.state;
    this.setState({
      downloadLoader: true,
      error: null,
    });
    const response = await this.props.getStatements({
      biz_account_id,
      month_num: data,
    });
    
      if(response && response.error){
              this.setState({
        error: response.error.message,
        downloadLoader: false,
      });
      return;
      }
    this.setState({
      downloadLoader: false,
    });
  };
  render() {
    const { business_account, isLoading, error } = this.state;
    const MenuItem = ({ text, navigateTo = '' }) => {
      return (
        <TouchableOpacity
          onPress={() => this.getStatement(navigateTo)}
          activeOpacity={0.7}
          style={styles.menuButton}>
          <ShadowView style={styles.menuItem}>
            <View style={styles.menuItemTop}>
              <Text style={styles.menuText}>{text}</Text>
              <FontAwesomeIcon
                style={styles.icon}
                icon={faChevronRight}
                size={18}
              />
            </View>
            <Text style={styles.menuDescription}>Request statement</Text>
          </ShadowView>
        </TouchableOpacity>
      );
    };
    return (
      <View style={styles.container}>
        <Alert status="danger" message={this.state.error} />
        <SafeAreaView>
          <View style={styles.header}>
            <BackButton />
            <Text style={styles.screenTitle}>Statements</Text>
          </View>
        </SafeAreaView>

        <ScrollView style={styles.backWhite}>
          <View style={styles.mainContent}>
            {this.state.isLoading ? (
              <ActivityIndicator color={colors.PRIMARY_PINK} size="large" />
            ) : (
              <FlatList
                data={this.state.statement_months}
                extraData={this.state}
                renderItem={({ item, index }) => (
                  <MenuItem text={item.text} navigateTo={item.navigateTo} />
                )}
                keyExtractor={(item, index) => item + index}
                // ListEmptyComponent={
                //   <Text style={styles.listEmpytText}>
                //     No Months to display
                //   </Text>
                // }
              />
            )}
          </View>
        </ScrollView>
        {this.state.downloadLoader ? (
          <Loader loader={this.state.downloadLoader} />
        ) : null}
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
    getStatements: data => {
      return dispatch(getStatements(data));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AmStatements);
