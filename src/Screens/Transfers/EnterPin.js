/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import {
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

import Alert from '../../components/Alert/alert';

import EnterPinStyle from './styles/styles.enterPin';

import { connect } from 'react-redux';
import Loader from '../../components/Loading/overlayLoader';
import AsyncStorage from '@react-native-community/async-storage';
import * as actions from '../../actions/transfers.action';

const screen = Dimensions.get('screen');

class EnterPin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      one: '',
      two: '',
      three: '',
      four: '',
      state: 'one',
      numberState: '',
      pin: '',
      error_state: '',
      token: '',
    };
  }

  async componentDidMount() {
    const store = await AsyncStorage.getItem('user_stats');
    const { token } = JSON.parse(store);
    this.setState({ token });
  }

  async transfer(payload, token, success) {
    console.log('here');
    console.log(
      '\n' + JSON.stringify(payload) + '\n' + this.state.token + '\n',
    );
    await this.props.transferToNumber(
      payload,
      token,
      this.props.navigation,
      success,
    );
  }

  async transferB(payload, token, success) {
    console.log('Bne');
    console.log(
      '\n' + JSON.stringify(payload) + '\n' + this.state.token + '\n',
    );
    await this.props.transferToBeneficiary(
      payload,
      token,
      this.props.navigation,
      success,
    );
  }

  async transferI(payload, token, success) {
    console.log('Internal');
    console.log(
      '\n' + JSON.stringify(success) + '\n' + this.state.token + '\n',
    );
    await this.props.transferToInternal(
      payload,
      token,
      this.props.navigation,
      success,
    );
  }

  numberPress(value) {
    const { params } = this.props.navigation.state;
    const { selectedBusinessAccount } = this.props;
    this.setState({ error_state: '' });
    console.log(
      '\n' +
        '\n' +
        JSON.stringify(selectedBusinessAccount) +
        '\n' +
        '\n' +
        '\n',
    );
    if (this.state.token) {
      if (this.state.state === 'one') {
        this.setState({ one: value, state: 'two' });
      }
      if (this.state.state === 'two') {
        this.setState({ two: value, state: 'three' });
      }
      if (this.state.state === 'three') {
        this.setState({ three: value, state: 'four' });
      }
      if (this.state.state === 'four') {
        this.setState({
          four: value,
          state: '',
          pin: this.state.one + this.state.two + this.state.three + value,
        });
        if (
          this.state.one + this.state.two + this.state.three + value !=
          '2020'
        ) {
          this.setState({ error_state: 'Invalid Pin' });
        } else {
          if (params && params.pending) {
            const payload = {
              transfer_id: params.transfer_id,
              access_code: Number('2020'),
              transfer_decision: params.transfer_decision,
            };
            const success_data = {
              amount: params.amount,
              paid_to: params.paid_to,
            };
            this.props.authorize(
              payload,
              this.props.navigation,
              this.state.token,
              success_data,
            );
          } else if (params && params.transfer_to_number) {
            const payload = {
              transfer_step: 'second_step',
              access_code: Number('2020'),
              amount: params.amount ? Number(params.amount) : null,
              sender_acc_num:
                selectedBusinessAccount.biz_account_wallet_details[0]
                  .biz_account_number,
              is_beneficiary: true,
              transfer_note: params.transfer_note ? params.transfer_note : null,
              state_token: params.state_token ? params.state_token : null,
            };
            const success_data = {
              amount: params.amount,
              paid_to: params.paid_to,
            };
            this.transfer(payload, this.state.token, success_data);
          } else if (params && params.transfer_to_beneficiary) {
            const payload = {
              beneficiary_id: params.id ? params.id : null,
              access_code: Number('2020'),
              amount: params.amount ? Number(params.amount) : null,
              transfer_note: params.transfer_note ? params.transfer_note : null,
            };
            const success_data = {
              amount: params.amount,
              paid_to: params.paid_to,
            };
            this.transferB(payload, this.state.token, success_data);
          } else if (params && params.internal_transfer) {
            const payload = {
              from_wallet_id: params.from_wallet_id
                ? params.from_wallet_id
                : null,
              to_wallet_id: params.to_wallet_id ? params.to_wallet_id : null,
              access_code: Number('2020'),
              amount: params.amount ? Number(params.amount) : null,
            };
            const success_data = {
              amount: params.amount,
              paid_to: params.paid_to,
            };
            this.transferI(payload, this.state.token, success_data);
          }
        }

        //   this.props.navigation.navigate('Dashboard');
      }
    }
  }
  back() {
    this.setState({ error_state: '' });
    if (this.state.state === 'two') {
      this.setState({ one: '', state: 'one' });
    }
    if (this.state.state === 'three') {
      this.setState({ two: '', state: 'two' });
    }
    if (this.state.state === 'four') {
      this.setState({ three: '', four: '', state: 'three' });
    }
    if (this.state.state === '' && this.state.three) {
      this.setState({ four: '', state: 'four' });
    }
  }

  render() {
    const { error_state } = this.state;
    // let height
    const { loading, error } = this.props;
    return (
      <SafeAreaView style={EnterPinStyle().container}>
        <Alert status="danger" message={error || error_state} />
        <View style={EnterPinStyle().header}>
          <TouchableOpacity
            activeOpacity={0.7}
            hitSlop={{ left: 2, right: 2, top: 2, bottom: 2 }}
            onPress={() => this.props.navigation.goBack()}>
            <View
              style={{
                width: 30,
                height: 30,
                borderRadius: 15,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#7E51FF',
              }}>
              <Image
                resizeMethod={'auto'}
                resizeMode={'contain'}
                style={{ width: 8.91, height: 15 }}
                source={require('../../assets/icons/back_white.png')}
              />
            </View>
          </TouchableOpacity>
        </View>
        <Text style={EnterPinStyle().securityTextHeader}>
          Enter your security code
        </Text>
        <Text style={EnterPinStyle().securityTextSubheader}>
          Enter your 4 digit security code
        </Text>
        <View style={EnterPinStyle().parentTextInputView}>
          <View
            style={
              this.state.state === 'one'
                ? EnterPinStyle().pinActiveView
                : EnterPinStyle().pinInactiveView
            }>
            <Text style={EnterPinStyle().textInput}>{this.state.one}</Text>
          </View>
          <View
            style={
              this.state.state === 'two'
                ? EnterPinStyle().pinActiveView
                : EnterPinStyle().pinInactiveView
            }>
            <Text style={EnterPinStyle().textInput}>{this.state.two}</Text>
          </View>
          <View
            style={
              this.state.state === 'three'
                ? EnterPinStyle().pinActiveView
                : EnterPinStyle().pinInactiveView
            }>
            <Text style={EnterPinStyle().textInput}>{this.state.three}</Text>
          </View>
          <View
            style={
              this.state.state === 'four'
                ? EnterPinStyle().pinActiveView
                : EnterPinStyle().pinInactiveView
            }>
            <Text style={EnterPinStyle().textInput}>{this.state.four}</Text>
          </View>
        </View>
        <View style={EnterPinStyle().numberParentView}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPressIn={() => this.setState({ numberState: '1' })}
            onPressOut={() => {
              if (this.state.numberState === '1') {
                this.setState({ numberState: '' });
              }
            }}
            onPress={this.numberPress.bind(this, '1')}>
            <View
              style={
                EnterPinStyle(this.state.numberState === '1' ? true : false)
                  .individualNumberView
              }>
              <Text style={EnterPinStyle().individualNumberText}>1</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            onPressIn={() => this.setState({ numberState: '2' })}
            onPressOut={() => {
              if (this.state.numberState === '2') {
                this.setState({ numberState: '' });
              }
            }}
            onPress={this.numberPress.bind(this, '2')}>
            <View
              style={
                EnterPinStyle(this.state.numberState === '2' ? true : false)
                  .individualNumberView
              }>
              <Text style={EnterPinStyle().individualNumberText}>2</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            onPressIn={() => this.setState({ numberState: '3' })}
            onPress={this.numberPress.bind(this, '3')}
            onPressOut={() => {
              if (this.state.numberState === '3') {
                this.setState({ numberState: '' });
              }
            }}>
            <View
              style={
                EnterPinStyle(this.state.numberState === '3' ? true : false)
                  .individualNumberView
              }>
              <Text style={EnterPinStyle().individualNumberText}>3</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={EnterPinStyle().numberParentView}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPressIn={() => this.setState({ numberState: '4' })}
            onPressOut={() => {
              if (this.state.numberState === '4') {
                this.setState({ numberState: '' });
              }
            }}
            onPress={this.numberPress.bind(this, '4')}>
            <View
              style={
                EnterPinStyle(this.state.numberState === '4' ? true : false)
                  .individualNumberView
              }>
              <Text style={EnterPinStyle().individualNumberText}>4</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            onPressIn={() => this.setState({ numberState: '5' })}
            onPressOut={() => {
              if (this.state.numberState === '5') {
                this.setState({ numberState: '' });
              }
            }}
            onPress={this.numberPress.bind(this, '5')}>
            <View
              style={
                EnterPinStyle(this.state.numberState === '5' ? true : false)
                  .individualNumberView
              }>
              <Text style={EnterPinStyle().individualNumberText}>5</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            onPressIn={() => this.setState({ numberState: '6' })}
            onPress={this.numberPress.bind(this, '6')}
            onPressOut={() => {
              if (this.state.numberState === '6') {
                this.setState({ numberState: '' });
              }
            }}>
            <View
              style={
                EnterPinStyle(this.state.numberState === '6' ? true : false)
                  .individualNumberView
              }>
              <Text style={EnterPinStyle().individualNumberText}>6</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={EnterPinStyle().numberParentView}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPressIn={() => this.setState({ numberState: '7' })}
            onPressOut={() => {
              if (this.state.numberState === '7') {
                this.setState({ numberState: '' });
              }
            }}
            onPress={this.numberPress.bind(this, '7')}>
            <View
              style={
                EnterPinStyle(this.state.numberState === '7' ? true : false)
                  .individualNumberView
              }>
              <Text style={EnterPinStyle().individualNumberText}>7</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            onPressIn={() => this.setState({ numberState: '8' })}
            onPressOut={() => {
              if (this.state.numberState === '8') {
                this.setState({ numberState: '' });
              }
            }}
            onPress={this.numberPress.bind(this, '8')}>
            <View
              style={
                EnterPinStyle(this.state.numberState === '8' ? true : false)
                  .individualNumberView
              }>
              <Text style={EnterPinStyle().individualNumberText}>8</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            onPressIn={() => this.setState({ numberState: '9' })}
            onPress={this.numberPress.bind(this, '9')}
            onPressOut={() => {
              if (this.state.numberState === '9') {
                this.setState({ numberState: '' });
              }
            }}>
            <View
              style={
                EnterPinStyle(this.state.numberState === '9' ? true : false)
                  .individualNumberView
              }>
              <Text style={EnterPinStyle().individualNumberText}>9</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={EnterPinStyle().numberParentView}>
          <View style={EnterPinStyle(false).individualNumberView} />
          <TouchableOpacity
            activeOpacity={0.7}
            onPressIn={() => this.setState({ numberState: '0' })}
            onPressOut={() => {
              if (this.state.numberState === '0') {
                this.setState({ numberState: '' });
              }
            }}
            onPress={this.numberPress.bind(this, '0')}>
            <View
              style={
                EnterPinStyle(this.state.numberState === '0' ? true : false)
                  .individualNumberView
              }>
              <Text style={EnterPinStyle().individualNumberText}>0</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            onPressIn={() => this.setState({ numberState: 'back' })}
            onPress={this.back.bind(this, 'back')}
            onPressOut={() => {
              if (this.state.numberState === 'back') {
                this.setState({ numberState: '' });
              }
            }}>
            <View
              style={
                EnterPinStyle(this.state.numberState === 'back' ? true : false)
                  .individualNumberView
              }>
              <Image
                resizeMethod={'auto'}
                resizeMode={'contain'}
                style={{ width: 16, height: 16 }}
                source={require('../../assets/icons/back_pin.png')}
              />
            </View>
          </TouchableOpacity>
        </View>
        {loading === true ? <Loader loader={loading} /> : null}
      </SafeAreaView>
    );
  }
}
const mapStateToProps = state => {
  const { transfers, app } = state;
  const { loading, error } = transfers;
  const { selectedBusinessAccount } = app;
  return {
    loading,
    error,
    selectedBusinessAccount,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    authorize: (data, navigation, token, success) =>
      dispatch(actions.authorize(data, navigation, token, success)),
    transferToNumber: (data, token, navigation, success) =>
      dispatch(actions.transferToNumber(data, token, navigation, success)),
    transferToBeneficiary: (data, token, navigation, success) =>
      dispatch(actions.transferToBeneficiary(data, token, navigation, success)),
    transferToInternal: (data, token, navigation, success) =>
      dispatch(actions.transferToInternal(data, token, navigation, success)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EnterPin);
