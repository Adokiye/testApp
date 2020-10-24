import {StyleSheet, Dimensions} from 'react-native';

const screen = Dimensions.get('screen');
const appSideSpacing = screen.width * (8 / 100);

export default StyleSheet.create({
  topButton: {
    margin: appSideSpacing,
  },
  invoiceCards: {
    paddingTop: 20,
  },
  invoiceLabel: {
    color: '#5D6262',
    marginTop: 20,
    marginBottom: 5,
    marginLeft: appSideSpacing,
    fontFamily: 'Gilroy-Medium',
  },
  empty: {
    textAlign: 'center',
    marginRight: appSideSpacing,
  },
});
