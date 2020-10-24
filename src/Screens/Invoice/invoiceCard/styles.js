import {StyleSheet, Dimensions} from 'react-native';

const screen = Dimensions.get('screen');
const appSideSpacing = screen.width * (8 / 100);

export default StyleSheet.create({
  container: {
    padding: 20,
    shadowColor: '#E6E6E6',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 2,
    borderRadius: 7,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
    marginHorizontal: appSideSpacing,
  },
  invoiceNumber: {
    color: '#74777B',
    fontSize: 13,
    marginTop: 6,
  },
  dueDate: {
    color: '#FA4A84',
    fontSize: 14,
    marginTop: 6,
  },
  rightContent: {
    alignItems: 'flex-end',
  },
  text: {
    letterSpacing: 0.5,
    fontSize: 14,
    fontFamily: 'Gilroy-Medium',
    color: '#1B003B',
  },
});
