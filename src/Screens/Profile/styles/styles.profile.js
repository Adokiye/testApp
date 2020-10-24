import {StyleSheet, Dimensions, Platform} from 'react-native';

const screen = Dimensions.get('screen');

const ProfileStyle = () =>
  StyleSheet.create({
    container: {
      backgroundColor: '#1B003B',
      flex: 1,
      flexDirection: 'column',
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: screen.width * (84 / 100),
      alignSelf: 'center',
      marginTop: screen.height * (1.84 / 100),
    },
    backButtonView: {
      alignItems: 'center',
      justifyContent: 'center',
      width: 9,
      height: 15,
    },
    newTransferTextHeader: {
      color: '#fff',
      fontFamily: 'Gilroy-Medium',
      fontSize: 17,
    },
    textView: {
      width: screen.width * (84 / 100),
      alignSelf: 'center',
    },
    welcomeText: {
      fontFamily: 'Gilroy-Medium',
      color: '#fff',
      fontSize: 32,
      //marginTop: screen.height * (0.616 / 100),
    },
    parentTransferBar: {
      width: screen.width * (84 / 100),
      height: 30,
      borderWidth: 1,
      borderColor: '#7E51FF',
      borderRadius: 4,
      alignSelf: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      marginTop: screen.height * (2.7 / 100),
      marginBottom: screen.height * (3.69 / 100),
      justifyContent: 'space-between',
    },
    activeButton: {
      width: screen.width * (41 / 100),
      height: 30,
      borderTopLeftRadius: 4,
      borderBottomLeftRadius: 4,
      backgroundColor: '#7E51FF',
      alignItems: 'center',
      justifyContent: 'center',
    },
    activeText: {
      color: '#fff',
      fontFamily: 'Gilroy-Medium',
      fontSize: 13,
    },
    inactiveButton: {
      width: screen.width * (41 / 100),
      height: 30,
      borderTopRightRadius: 4,
      borderBottomRightRadius: 4,
      alignItems: 'center',
      justifyContent: 'center',
    },
    inactiveText: {
      color: '#7E51FF',
      fontSize: 13,
      fontFamily: 'Gilroy-Medium',
    },
    backWhite: {
      flex: 1,
      borderTopLeftRadius: 14,
      borderTopRightRadius: 14,
      paddingTop: screen.height * (5 / 100),
      marginTop: screen.height *(3.7/100),
      // position: 'absolute',
       bottom: 0,
      backgroundColor: 'white',
      paddingBottom: 10
    },
  });

export default ProfileStyle;
