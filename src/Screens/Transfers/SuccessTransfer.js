/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import {
  Text,
  View,
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  SafeAreaView,
  TextInput,
} from 'react-native';
import moment from 'moment';
import { thousandsSeparators } from '../../helpers/thousandSeparator';

import Alert from '../../components/Alert/alert';

import EnterPinStyle from './styles/styles.enterPin';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import { connect } from 'react-redux';
import Loader from '../../components/Loading/overlayLoader';
import AsyncStorage from '@react-native-community/async-storage';
import * as actions from '../../actions/transfers.action';

const screen = Dimensions.get('screen');

class SuccessTransfer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    const store = await AsyncStorage.getItem('user_stats');
    const { token } = JSON.parse(store);
    this.setState({ token });
  }

  render() {
    const { error_state } = this.state;
    // let height
    const { loading, error } = this.props;
    const { params } = this.props.navigation.state;
    return (
      <SafeAreaView style={EnterPinStyle().container}>
        <View style={EnterPinStyle().header}>
          <TouchableOpacity
            activeOpacity={0.7}
            hitSlop={{ left: 5, right: 5, top: 5, bottom: 5 }}
            onPress={() => this.props.navigation.navigate('Accounts')}>
            <View
              style={{
                width: 30,
                height: 30,
                borderRadius: 15,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <MaterialCommunityIcon
                name="close-circle"
                color={'#1B003B'}
                size={25}
              />
            </View>
          </TouchableOpacity>
        </View>
        <View style={EnterPinStyle().checkCircle}>
          <MaterialCommunityIcon name="check" color={'white'} size={30} />
        </View>
        <Text style={EnterPinStyle().paymentSuccesfulText}>
          Payment Successful!
        </Text>
        <Text style={EnterPinStyle().securityTextSubheader}>
          {'\u20A6'}
          {params.amount ? thousandsSeparators(params.amount) : null}
        </Text>
        <View style={EnterPinStyle().line} />
        <ScrollView>
          <View style={EnterPinStyle().descriptionView}>
            <View style={EnterPinStyle().columnTextView}>
              <Text style={EnterPinStyle().titleGreyText}>Date</Text>
              <Text style={EnterPinStyle().sub_text}>
                {moment().format('DD MMMM, YYYY')}
              </Text>
            </View>
            <View style={EnterPinStyle().columnTextView}>
              <Text style={EnterPinStyle().titleGreyText}>Time</Text>
              <Text style={EnterPinStyle().sub_text}>
                {moment().format('hh:mm:ss A')}
              </Text>
            </View>
          </View>
          <View style={EnterPinStyle().descriptionView}>
            <View style={EnterPinStyle().columnTextView}>
              <Text style={EnterPinStyle().titleGreyText}>Paid to</Text>
              <Text style={EnterPinStyle().sub_text}>{params.paid_to}</Text>
            </View>
            <View style={EnterPinStyle().columnTextView}>
              <Text style={EnterPinStyle().titleGreyText}>Type</Text>
              <Text style={EnterPinStyle().sub_text}>{params.type}</Text>
            </View>
          </View>
        </ScrollView>
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
    authorize: (data, navigation, token) =>
      dispatch(actions.authorize(data, navigation, token)),
    transferToNumber: (data, token, navigation) =>
      dispatch(actions.transferToNumber(data, token, navigation)),
    transferToBeneficiary: (data, token, navigation) =>
      dispatch(actions.transferToBeneficiary(data, token, navigation)),
    transferToInternal: (data, token, navigation) =>
      dispatch(actions.transferToInternal(data, token, navigation)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SuccessTransfer);
