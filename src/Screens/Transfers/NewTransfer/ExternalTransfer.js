import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  Picker,
  ActivityIndicator,
  SafeAreaView,
  Platform,
} from 'react-native';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';

import styles from './styles/styles.externalTransfer';
import Alert from '../../../components/Alert/alert';
import {
  getListedBanks,
  makeTransferFirstStep,
  makeTransferSecondStep,
  makeBeneficiaryTransfer,
} from '../../../actions/transfers.action';
import { grantAccessWithPin } from '../../../actions/account';
import { CustomText } from '../../../components/Text';
import OutlineInput from '../../../components/Inputs/OutlineInput';
import ButtonMain from '../../../components/Buttons/buttonMain';
import ShadowView from '../../../components/ShadowView';
import colors from '../../../helpers/colors';
import TransactionSuccess from '../../TransactionSuccess';

class ExternalTransfer extends Component {
  state = {
    accountNumber: '',
    accountName: '',
    amount: '',
    note: '',
    isBankSelectorOpen: false,
    selectedBank: {},
    isBeneficiary: false,
    beneficiaryId: '',
    stateToken: '',
    isFirstStepRunning: false,
    accessCode: '',
    isTransactionSuccessful: false,
    isLoading: false,
    transferRef: '',
  };

  componentDidMount() {
    this.fetchData();
    this.processBeneficiaryState();
  }

  fetchData = async () => {
    await this.props.getListedBanks();
    this.processBeneficiaryState();
  };

  processBeneficiaryState = () => {
    const beneficiaryData = this.props.navigation.getParam(
      'beneficiaryData',
      null,
    );
    if (!beneficiaryData) {
      return;
    }

    const { listedBanks } = this.props;
    const {
      beneficiary_account_name,
      beneficiary_account_num,
      beneficiary_bank_name,
      beneficiary_id,
    } = beneficiaryData;
    const selectedBank =
      listedBanks.find(bank => bank.name === beneficiary_bank_name) || {};

    this.setState({
      isBeneficiary: true,
      accountName: beneficiary_account_name,
      accountNumber: beneficiary_account_num,
      beneficiaryId: beneficiary_id,
      selectedBank,
    });
  };

  setBank = bankId => {
    const { listedBanks } = this.props;
    const selectedBank = listedBanks.find(bank => bank.id === bankId) || {};
    this.setState({
      selectedBank,
      stateToken: '',
    });
  };

  onChangeInput = (field, text) => {
    this.props.displayError(false);
    this.setState({
      [field]: text,
    });

    if (field === 'accountNumber') {
      this.resetStateToken('');
    }
  };

  openBankSelector = () => {
    this.setState({
      isBankSelectorOpen: true,
    });
  };

  completeBankSelection = () => {
    this.setState(
      {
        isBankSelectorOpen: false,
      },
      this.runFirstStep,
    );
  };

  resetStateToken = token => {
    this.setState({
      stateToken: token,
    });
  };

