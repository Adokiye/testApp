import { StyleSheet } from 'react-native';
import colors from '../../../helpers/colors';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 15,
    alignItems: 'center',
  },
  iconContainer: {
    height: 50,
    width: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoContainer: {
    flex: 1,
    paddingLeft: 20,
    marginBottom: -5,
  },
  title: {
    textTransform: 'capitalize',
    fontSize: 17,
    fontFamily: 'Gilroy-Medium',
  },
  info: {
    fontSize: 13,
    letterSpacing: 1,
    color: colors.DEEP_GREY_01,
  },
  radioButton: {
    height: 14,
    width: 14,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: '#eee',
  },
});
