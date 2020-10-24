import { StyleSheet } from 'react-native';
import colors from '../../../helpers/colors';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  inputBox: {
    width: '100%',
    paddingHorizontal: 15,
    paddingVertical: 14,
    borderRadius: 5,
    borderColor: '#ccc',
    color: colors.PRIMARY_PURPLE,
    borderWidth: 1,
    fontFamily: 'Gilroy-Medium',
    letterSpacing: 1,
    fontSize: 16,
  },
  activityIndicator: {
    marginLeft: -30,
  },
});
