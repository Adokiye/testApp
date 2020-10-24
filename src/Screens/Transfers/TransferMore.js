import React, { Component, Fragment } from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import * as actions from '../../actions/transfers.action';
import styles from './styles/styles.beneficiaryView';
import { connect } from 'react-redux';
import ButtonOutline from '../../components/Buttons/buttonOutline';
import colors from '../../helpers/colors';
import ContactCard from '../../components/ContactCard';

class TransferMore extends Component {
  state = {
    search: false,
    isLoading: true,
    isRefreshing: false,
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    const {
      selectedBusinessAccount: { biz_account_number },
    } = this.props;

    if (biz_account_number) {
      await this.props.getBeneficiaries(biz_account_number);
    }
    this.setState({
      isLoading: false,
    });
  };

  refreshData = async () => {
    await this.fetchData();
  };

  filterMethod = (data, searchText) => {
    const result = data.filter(item => {
      return item.beneficiary_account_name
        .toUpperCase()
        .includes(searchText.toUpperCase());
    });
    return result;
  };

  getInitials(name) {
    var splitStr = name.toLowerCase().split(' ');
    let text = '';
    for (var i = 0; i < splitStr.length; i++) {
      if (i <= 1) {
        text += splitStr[i].charAt(0).toUpperCase();
      }
    }
    return text;
  }

  render() {
    const { beneficiaries } = this.props;
    const { isLoading, isRefreshing } = this.state;

    const beneficiaryRender = ({ item, index }) => {
      return (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() =>
            this.props.navigation.navigate('NewTransfer', {
              beneficiaryData: item,
            })
          }>
          <ContactCard
            clientName={item.beneficiary_account_name}
            bottomLeft={`${item.beneficiary_bank_name} - ${item.beneficiary_account_num}`}
            avatarColor="#FA4A84"
            avatarTextColor="#fff"
            style={styles.beneficiaryCard}
          />
        </TouchableOpacity>
      );
    };

    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            onRefresh={this.refreshData}
            refreshing={isRefreshing}
          />
        }
        style={styles.container}>
        <Fragment>
          <View style={styles.newTransferButton}>
            <ButtonOutline
              onPress={() => this.props.navigation.navigate('NewTransfer')}
              text="New transfer"
            />
          </View>
          <View style={styles.savedView}>
            <Text style={styles.savedText}>Saved Beneficiaries</Text>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() =>
                this.props.navigation.navigate('DashboardSearch', {
                  data: beneficiaries,
                  renderItem: beneficiaryRender,
                  filterMethod: this.filterMethod,
                })
              }>
              <View style={styles.searchIcon}>
                <Icon name="search" size={25} color={colors.PRIMARY_PURPLE} />
              </View>
            </TouchableOpacity>
          </View>
          {isLoading === true ? (
            <ActivityIndicator size="large" />
          ) : (
            <FlatList
              data={beneficiaries}
              renderItem={beneficiaryRender}
              keyExtractor={(item, index) => `list-item-${index}`}
              ListEmptyComponent={
                <Text style={styles.listEmpytText}>
                  No beneficiaries to display
                </Text>
              }
            />
          )}
        </Fragment>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  const {
    transfers: { beneficiaries },
    account: { selectedBusinessAccount },
  } = state;

  return {
    selectedBusinessAccount,
    beneficiaries,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getBeneficiaries: accountNumber =>
      dispatch(actions.getBeneficiaries(accountNumber)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TransferMore);
