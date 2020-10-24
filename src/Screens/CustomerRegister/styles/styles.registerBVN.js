import {StyleSheet, Dimensions} from 'react-native';

const screen = Dimensions.get('screen');

const registerBVNStyle = StyleSheet.create({
  font: {
    fontFamily: 'Gilroy-Bold',
  },
  text: {
    fontSize: 11,
    lineHeight: 15,
    color: '#9ca0a5',
    fontFamily: 'Gilroy-Medium',
    marginBottom: 28,
  },
  headerText: {
    fontSize: 22,
    lineHeight: 24,
    fontFamily: 'Gilroy-Medium',
    color: '#270450',
    marginBottom: 29,
  },
});

export default registerBVNStyle;
