import React from 'react';
import {Text} from 'react-native';
// import {TextButtonStyle} from './styles/textButton.style';

const TextButton = props => {
  //   const avatarProps = props;
  return (
    <Text
      style={{
        textAlign: 'center',
        fontSize: 16,
        color: '#fa4a84',
        fontFamily: 'Gilroy-Medium',
      }}>
      {props.text}
    </Text>
  );
};

export default TextButton;

// Forgot pin?
