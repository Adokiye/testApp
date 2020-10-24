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
} from 'react-native';

import UserProfile from './UserProfile';
import BusinessProfile from './BusinessProfile';

import { connect } from 'react-redux';
import Loader from '../../components/Loading/overlayLoader';
import AsyncStorage from '@react-native-community/async-storage';
import * as appActions from '../../actions/app';
import Alert from '../../components/Alert/alert';

import ProfileStyle from './styles/styles.profile';

const screen = Dimensions.get('screen');

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bar: 'personal',
      first_name: '',
      last_name: '',
      profile: '',
    };
  }

  async componentDidMount() {
    const store = await AsyncStorage.getItem('user_stats');

    let stats = JSON.parse(store);
    console.log(stats.token);
    //   const {biz_account_id, biz_account_number} = await this.props
    //   .selectedBusinessAccount;
    // this.setState({biz_account_number, biz_account_id});
    await this.props.getProfile(stats.token);
    this.setState({ first_name: stats.first_name, last_name: stats.last_name });
    console.log('akslaksalsl' + '\n' + '\n');
  }

  render() {
    //  const {navigate} = this.props.navigation;
    // let height
    const { profile_, error } = this.props;
    const { selectedBusinessAccount } = this.props;
    return (
      <SafeAreaView style={ProfileStyle().container}>
        <Alert status="danger" message={error} />
        <View style={ProfileStyle().header}>
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
        <View style={ProfileStyle().textView}>
          <Text style={ProfileStyle().welcomeText}>My Profile</Text>
        </View>
        <View style={ProfileStyle().parentTransferBar}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => this.setState({ bar: 'personal' })}>
            <View
              style={
                this.state.bar === 'personal'
                  ? ProfileStyle().activeButton
                  : ProfileStyle().inactiveButton
              }>
              <Text
                style={
                  this.state.bar === 'personal'
                    ? ProfileStyle().activeText
                    : ProfileStyle().inactiveText
                }>
                Personal
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => this.setState({ bar: 'business' })}>
            <View
              style={
                this.state.bar === 'business'
                  ? ProfileStyle().activeButton
                  : ProfileStyle().inactiveButton
              }>
              <Text
                style={
                  this.state.bar === 'business'
                    ? ProfileStyle().activeText
                    : ProfileStyle().inactiveText
                }>
                Business
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={ProfileStyle().backWhite}>
          {this.state.bar === 'personal' ? (
            <UserProfile
              first_name={this.state.first_name}
              last_name={this.state.last_name}
              navigation={this.props.navigation}
              profile={profile_}
            />
          ) : (
            <BusinessProfile
              navigation={this.props.navigation}
              profile={selectedBusinessAccount}
            />
          )}
        </View>
      </SafeAreaView>
    );
  }
}
const mapStateToProps = state => {
  //console.log(state, 'STATE');
  const { app, profile } = state;
  const { selectedBusinessAccount, profile_ } = app;
  const { error } = profile;

  return {
    selectedBusinessAccount,
    error,
    profile_,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getProfile: (payload, token) =>
      dispatch(appActions.getProfile(payload, token)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Profile);
