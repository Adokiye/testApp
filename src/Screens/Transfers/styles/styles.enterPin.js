import {StyleSheet, Dimensions, Platform} from 'react-native';

const screen = Dimensions.get('screen');

const EnterPinStyle = pressed =>
  StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
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
    securityTextHeader: {
      color: '#1B003B',
      fontFamily: 'Gilroy-Medium',
      fontSize: 24,
      alignSelf: 'center',
    },
    descriptionView:{
      flexDirection: 'row',
      alignSelf: 'center',
      justifyContent: 'space-between',
      width: screen.width * (84 / 100),
      marginBottom: screen.height * (3.7 / 100),
    },
    columnTextView:{
      flexDirection: 'column',
      justifyContent: 'flex-start',
    },
    titleGreyText: {
      color: '#e5e5e5',
      fontSize: 14,
      fontFamily: 'Gilroy-Medium'
    },
    sub_text: {
      color: '#1B003B',
      fontFamily: 'Gilroy-Medium',
      fontSize: 16,
    },
    line:{
      height: 1,
      width: '100%',
      backgroundColor: '#e5e5e5',
      marginBottom: screen.height * (3.8 / 100),
      marginTop: screen.height * (3.8 / 100),
    },
    securityTextSubheader: {
      color: '#9DA1A3',
      fontFamily: 'Gilroy-Medium',
      fontSize: 17,
      alignSelf: 'center',
      marginTop: screen.height * (1.85 / 100),
    },
    paymentSuccesfulText: {
      color: '#1bc47d',
      fontSize: 16,
      alignSelf: 'center',
      fontFamily: 'Gilroy-Medium',
      marginTop: screen.height * (1.85 / 100),
    },
    parentTextInputView: {
      width: screen.width * (84 / 100),
      alignSelf: 'center',
      marginTop: screen.height * (5 / 100),
      marginBottom: screen.height * (7 / 100),
      alignItems: 'center',
      justifyContent: 'space-between',
      flexDirection: 'row',
    },
    checkCircle:{
      backgroundColor: '#1bc47d',
      width: 80,
      height: 80,
      borderRadius: 40,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center'
    },
    pinActiveView: {
      width: 60,
      height: 60,
      borderRadius: 6,
      borderColor: '#4CD964',
      borderWidth: 2,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    pinInactiveView: {
      width: 60,
      height: 60,
      borderRadius: 6,
      borderColor: '#F2F3F5',
      borderWidth: 2,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    textInput: {
      fontSize: 22,
      fontFamily: 'Gilroy-Medium',
      color: '#000',
      textAlign: 'center',
    },
    numberParentView: {
      width: screen.width * (84 / 100),
      height: 75,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      alignSelf: 'center',
      marginBottom: screen.height * (1.85 / 100),
    },
    individualNumberView: {
      width: 75,
      height: 75,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: pressed ? 75/2 : 0,
      elevation: pressed ? 2 : 0,
      shadowColor: pressed ?  'black' : 'white',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity:pressed ?  0.14 : 0,
      shadowRadius: pressed ?  24 : 0,
    },
    individualNumberText: {
      color: '#000',
      fontSize: 24,
      fontFamily: 'Gilroy-Medium',
    },
  });

export default EnterPinStyle;
