import {StyleSheet} from 'react-native';

const ClearKeyStyle = StyleSheet.create({
  container: {
    width: 60,
    height: 60,
    borderRadius: 60,
    position: 'absolute',
    right: 0,
  },
  clearView: {
    flex: 1,
    width: 60,
    height: 60,
    borderRadius: 60,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ClearKeyStyle;
