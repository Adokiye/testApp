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
  TouchableWithoutFeedback,
  Animated,
  FlatList,
} from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';

import ExternalTransfer from './NewTransfer/ExternalTransfer';
import InternalTransfer from './NewTransfer/InternalTransfer';
import { thousandsSeparators } from '../../helpers/thousandSeparator';

import DashboardTextInput from '../../components/Inputs/dashboardTextInput';

import NewTransferStyle from './styles/styles.newTransfer';

const screen = Dimensions.get('screen');

export default class BottomMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: '',
      bar: 'external',
      bottom_selection: 'Current',
      translateValue: new Animated.Value(screen.height * (51.72 / 100)),
    };
  }

  toggleDetails = shouldOpen => {
    let toValue = 0; // if we need to open our subView, we need to animate it to it original hight.
    //To do this, we will use 'transform: translateY(0)'
    if (!shouldOpen) {
      toValue = screen.height * (51.72 / 100);
    } // if it's already open and we need to hide it, we will use 'transform: translateY(200)'
    Animated.spring(this.state.translateValue, {
      toValue: toValue,
      velocity: 3,
      tension: 2,
      friction: 8,
    }).start(); // the actual animation
  };

  componentDidUpdate() {
    if (this.props.animate) {
      this.toggleDetails(true);
      this.props.animate = false;
    }
  }

  render() {
    //  const {navigate} = this.props.navigation;
    // let height
    let accounts;
    if (this.props.bottom_selection) {
      accounts = (
        <FlatList
          data={this.props.data}
          extraData={this.props}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => this.props.bottom(item)}>
              <View
                style={
                  NewTransferStyle(
                    true,
                    this.props.bottom_selection.id === item.biz_wallet_id
                      ? true
                      : false,
                  ).accountTypeView
                }>
                <View style={NewTransferStyle().accountinitialsOval}>
                  {item.biz_wallet_type !== 'current' ? (
                    <Image
                      resizeMethod={'auto'}
                      resizeMode={'contain'}
                      style={{ width: 15, height: 15 }}
                      source={require('../../assets/icons/accountsTax.png')}
                    />
                  ) : (
                    <Image
                      resizeMethod={'auto'}
                      resizeMode={'contain'}
                      style={{ width: 15, height: 15 }}
                      source={require('../../assets/icons/accountsActive.png')}
                    />
                  )}
                </View>
                <View style={NewTransferStyle().wrapperColumnView}>
                  <Text style={NewTransferStyle().companyNameText}>
                    {item.preferred_name} Account
                  </Text>
                  <Text style={NewTransferStyle().companyDetailsText}>
                    {'\u20A6'}
                    {thousandsSeparators(item.available_balance)}
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'flex-end',
                    alignItems: 'flex-end',
                    marginRight: screen.width * (3.73 / 100),
                  }}>
                  <View style={NewTransferStyle().circle}>
                    <View
                      style={
                        this.props.bottom_selection.id === item.biz_wallet_id
                          ? NewTransferStyle().activeInnerCircle
                          : NewTransferStyle().inactiveInnerCircle
                      }
                    />
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => `list-item-${index}`}
        />
      );
    } else {
      accounts = (
        <FlatList
          data={this.props.data}
          extraData={this.props}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => this.props.bottom(item)}>
              <View style={NewTransferStyle(true, false).accountTypeView}>
                <View style={NewTransferStyle().accountinitialsOval}>
                  {item.biz_wallet_type !== 'current' ? (
                    <Image
                      resizeMethod={'auto'}
                      resizeMode={'contain'}
                      style={{ width: 15, height: 15 }}
                      source={require('../../assets/icons/accountsTax.png')}
                    />
                  ) : (
                    <Image
                      resizeMethod={'auto'}
                      resizeMode={'contain'}
                      style={{ width: 15, height: 15 }}
                      source={require('../../assets/icons/accountsActive.png')}
                    />
                  )}
                </View>
                <View style={NewTransferStyle().wrapperColumnView}>
                  <Text style={NewTransferStyle().companyNameText}>
                    {item.preferred_name} Account
                  </Text>
                  <Text style={NewTransferStyle().companyDetailsText}>
                    {'\u20A6'}
                    {thousandsSeparators(item.available_balance)}
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'flex-end',
                    alignItems: 'flex-end',
                    marginRight: screen.width * (3.73 / 100),
                  }}>
                  <View style={NewTransferStyle().circle}>
                    <View style={NewTransferStyle().inactiveInnerCircle} />
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => `list-item-${index}`}
        />
      );
    }

    return (
      <Animated.View
        style={[
          NewTransferStyle().bottomMenu,
          { transform: [{ translateY: this.state.translateValue }] },
        ]}>
        <TouchableWithoutFeedback
          onPress={() => {
            this.props.showBottom('false');
            this.toggleDetails(false);
          }}>
          <View style={NewTransferStyle().divider} />
        </TouchableWithoutFeedback>
        <Text style={NewTransferStyle().bottomMenuSelectText}>
          Select account
        </Text>
        <View style={NewTransferStyle().line} />
        <ScrollView contentContainerStyle={{ width: '100%' }}>
          {accounts}
        </ScrollView>
        <TouchableOpacity
          activeOpactity={0.7}
          onPress={() => {
            this.props.showBottom('false');
            this.toggleDetails(false);
          }}>
          <View style={NewTransferStyle(true).transferMoneyView}>
            <Text style={NewTransferStyle().transferMoneyText}>Continue</Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  }
}
