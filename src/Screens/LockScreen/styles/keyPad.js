import {StyleSheet, Platform} from 'react-native';

const KeyPadStyle = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: Platform.OS === 'ios' ? 'auto' : 30,
  },
  viewContainer: {
    flexDirection: 'column',
    width: 270,
  },
  view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 38,
  },
  zeroView: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 38,
  },
});

export default KeyPadStyle;
