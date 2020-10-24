import {StyleSheet} from 'react-native';

const LockPinBallStyle = (diameter, value) =>
  StyleSheet.create({
    container: {
      width: 13,
      height: 13,
      justifyContent: 'center',
      flexDirection: 'row',
      alignItems: 'center',
    },
    ball: {
      width: diameter,
      height: diameter,
      borderRadius: diameter,
      backgroundColor: '#fa4a84',
      opacity: 0.34,
    },
  });

export default LockPinBallStyle;
