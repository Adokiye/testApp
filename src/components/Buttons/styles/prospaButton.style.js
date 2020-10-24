import {StyleSheet, Dimensions, Platform} from 'react-native';

const ProspaButtonStyle = (flex, color, textColor) =>
  StyleSheet.create({
    // container: {
    //   borderRadius: 8,
    //   padding: 2,
    //   flex: flex ? flex : 0,
    //   height: 48,
    // },
    buttonCover: {
      flex: 1,
      backgroundColor: 'white',
      paddingHorizontal: 29,
      borderRadius: 6,
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
    },
    buttonText: {
      fontSize: 17,
      color: '#270450',
      fontFamily: 'Gilroy-Semibold',
      lineHeight: 22,
      height: 22,
      textAlign: 'center',
    },
    activityIndicator: {
      marginLeft: 10,
    },
    buttonOnClick: {
      backgroundColor: color ? color : '#270450',
      paddingHorizontal: 29,
      borderRadius: 8,
      height: 48,
      alignItems: 'center',
      flexDirection: 'row',
      flex: flex ? flex : 0,
      justifyContent: 'center',
    },
    buttonOnClickText: {
      fontSize: 17,
      color: textColor ? textColor : 'white',
      fontFamily: 'Gilroy-Semibold',
      lineHeight: 22,
      height: 22,
      textAlign: 'center',
    },
  });

export default ProspaButtonStyle;
