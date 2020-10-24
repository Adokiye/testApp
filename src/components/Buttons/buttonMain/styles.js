import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    borderRadius: 6,
    justifyContent: 'center',
    paddingHorizontal: 10,
    alignItems: 'center',
    backgroundColor: '#FA4A84',
    height: 44,
    flexDirection: 'column',
  },
  content: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Gilroy-Bold',
    color: '#fff',
    fontSize: 16,
    marginBottom: -4,
    textAlign: 'center',
    flex: 1,
  },
});
