import React from 'react';
import {View} from 'react-native';
import RegisterUserCardStyle from './styles/registerUserCard.style';

const RegisterUserCard = props => {
  const {children} = props;
  return <View style={RegisterUserCardStyle.shadowCard}>{children}</View>;
};

export default RegisterUserCard;
