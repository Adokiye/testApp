import { StyleSheet, Dimensions } from 'react-native';

const screen = Dimensions.get('screen');

const TransactionDetailsStyle = value =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      flexDirection: 'column',
    },
    backButtonView: {
      width: 30,
      height: 30,
      borderRadius: 15,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#7E51FF',
    },
    backButtonImage: {
      width: 8.91,
      height: 15,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: screen.width * (84 / 100),
      alignSelf: 'center',
      marginTop: screen.height * (1.84 / 100),
      marginBottom: screen.height * (3.7 / 100),
    },
    initialsOval: {
      width: 45,
      height: 45,
      borderRadius: 45 / 2,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: value === 'in' ? '#1bc47d' : '#FA4A84',
    },
    initialsText: {
      color: '#fff',
      fontSize: 15,
      fontFamily: 'Gilroy-Medium',
    },
    descriptionView: {
      width: screen.width * (84 / 100),
      marginTop: screen.height * (3.7 / 100),
      alignSelf: 'center',
      flexDirection: 'column',
    },
    labelText: {
      color: '#5D6262',
      fontFamily: 'Gilroy-Medium',
      fontSize: 12,
    },
    dataText: {
      color: '#1B003B',
      fontSize: 15,
      fontFamily: 'Gilroy-Medium',
      marginTop: screen.height * (1.724 / 100),
    },
  });

export default TransactionDetailsStyle;
