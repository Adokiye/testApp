import { StyleSheet } from 'react-native';
import spaces from '../../../helpers/spaces';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  backIcon: {
    justifyContent: 'center',
    paddingLeft: spaces.appSpacing,
    paddingRight: 10,
  },
  clearIcon: {
    justifyContent: 'center',
    paddingRight: spaces.appSpacing,
    paddingLeft: 10,
  },
  inputBox: {
    fontSize: 18,
    paddingVertical: 15,
    paddingLeft: 15,
    flex: 1,
  },
});
