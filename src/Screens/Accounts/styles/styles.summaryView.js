import { StyleSheet, Dimensions } from 'react-native';
import spaces from '../../../helpers/spaces';
import colors from '../../../helpers/colors';

const screen = Dimensions.get('screen');

export default StyleSheet.create({
  container: {
    height: '100%',
  },
  summaryContainer: {
    marginHorizontal: spaces.appSpacing,
  },
  infoContainer: {
    paddingTop: spaces.appSpacing,
    paddingHorizontal: spaces.appSpacing,
    paddingBottom: 10,
  },
  label: {
    color: colors.MEDIUM_GREY_01,
    fontFamily: 'Gilroy-Medium',
    fontSize: 13,
    marginBottom: 5,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  infoText: {
    fontFamily: 'Gilroy-Medium',
    fontSize: 20,
    color: colors.PRIMARY_PURPLE,
    letterSpacing: 1,
    marginBottom: 14,
  },
});
