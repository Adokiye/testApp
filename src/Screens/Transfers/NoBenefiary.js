/* eslint-disable react-native/no-inline-styles */
import React, { Component, Fragment } from 'react';
import {
  Text,
  View,
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';

import DashboardTextInput from '../../components/Inputs/dashboardTextInput';
import { connect } from 'react-redux';
import Loader from '../../components/Loading/overlayLoader';
import AsyncStorage from '@react-native-community/async-storage';
import * as actions from '../../actions/transfers.action';

import NewTransferStyle from './styles/styles.newTransfer';
import TransfersStyle from './styles/styles.transfers';

import Alert from '../../components/Alert/alert';

const screen = Dimensions.get('screen');

class NoBeneficiary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: '',
      bar: '',
      beneficiaries: true,
      first_step: true,
      banks: [],
      current_bank_name: '',
      current_bank_code: '',
      error: '',
      accountNumber: '',
      accountName: '',
      note: '',
      amount: '',
      token: '',
      first_step_data: [],
    };
  }

  async componentDidMount() {
    const store = await AsyncStorage.getItem('user_stats');
    const { token } = JSON.parse(store);
    console.log(token);
    await this.props.getBanks();
    const { banks } = await this.props;
    console.log('banks' + JSON.stringify(banks) + '\n' + '\n');
    this.setState({
      banks,
      token,
    });
    this.setState({
      current_bank_code: banks.data[0].code,
      current_bank_name: banks.data[0].name,
    });
  }

  onInputFocus = name => {
    this.setState({ active: name });
  };

  onInputBlur = () => {
    this.setState({ active: '' });
  };

  async getData() {}

  async onTextInput(value, state) {
    const { banks, loading, error } = await this.props;
    this.setState({ [state]: value });
    if (state === 'accountNumber' && value.toString().length === 10) {
      let transfer_type = '';
      if (this.state.current_bank_code) {
        transfer_type = this.state.current_bank_code
          ? this.state.current_bank_code
          : null;
      } else {
        transfer_type = banks.data[0].code ? banks.data[0].code : null;
      }
      let number = value;
      const payload = {
        transfer_step: 'first_step',
        transfer_type: transfer_type,
        rep_acc_num: number,
      };
      console.log(JSON.stringify(payload));
      await this.props.getFirstStepData(payload, this.state.token);
      const { first_step_data } = this.props;
      console.log('first step data ' + JSON.stringify(first_step_data));
      this.setState(
        {
          first_step_data,
          accountName: first_step_data.account_name,
        },
        () =>
          console.log(
            '\n' +
              '\n' +
              '\n' +
              '\n' +
              'das ' +
              this.state.accountName +
              '\n' +
              '\n' +
              '\n',
          ),
      );
    }
  }

  next() {
    const { first_step_data } = this.props;
    this.props.navigation.navigate('EnterPin', {
      transfer_to_number: true,
      amount: this.state.amount && this.state.amount,
      sender_acc_num: this.state.accountNumber && this.state.accountNumber,
      transfer_note: this.state.note && this.state.note,
      state_token: first_step_data.state_token,
      paid_to: first_step_data.account_name,
    });
  }

  componentDidUpdate() {
    const { params } = this.props.navigation.state;
    if (params && params.code) {
      this.setState({
        current_bank_code: params.code,
        current_bank_name: params.name,
      });
      params.code = '';
    }
  }

  render() {
    const { banks, loading, error } = this.props;
    const { first_step_data } = this.props;
    const { params } = this.props.navigation.state;
    let name = '';
    if (params && params.name) {
      name = params.name;
    } else {
      name = banks.data ? banks.data[0].name : null;
    }
    return (
      <View>
        {loading === true && <Loader loader={loading} />}
        <Fragment>
          <Text style={NewTransferStyle().selectBankText}>Select Bank</Text>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('DashboardSearch', {
                state: 'NewTransfer',
                beneficiaries: false,
                data: banks.data ? banks.data : null,
              })
            }>
            <View style={NewTransferStyle().bankView}>
              <Text style={NewTransferStyle().bankNameText}>{name}</Text>
              <Image
                resizeMethod={'auto'}
                resizeMode={'contain'}
                style={{ width: 15, height: 15 }}
                source={require('../../assets/icons/grey_back.png')}
              />
            </View>
          </TouchableOpacity>
          <Text style={NewTransferStyle().selectBankText}>Account Number</Text>
          <View
            style={
              this.state.active === 'number'
                ? NewTransferStyle().activeTextInputView
                : NewTransferStyle().inactiveTextInputView
            }>
            <DashboardTextInput
              type={'numeric'}
              placeholder={'Enter account number'}
              onInputFocus={() => this.onInputFocus('number')}
              onInputBlur={this.onInputBlur}
              value={this.state.accountNumber}
              onTextInput={value => this.onTextInput(value, 'accountNumber')}
            />
          </View>
          <Text style={NewTransferStyle().selectBankText}>Account Name</Text>
          <View
            style={
              this.state.active === 'name'
                ? NewTransferStyle().activeTextInputView
                : NewTransferStyle().inactiveTextInputView
            }>
            <DashboardTextInput
              type={'default'}
              placeholder={'Account name'}
              onInputFocus={() => this.onInputFocus('name')}
              onInputBlur={this.onInputBlur}
              editable={false}
              value={first_step_data.account_name}
            />
          </View>
          <Text style={NewTransferStyle().selectBankText}>Amount</Text>
          <View
            style={
              this.state.active === 'amount'
                ? NewTransferStyle().activeTextInputView
                : NewTransferStyle().inactiveTextInputView
            }>
            <DashboardTextInput
              type={'numeric'}
              placeholder={'Enter amount'}
              onInputFocus={() => this.onInputFocus('amount')}
              onInputBlur={this.onInputBlur}
              value={this.state.amount}
              onTextInput={value => this.onTextInput(value, 'amount')}
            />
          </View>
          <Text style={NewTransferStyle().selectBankText}>Note(optional)</Text>
          <View
            style={
              this.state.active === 'note'
                ? NewTransferStyle().activeTextInputView
                : NewTransferStyle().inactiveTextInputView
            }>
            <DashboardTextInput
              type={'default'}
              placeholder={'Add a personal message'}
              onInputFocus={() => this.onInputFocus('note')}
              onInputBlur={this.onInputBlur}
              value={this.state.note}
              onTextInput={value => this.onTextInput(value, 'note')}
            />
          </View>
        </Fragment>
        {this.state.accountNumber.toString().length === 10 ? (
          <TouchableOpacity activeOpacity={0.7} onPress={this.next.bind(this)}>
            <View style={NewTransferStyle().transferMoneyView}>
              <Text style={NewTransferStyle().transferMoneyText}>
                Transfer money
              </Text>
            </View>
          </TouchableOpacity>
        ) : null}
      </View>
    );
  }
}
const mapStateToProps = state => {
  //console.log(state, 'STATE');
  const { transfers } = state;
  const { banks, first_step_data, loading, error } = transfers;

  return {
    banks,
    first_step_data,
    loading,
    error,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getBanks: () => dispatch(actions.getBanks()),
    getFirstStepData: (payload, token) =>
      dispatch(actions.getFirstStepData(payload, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NoBeneficiary);
