import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import Registration from '../Screens/CustomerRegister/index';
import PinLogin from '../Screens/LockScreen/index';
import RegistrationSuccess from '../components/Success/registrattionSuccess';
import CreateRegisteredAccount from '../Screens/RegisteredBusiness/index';
import CreateUnregisteredAccount from '../Screens/UnregisteredBusiness/index';
import Login from '../Screens/Login/index';
// import {AutoCompleteAddress} from '../components/SearchResults/autoComplete';
import { fromRight } from 'react-navigation-transitions';

const AuthenticationStack = createStackNavigator(
  {
    Login: Login,
    Register: Registration,
    RegistrationSuccess: RegistrationSuccess,
    PinLogin: PinLogin,
    CreateRegisteredAccount: CreateRegisteredAccount,
    CreateUnregisteredAccount: CreateUnregisteredAccount,
    // AutoCompleteAddress: AutoCompleteAddress,
  },
  {
    headerMode: 'none',
    initialRouteName: 'Login',
    transitionConfig: () => fromRight(),
  },
);

export default AuthenticationStack;
