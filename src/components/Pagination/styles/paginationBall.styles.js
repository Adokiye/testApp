import {StyleSheet, Dimensions} from 'react-native';

const screen = Dimensions.get('screen');

const PaginationBallStyles = StyleSheet.create({
  container: {
    width: 10,
    height: 10,
    marginRight: 10,
    borderRadius: 10,
    padding: 2,
    justifyContent: 'center',
  },
  innerBall: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  altContainer: {
    width: 10,
    height: 10,
    backgroundColor: '#dcdcee',
    marginRight: 10,
    borderRadius: 10,
  },
});

export default PaginationBallStyles;
