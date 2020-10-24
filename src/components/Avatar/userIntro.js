import React from 'react';
import {Text, View, Image} from 'react-native';
import AvatarStyle from './styles/userIntro.styles';

const UserIntro = props => {
  //   const avatarProps = props;
  return (
    <View style={AvatarStyle().container}>
      {/* <Image
        source={require('../../assets/images/user_avatar.png')}
        resizeMethod="auto"
        resizeMode="cover"
        style={{width: 68, height: 68, borderRadius: 68, marginBottom: 24}}
      /> */}
      {/* <Text
        style={AvatarStyle(21, 'Gilroy-Bold', 'center', '#270450', 7).userText}>
        Welcome back, John
      </Text> */}
      <Text
        style={AvatarStyle(16, 'Gilroy-Medium', 'center', '#5d6262').userText}>
        Enter your access code to log into your account
      </Text>
    </View>
  );
};

export default UserIntro;
