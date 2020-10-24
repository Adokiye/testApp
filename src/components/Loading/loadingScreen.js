import React, { Fragment } from 'react';
import SplashScreen from 'react-native-splash-screen';
import AsyncStorage from '@react-native-community/async-storage';

const LoadingScreen = ({ navigation }) => {
  const checkUser = async () => {
    const userData = await AsyncStorage.getItem('user_stats');

    if (!userData) {
      SplashScreen.hide();
      return navigation.navigate('Welcome');
    }

    const data = JSON.parse(userData);
    SplashScreen.hide();
    if (data.token) {
      navigation.navigate('Accounts');
    } else {
      navigation.navigate('Login');
    }
  };

  checkUser();

  return <Fragment />;
};

export default LoadingScreen;
