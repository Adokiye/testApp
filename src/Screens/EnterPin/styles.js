import { StyleSheet, Dimensions } from 'react-native';
import colors from '../../helpers/colors';
import spaces from '../../helpers/spaces';

const buttonHeight = 60 + 20; // keyHeight + bottom margin

export default StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  content: {
    flex: 1,
  },
  backButton: {
    marginLeft: spaces.appSpacing,
    marginBottom: 20,
  },
  title: {
    fontFamily: 'Gilroy-Medium',
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 10,
  },
  subTitle: {
    fontFamily: 'Gilroy-Medium',
    fontSize: 16,
    textAlign: 'center',
    color: colors.MEDIUM_GREY_01,
  },
  errorMessage: {
    fontSize: 15,
    textAlign: 'center',
    paddingVertical: 20,
    color: '#F45757',
    fontFamily: 'Gilroy-Medium',
    paddingHorizontal: spaces.appSpacing,
  },
  inputArea: {
    marginHorizontal: spaces.appSpacing * 2,
    flex: 1,
    justifyContent: 'center',
  },
  keypad: {
    height: buttonHeight * 4,
    marginBottom: 20,
  },
});
