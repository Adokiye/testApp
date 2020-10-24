import {StyleSheet} from 'react-native';

const RegistrationSuccessStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6f7',
    position: 'relative',
  },
  viewStyle: {
    position: 'relative',
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
  },
  textView: {
    fontSize: 22,
    fontFamily: 'Gilroy-Medium',
    color: '#270450',
    lineHeight: 24,
    marginBottom: 39,
  },
  viewStyle2: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 22,
  },
  textView2: {
    fontSize: 17,
    textAlign: 'center',
    fontFamily: 'Gilroy-Medium',
    color: '#5d6262',
    marginBottom: 32,
  },
});

export default RegistrationSuccessStyle;
