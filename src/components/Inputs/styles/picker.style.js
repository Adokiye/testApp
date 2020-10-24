import {StyleSheet} from 'react-native';

const PickerStyle = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 12,
  },
  text: {
    fontSize: 15,
    fontFamily: 'Gilroy-Bold',
    color: '#270450',
    height: 15,
    lineHeight: 15,
  },
  view: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomColor: '#eef0f1',
    borderBottomWidth: 1,
  },
  text1: {
    fontSize: 16,
    fontFamily: 'Gilroy-Semibold',
    lineHeight: 16,
    height: 16,
    color: '#270450',
  },
});

export default PickerStyle;
