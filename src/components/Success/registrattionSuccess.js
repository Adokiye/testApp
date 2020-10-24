/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  SafeAreaView,
  Image,
  TouchableOpacity,
  View,
  Text,
  StatusBar,
} from 'react-native';

import RegisterUserCard from '../Cards/registerUserCard';
import ProspaButton from '../Buttons/prospaButton';
import RegistrationSuccessStyle from './styles/style.registrationSuccess';

export default class RegistrationSuccess extends Component {
  render() {
    return (
      <SafeAreaView style={RegistrationSuccessStyle.container}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="white"
          translucent={false}
        />
        <View style={RegistrationSuccessStyle.viewStyle}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Image
              source={require('../../assets/icons/back_arrow.png')}
              style={{width: 24, height: 24}}
              resizeMethod="auto"
              resizeMode="center"
            />
          </TouchableOpacity>
        </View>
        <View style={{flex: 1, paddingHorizontal: 24, paddingTop: 46}}>
          <Text style={RegistrationSuccessStyle.textView}>
            <Text style={{fontFamily: 'Gilroy-Bold'}}>thank you</Text> for
            registering with prospa
          </Text>
          <RegisterUserCard>
            <View style={RegistrationSuccessStyle.viewStyle2}>
              <Image
                source={require('../../assets/icons/registration_success.png')}
                resizeMethod="auto"
                resizeMode="center"
                style={{height: 139}}
              />
            </View>
            <Text style={RegistrationSuccessStyle.textView2}>
              Please tell us wether your business is registered or un-registered
            </Text>
            <ProspaButton
              text="Limited Liability"
              handleClick={() =>
                this.props.navigation.push('CreateRegisteredAccount')
              }
            />
            <View style={{marginBottom: 13}} />
            <ProspaButton
              gradient={true}
              text="Business name Registration"
              handleClick={() =>
                this.props.navigation.push('CreateUnregisteredAccount')
              }
            />
          </RegisterUserCard>
        </View>
      </SafeAreaView>
    );
  }
}
