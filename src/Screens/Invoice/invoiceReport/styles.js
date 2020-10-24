import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    height: 90,
    width: 220,
    padding: 15,
    justifyContent: 'space-between',
    shadowColor: '#E6E6E6',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 1,
    shadowRadius: 4,
    borderRadius: 5,
    elevation: 2,
    backgroundColor: '#fff',
    marginRight: 20,
  },
  label: {
    color: 'grey',
    textTransform: 'uppercase',
    fontFamily: 'Gilroy-Regular',
    fontSize: 13,
  },
  value: {
    fontSize: 23,
  },
});
