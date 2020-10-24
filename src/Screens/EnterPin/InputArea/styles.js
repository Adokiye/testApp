import { StyleSheet } from 'react-native';
import colors from '../../../helpers/colors';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputBox: {
    padding: 10,
    borderWidth: 2,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.LIGHT_GREY_01,
    height: 60,
    width: 60,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#ccc',
  },
});
