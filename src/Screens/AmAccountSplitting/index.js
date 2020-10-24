import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  SafeAreaView,
  TextInput,
  FlatList,
  ActivityIndicator,
  Keyboard,
} from 'react-native';

import styles from './styles';
import BackButton from '../../components/Buttons/BackButton';
import ButtonMain from '../../components/Buttons/buttonMain';
import { connect } from 'react-redux';
import { updateWallet } from '../../actions/account';
import { retrieveUserData } from '../../helpers/libs';
import Alert from '../../components/Alert/alert';
import Loader from '../../components/Loading/overlayLoader';
import colors from '../../helpers/colors';

class AmAccountSplitting extends Component {
  state = {
    wallets: [],
    refreshing: false,
    isLoading: false,
    error: false,
    walletAllocations: {},
    currentAccountId: '',
    businessAccountId: '',
  };
  async componentDidMount() {
    this.setState({ isLoading: true });
    const userData = await retrieveUserData();
    const biz_account_id = userData.biz_account_id;
    console.log(JSON.stringify(biz_account_id));
    const business_account = await this.props.businessAccounts.find(
      item => item.biz_account_id === biz_account_id,
    );
    const wallet_details = business_account.biz_account_wallet_details;
    const currentAccount = await wallet_details.find(
      item => item.biz_wallet_type === 'current',
    );
    for (let i = 0; i < wallet_details.length; i++) {
      Object.keys(wallet_details[i]).forEach(
        function(key) {
          if (key === 'biz_wallet_id') {
            let value = wallet_details[i].biz_wallet_id;
            this.setState(prevState => {
              let walletAllocations = Object.assign(
                {},
                prevState.walletAllocations,
              ); // creating copy of state variable walletAllocations
              walletAllocations[value] = wallet_details[i].incoming_allocation; // update the name property, assign a new value
              return { walletAllocations }; // return new object walletAllocations object
            });
          }
        }.bind(this),
      );
    }

    this.setState(
      {
        wallets: business_account.biz_account_wallet_details,
        currentAccountId: currentAccount.biz_wallet_id,
        businessAccountId: biz_account_id,
      },
      () => {
        this.setState({ isLoading: false });
      },
    );
  }

  update = async () => {
    this.setState({
      isLoading: true,
    });
    let data = [];
    let total_value = 0;
    Object.keys(this.state.walletAllocations).forEach(
      function(key, index) {
        data.push({
          walletID: Number(key),
          walletShare: Number(this.state.walletAllocations[key]),
        });
      }.bind(this),
    );
    console.log('\n' + '\n' + JSON.stringify(data) + '\n' + '\n' + '\n');
    let toSend = {
      biz_account_id: this.state.businessAccountId,
      wallet_allocation: data,
    };
    const response = await this.props.updateWallet(toSend);
    console.log(response + 'kk');
    if (response && response.error) {
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

  handleInputChange = (key, text) => {
    const walletAllocations = { ...this.state.walletAllocations };
    // data[id] = value;
    // TODO calculate percentage

    if (key !== this.state.currentAccountId) {
      const { currentAccountId } = this.state;
      const difference = Math.abs(
        Number(text) - Number(walletAllocations[key]),
      );
      let remainder;
      // Get remainder
      if (Number(text) > Number(walletAllocations[key])) {
        remainder =
          Number(walletAllocations[currentAccountId]) - Number(difference);
      } else {
        remainder =
          Number(walletAllocations[currentAccountId]) + Number(difference);
      }

      // Check if remainder is negative
      if (remainder < 0) {
        this.setState({
          error: 'Total percentage allocation should not be greater than 100',
        });
        return;
      }

      // const remainder = Number(data[id]) - Number(value);
      walletAllocations[key] = text || 0;
      const updatedData = {
        ...walletAllocations,
        [currentAccountId]: remainder.toString() || '0',
      };
      this.setState({ walletAllocations: updatedData, error: null });
    }
  };

  render() {
    const { wallets, isLoading } = this.state;
    const AccountInput = ({ accountLabel, value }) => {
      //   value = value.toString()
      //   console.log(this.state.walletAllocations)
      return (
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>{accountLabel}</Text>
          <TextInput
            style={styles.inputBox}
            value={
              this.state.walletAllocations[value]
              // + '%'
            }
            keyboardType={'numeric'}
            onChangeText={text => this.handleInputChange(value, text)}
            defaultValue={this.state.walletAllocations[value]}
          />
        </View>
      );
    };
    return (
      <View style={styles.container}>
        <Alert status="danger" message={this.state.error} />
        <SafeAreaView>
          <View style={styles.header}>
            <BackButton />
            <Text style={styles.screenTitle}>Account Splitting</Text>
          </View>
        </SafeAreaView>
        <ScrollView
          style={styles.backWhite}
          keyboardShouldPersistTaps={'always'}>
          <View style={styles.contentContainer}>
            {isLoading ? (
              <ActivityIndicator color={colors.PRIMARY_PINK} size="large" />
            ) : (
              <FlatList
                data={wallets}
                extraData={this.state}
                renderItem={({ item, index }) => (
                  // console.log(item.biz_wallet_id)
                  <AccountInput
                    accountLabel={item.preferred_name + ' account'}
                    value={item.biz_wallet_id}
                  />
                )}
                keyExtractor={(item, index) => item + index}
                // ListEmptyComponent={
                //   <Text style={styles.listEmpytText}>
                //     No Accounts to display
                //   </Text>
                // }
              />
            )}
            <View style={styles.actionButton}>
              <ButtonMain onPress={this.update} text="Save" />
            </View>
          </View>
        </ScrollView>
        {/* {this.state.isLoading ? <Loader loader={this.state.isLoading} /> : null} */}
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
    updateWallet: data => dispatch(updateWallet(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AmAccountSplitting);
