import {StyleSheet, Dimensions} from 'react-native';

const screen = Dimensions.get('screen');

const WelcomePagination = (position, opacity) =>
  StyleSheet.create({
    // container: {
    //   position: 'absolute',
    //   bottom: -73,
    //   opacity: opacity,
    //   zIndex: 10,
    //   width: screen.width,
    //   backgroundColor: 'white',
    // },
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
    paginationView: {
      flexDirection: 'row',
    },
  });

export default WelcomePagination;
