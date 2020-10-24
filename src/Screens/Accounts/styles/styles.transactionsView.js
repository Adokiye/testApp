import { StyleSheet, Dimensions } from 'react-native';
import spaces from '../../../helpers/spaces';
import colors from '../../../helpers/colors';

const screen = Dimensions.get('screen');

export default StyleSheet.create({
  container: {
    paddingTop: 20,
  },
  activityIndicator: {
    marginTop: 30,
  },
  transGroupContainer: {
    paddingHorizontal: spaces.appSpacing,
  },
  transGroup: {
    marginBottom: 20,
  },
  transTitle: {
    marginTop: 5,
    marginBottom: 15,
    fontFamily: 'Gilroy-Regular',
    color: colors.DEEP_GREY_01,
  },
  transBox: {
    padding: 10,
  },
});
