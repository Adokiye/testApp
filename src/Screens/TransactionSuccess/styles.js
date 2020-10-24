import { StyleSheet } from 'react-native';
import colors from '../../helpers/colors';
import spaces from '../../helpers/spaces';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentArea: {
    flex: 1,
  },
  topSection: {
    height: '40%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomSection: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: spaces.appSpacing,
    paddingRight: 20,
  },
  title: {
    color: colors.MEDIUM_GREEN_01,
    fontSize: 16,
    fontFamily: 'Gilroy-Medium',
  },
  amount: {
    fontSize: 26,
    fontFamily: 'Gilroy-Medium',
    marginTop: 10,
    letterSpacing: 1,
  },
  infoSection: {
    width: '50%',
    marginBottom: 30,
  },
  infoText: {
    fontSize: 16,
  },
  dismissButton: {
    marginHorizontal: spaces.appSpacing,
    marginBottom: 20,
  },
});