  // validate account number
  runFirstStep = async () => {
    const { accountNumber, selectedBank } = this.state;
    if (!selectedBank.code || accountNumber.length === 0) {
      return;
    }
    this.setState({
      isFirstStepRunning: true,
    });
    const response = await this.props.makeTransferFirstStep({
      accountNumber,
      bankCode: selectedBank.code,
    });
    if (response.error) {
      this.props.displayError(response.error.message);
      return this.setState({
        isFirstStepRunning: false,
      });
    }

    this.setState({
      accountName: response.account_name,
      stateToken: response.state_token,
      isFirstStepRunning: false,
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
    const { accountNumber, accountName, amount, selectedBank } = this.state;

    if (!selectedBank.code) {
      this.props.displayError('Please select a bank');
    } else if (accountNumber === '') {
      this.props.displayError("Recipient's account number is required");
    } else if (amount === '') {
      this.props.displayError('Enter an amount');
    } else if (accountName === '') {
      this.props.displayError('Ensure that bank and account number are valid');
    } else {
      return true;
    }
  };

  runPinConfirmation = () => {
    if (!this.validateInputs()) {
      return;
    }

    this.props.navigation.navigate('EnterPin', {
      onComplete: this.onPinCompletion,
      cancelOperation: this.cancelPinConfirmation,
    });
  };

  makeBeneficiaryTransfer = async data => {
    const { amount, access_code, transfer_note } = data;
    const { beneficiaryId } = this.state;
    const payload = {
      amount,
      access_code,
      transfer_note,
      beneficiary_id: beneficiaryId,
    };
    return await this.props.makeBeneficiaryTransfer(payload);
  };

  continueTransaction = async () => {
    this.setState({
      isLoading: true,
    });
    const {
      amount,
      accountNumber,
      accountName,
      selectedBank,
      isBeneficiary,
      note,
      stateToken,
      accessCode,
    } = this.state;

    const {
      selectedBusinessAccount: { biz_account_number },
    } = this.props;
    const payload = {
      amount,
      is_beneficiary: isBeneficiary,
      access_code: accessCode,
      sender_acc_num: biz_account_number,
      transfer_note: note,
      state_token: stateToken,
    };

    let response;
    if (isBeneficiary) {
      response = await this.makeBeneficiaryTransfer(payload);
    } else {
      response = await this.props.makeTransferSecondStep(payload);
    }

    if (response.error) {
      this.props.displayError(response.error.message);
      return this.setState({
        isLoading: false,
      });
    }

    this.props.navigation.navigate('TransactionSuccess', {
      transactionDetails: {
        amount,
        accountNumber,
        accountName,
        bankName: selectedBank.name,
        transferRef: response.transfer_ref,
      },
      onDismiss: () => this.props.navigation.navigate('Transfer'),
    });
  };

  cancelPinConfirmation = () => this.props.navigation.goBack(null);

  render() {
    const {
      accountNumber,
      accountName,
      amount,
      note,
      isBankSelectorOpen,
      selectedBank,
      isBeneficiary,
      isFirstStepRunning,
      isTransactionSuccessful,
      isLoading,
      transferRef,
    } = this.state;
    const { listedBanks } = this.props;
    const areBanksReady = listedBanks.length > 0 ? true : false;

    return (
      <KeyboardAwareScrollView>
        <View style={styles.contentContainer}>
          {Platform.OS === 'android' ? (
            <View style={styles.sectionContainer}>
              <View style={styles.androidPickerContainer}>
                <Picker
                  mode="dropdown"
                  enabled={!isBeneficiary || areBanksReady}
                  selectedValue={selectedBank.id}
                  onValueChange={itemValue => this.setBank(itemValue)}>
                  <Picker.Item label="Select bank" value={null} />
                  {listedBanks.map((bank, index) => (
                    <Picker.Item
                      label={bank.name}
                      value={bank.id}
                      key={`bank-picker-${index}`}
                    />
                  ))}
                </Picker>
              </View>
            </View>
          ) : (
            <View>
              <View style={styles.sectionContainer}>
                <CustomText style={styles.label}>Select bank</CustomText>
                <TouchableOpacity
                  activeOpacity={0.7}
                  disabled={isBeneficiary || !areBanksReady}
                  onPress={this.openBankSelector}>
                  <ShadowView style={styles.bankSelector}>
                    {areBanksReady ? (
                      <CustomText style={styles.bankSelectorText}>
                        {selectedBank.name || 'Select bank'}
                      </CustomText>
                    ) : (
                      <ActivityIndicator />
                    )}
                    <Ionicons
                      name="ios-arrow-forward"
                      size={23}
                      color={colors.MEDIUM_GREY_01}
                    />
                  </ShadowView>
                </TouchableOpacity>
              </View>

              <Modal isVisible={isBankSelectorOpen} style={styles.selector}>
                <SafeAreaView style={styles.bankPicker}>
                  <TouchableOpacity
                    onPress={this.completeBankSelection}
                    style={styles.selectorClose}>
                    <CustomText style={styles.selectorDoneText}>
                      Done
                    </CustomText>
                  </TouchableOpacity>
                  <Picker
                    selectedValue={selectedBank.id}
                    onValueChange={itemValue => this.setBank(itemValue)}>
                    <Picker.Item label="-- Select bank --" value={null} />
                    {listedBanks.map(bank => (
                      <Picker.Item label={bank.name} value={bank.id} />
                    ))}
                  </Picker>
                </SafeAreaView>
              </Modal>
            </View>
          )}

          <View style={styles.sectionContainer}>
            <CustomText style={styles.label}>Account number</CustomText>
            <OutlineInput
              onBlur={this.runFirstStep}
              editable={!isBeneficiary}
              onChange={text => this.onChangeInput('accountNumber', text)}
              value={accountNumber}
              placeholder="Enter account number"
              keyboardType="number-pad"
            />
          </View>
          <View style={styles.sectionContainer}>
            <CustomText
              onChange={text => this.onChangeInput('accountName', text)}
              style={styles.label}>
              Account name
            </CustomText>
            <OutlineInput
              editable={false}
              value={accountName}
              placeholder="Enter account name"
              isLoading={isFirstStepRunning}
            />
          </View>
          <View style={styles.sectionContainer}>
            <CustomText style={styles.label}>Amount</CustomText>
            <OutlineInput
              money
              value={amount}
              onChange={text => this.onChangeInput('amount', text)}
              keyboardType="numeric"
              placeholder="Amount"
            />
          </View>
          <View style={styles.sectionContainer}>
            <CustomText style={styles.label}>Note (optional)</CustomText>
            <OutlineInput
              value={note}
              onChange={text => this.onChangeInput('note', text)}
              placeholder="Add a personal message"
            />
          </View>
          <View style={styles.sectionContainer}>
            <ButtonMain
              isLoading={isLoading}
              onPress={this.runPinConfirmation}
              text="Continue"
            />
          </View>
        </View>

        <Modal style={styles.successModal} isVisible={isTransactionSuccessful}>
          <TransactionSuccess
            transactionDetails={{
              amount,
              accountNumber,
              accountName,
              bankName: selectedBank.name,
              transferRef,
            }}
            onDismiss={() => this.props.navigation.navigate('Transfer')}
          />
        </Modal>
      </KeyboardAwareScrollView>
    );
  }
}

const mapStateToProps = state => {
  const {
    account: { selectedBusinessAccount },
    transfers: { listedBanks },
  } = state;
  return {
    listedBanks,
    selectedBusinessAccount,
  };
};

const mapDispatchToProps = {
  getListedBanks,
  makeTransferFirstStep,
  makeTransferSecondStep,
  grantAccessWithPin,
  makeBeneficiaryTransfer,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExternalTransfer);
