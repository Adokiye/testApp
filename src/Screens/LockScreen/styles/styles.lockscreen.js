import {StyleSheet, Dimensions, Platform} from 'react-native';

const screen = Dimensions.get('screen');
// height: Platform.OS === "ios" ? 28 : "auto"
const LockScreenStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6f7',
    position: 'relative',
    height: Platform.OS === 'ios' ? 28 : 'auto',
  },
});

export default LockScreenStyle;
