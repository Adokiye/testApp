import { StyleSheet, Dimensions, Platform } from 'react-native';

const PinKeyStyle = StyleSheet.create({
  container: {
    width: 60,
    height: 60,
    borderRadius: 60,
  },
  view: {
    flex: 1,
    borderRadius: 60,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  keytext: {
    textAlign: 'center',
    fontSize: 28,
    color: '#270450',
    fontFamily: 'Gilroy-Medium',
    height: Platform.OS === 'ios' ? 28 : 'auto',
  },
});

export default PinKeyStyle;
