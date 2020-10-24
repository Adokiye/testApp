import React, { Component } from 'react';
import { View, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Modal from 'react-native-modal';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import ButtonMain from '../../../components/Buttons/buttonMain';
import styles from './styles/styles.internalTransfer';
import WalletSelector from '../../../components/Cards/walletSelector';
import { CustomText } from '../../../components/Text';
import colors from '../../../helpers/colors';
import LineBreak from '../../../components/LineBreak';
import OutlineInput from '../../../components/Inputs/OutlineInput';
import Alert from '../../../components/Alert/alert';
import { transferBetweenWallets } from '../../../actions/transfers.action';
import { grantAccessWithPin } from '../../../actions/account';

class InternalTransfer extends Component {
  state = {
    amount: '',
    transferringAccount: {},
    receivingAccount: {},
    isSelectionModalOpen: false,
    accountToChange: '',
    accessCode: '',
    isLoading: false,
  };

  componentDidMount() {
    this.selectDefaultAccounts();
  }

  selectDefaultAccounts = () => {
    const {
      selectedBusinessAccount: { biz_account_wallet_details },
    } = this.props;
    const currentAccount = biz_account_wallet_details.find(
      item => item.biz_wallet_type === 'current',
    );
    const otherAccount = biz_account_wallet_details.find(
      item => item.biz_wallet_type !== 'current',
    );
    this.setState({
      transferringAccount: currentAccount,
      receivingAccount: otherAccount,
    });
  };

  launchAccountSelector = account => {
    this.setState({
      isSelectionModalOpen: true,
      accountToChange: account,
    });
  };

  selectAccount = accountId => {
    const {
      selectedBusinessAccount: { biz_account_wallet_details },
    } = this.props;
    const { accountToChange, transferringAccount } = this.state;

    if (
      accountToChange === 'receivingAccount' &&
      transferringAccount.biz_wallet_id === accountId
    ) {
      return this.setState({
        isSelectionModalOpen: false,
      });
    }

    const selectedAccount = biz_account_wallet_details.find(
      item => item.biz_wallet_id === accountId,
    );

    this.setState({
      isSelectionModalOpen: false,
      [accountToChange]: selectedAccount,
    });
  };

  closeSelectorModal = () => {
    this.setState({
      isSelectionModalOpen: false,
    });
  };

  onInputChange = (field, value) => {
    this.props.displayError(false);
    this.setState({
      [field]: value,
    });
  };

  onPinCompletion = async pin => {
    const response = await this.props.grantAccessWithPin(pin);

    if (response.error) {
      return { errorMessage: response.error.message };
    } else if (response.status === false) {
      return { errorMessage: response.message };
    }

    this.setState(
      {
        accessCode: pin,
      },
      this.continueTransaction,
    );
  };

  validateInputs = () => {
    const { transferringAccount, receivingAccount, amount } = this.state;
    if (amount.length < 1) {
      this.props.displayError('Enter an amount');
    } else if (
      transferringAccount.biz_wallet_id === receivingAccount.biz_wallet_id
    ) {
      this.props.displayError("You can't transfer to the same account");
    } else {
      return true;
    }
  };

  cancelPinConfirmation = () => this.props.navigation.goBack(null);

  runPinConfirmation = () => {
    if (!this.validateInputs()) {
      return;
    }
    this.props.navigation.navigate('EnterPin', {
      onComplete: this.onPinCompletion,
      cancelOperation: this.cancelPinConfirmation,
    });
  };

  continueTransaction = async () => {
    this.setState({
      isLoading: true,
    });
    const {
      amount,
      accessCode,
      transferringAccount,
      receivingAccount,
    } = this.state;
    const payload = {
      from_wallet_id: transferringAccount.biz_wallet_id,
      to_wallet_id: receivingAccount.biz_wallet_id,
      amount,
      access_code: accessCode,
    };
    const response = await this.props.transferBetweenWallets(payload);

    if (response.error) {
      this.props.displayError(response.error.message);
      return this.setState({
        isLoading: false,
      });
    }

    this.props.navigation.navigate('TransactionSuccess', {
      transactionDetails: {
        amount,
        accountNumber: receivingAccount.biz_account_number,
        accountName: receivingAccount.preferred_name,
        bankName: receivingAccount.partner_bank_name,
      },
      onDismiss: () => this.props.navigation.navigate('Transfer'),
    });
  };

  render() {
    const {
      isSelectionModalOpen,
      transferringAccount,
      receivingAccount,
      amount,
      isLoading,
    } = this.state;
    const {
      selectedBusinessAccount: { biz_account_wallet_details },
    } = this.props;

    return (
      <KeyboardAwareScrollView style={styles.container}>
        <View style={styles.contentContainer}>
          <View style={styles.sectionContainer}>
            <CustomText style={styles.label}>From account</CustomText>
            <WalletSelector
              title={`${transferringAccount.preferred_name || ''} account`}
              info={transferringAccount.biz_account_number}
              type={transferringAccount.biz_wallet_type}
            />
          </View>
          <View style={styles.sectionContainer}>
            <CustomText style={styles.label}>To account</CustomText>
            <WalletSelector
              onPress={() => this.launchAccountSelector('receivingAccount')}
              title={`${receivingAccount.preferred_name || ''} account`}
              info={receivingAccount.biz_account_number}
              type={receivingAccount.biz_wallet_type}
            />
          </View>
          <View style={styles.sectionContainer}>
            <CustomText style={styles.label}>Amount</CustomText>
            <OutlineInput
              keyboardType="numeric"
              placeholder="Amount"
              value={amount}
              money
              onChange={text => this.onInputChange('amount', text)}
            />
          </View>
          <View style={styles.sectionContainer}>
            <ButtonMain
              onPress={this.runPinConfirmation}
              isLoading={isLoading}
              text="Continue"
            />
          </View>
        </View>

        <Modal
          onBackdropPress={this.closeSelectorModal}
          style={styles.selectorModal}
          isVisible={isSelectionModalOpen}>
          <SafeAreaView style={styles.selectorContainer}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={this.closeSelectorModal}
              style={styles.selectorHeader}>
              <Ionicons
                name="ios-arrow-down"
                size={23}
                color={colors.MEDIUM_GREY_01}
              />
              <CustomText style={styles.selectorHeadingText}>
                Select account
              </CustomText>
            </TouchableOpacity>
            <LineBreak />
            <ScrollView>
              <View style={styles.selectorModalContent}>
                {biz_account_wallet_details.map((account, index) => (
                  <View
                    style={styles.selectorOption}
                    key={`wallet-selector-${index}`}>
                    <WalletSelector
                      selectable
                      selected={
                        account.biz_wallet_id === receivingAccount.biz_wallet_id
                      }
                      onPress={() => this.selectAccount(account.biz_wallet_id)}
                      title={`${account.preferred_name || ''} account`}
                      info={account.biz_account_number}
                      type={account.biz_wallet_type}
                    />
                  </View>
                ))}
              </View>
            </ScrollView>
          </SafeAreaView>
        </Modal>
      </KeyboardAwareScrollView>
    );
  }
}
const mapStateToProps = state => {
  const {
    account: { selectedBusinessAccount },
  } = state;

  return {
    selectedBusinessAccount,
  };
};

const mapDispatchToProps = {
  transferBetweenWallets,
  grantAccessWithPin,
};

export default connect(mapStateToProps, mapDispatchToProps)(InternalTransfer);
