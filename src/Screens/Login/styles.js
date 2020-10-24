import { StyleSheet } from 'react-native';
import spaces from '../../helpers/spaces';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'brown',
  },
  content: {
    flex: 1,
  },
  logoImage: {
    width: 135,
    height: 33,
  },
  scrollContainer: {
    flex: 1,
    paddingVertical: 20,
  },
  logoImageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  formArea: {
    paddingHorizontal: spaces.appSpacing,
  },
  errorContainer: {
    backgroundColor: 'white',
    padding: 16,
    marginBottom: 16,
    borderRadius: 3,
  },
  errorMessage: {
    fontSize: 13,
    fontFamily: 'Gilroy-Semibold',
    color: '#fa4a84',
  },
  noAccountText: {
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Gilroy-Medium',
    marginTop: 26,
  },
  forgotPassword: {
    textAlign: 'right',
    color: 'white',
    fontFamily: 'Gilroy-Semibold',
    fontSize: 14,
    marginTop: -9,
    marginBottom: 22,
  },
  signupText: {
    fontFamily: 'Gilroy-Bold',
  },
});
