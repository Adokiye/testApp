import {StyleSheet, Dimensions} from 'react-native';

const screen = Dimensions.get('screen');

const WelcomeButton = (position, opacity) =>
  StyleSheet.create({
    // container: {
    //   backgroundColor: 'white',
    //   position: 'absolute',
    // //   bottom: position,
    //   left: 0,
    // //   opacity: opacity,
    //   width: screen.width,
    //   zIndex: 10,
    // },
    login: {
      flex: 1,
      marginRight: 17,
    },
    register: {
      flex: 1,
    },
    controlView: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingLeft: 39,
      paddingRight: 39,
      paddingBottom: 39,
      paddingTop: 12,
    },
  });

export default WelcomeButton;
