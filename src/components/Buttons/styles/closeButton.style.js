import { StyleSheet } from 'react-native';
import colors from '../../../helpers/colors';
import spaces from '../../../helpers/spaces';

export default StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 50,
    backgroundColor: '#EBE3FF',
    right: spaces.appSpacing,
    zIndex: 5,
  },
  icon: {
    color: colors.LIGHT_PURPLE_01,
  },
});
