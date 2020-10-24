import { StyleSheet } from 'react-native';

const DatePickerStyle = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text1: {
    fontSize: 15,
    fontFamily: 'Gilroy-Bold',
    color: '#270450',
    height: 15,
    lineHeight: 15,
  },
  text2: {
    fontSize: 16,
    fontFamily: 'Gilroy-Semibold',
    lineHeight: 16,
    height: 16,
    color: '#270450',
  },
  content: {
    backgroundColor: '#fff',
  },
  view1: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  view2: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomColor: '#eef0f1',
    borderBottomWidth: 1,
  },
});

export default DatePickerStyle;
