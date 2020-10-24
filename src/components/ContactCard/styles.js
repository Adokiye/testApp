import { StyleSheet, Dimensions } from 'react-native';

const screen = Dimensions.get('screen');
const appSideSpacing = screen.width * (8 / 100);

export default StyleSheet.create({
  container: {
    paddingHorizontal: appSideSpacing,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EEF0F1',
  },
  flex1: {
    flex: 1,
  },
  initialsOval: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EEF0F1',
  },
  initialsText: {
    color: '#5D6262',
    fontSize: 14,
    fontFamily: 'Gilroy-Medium',
    marginBottom: -4,
  },
  contentRow: {
    flexDirection: 'row',
    marginLeft: screen.width * (4 / 100),
  },
  companyNameText: {
    marginRight: 8,
    flex: 1,
    fontSize: 14,
    color: '#1B003B',
    fontFamily: 'Gilroy-Medium',
    letterSpacing: 0.5,
  },
  text: {
    color: '#74777B',
    fontSize: 12,
    fontFamily: 'Gilroy-Medium',
    letterSpacing: 0.5,
  },
  bottomRight: {
    textAlign: 'right',
    flex: 1,
  },
  topRight: {
    textAlign: 'right',
    fontSize: 13,
    color: '#1B003B',
    fontFamily: 'Gilroy-Medium',
    letterSpacing: 0.5,
  },
});
