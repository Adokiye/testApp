import { StyleSheet } from 'react-native';
import spaces from '../../../helpers/spaces';
import colors from '../../../helpers/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spaces.appSpacing,
  },
  content: {
    flex: 1,
    marginTop: 45,
    // justifyContent: 'center',
  },
  flex1: {
    flex: 1,
  },
  topArea: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    height: '40%',
  },
  bottomArea: {
    paddingTop: 20,
    flex: 1,
  },
  topIcon: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: colors.LIGHT_PURPLE_01,
    alignItems: 'center',
    justifyContent: 'center',
  },
  amount: {
    fontFamily: 'Gilroy-Medium',
    fontSize: 25,
    marginTop: 20,
  },
  description: {
    fontFamily: 'Gilroy-Medium',
    fontSize: 16,
    paddingHorizontal: 10,
    textAlign: 'center',
    marginVertical: 10,
    color: colors.MEDIUM_GREY_01,
  },
  category: {
    backgroundColor: colors.LIGHT_PURPLE_02,
    paddingHorizontal: 15,
    paddingVertical: 7,
    borderRadius: 10,
    marginBottom: 10,
  },
  categoryText: {
    color: colors.LIGHT_PURPLE_01,
  },
  infoPair: {
    marginBottom: 15,
  },
});
