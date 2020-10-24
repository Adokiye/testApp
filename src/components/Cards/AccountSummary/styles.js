import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 25,
    marginBottom: 20,
  },
  subTitle: {
    textTransform: 'uppercase',
    color: '#5D6262',
    fontFamily: 'Gilroy-Medium',
    letterSpacing: 1,
    fontSize: 13,
  },
  mainTitle: {
    textTransform: 'capitalize',
    fontSize: 24,
    color: '#1B003B',
    marginTop: 13,
  },
  summaryBar: {
    marginTop: 20,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  labelLeft: {
    fontSize: 14,
    color: '#5D6262',
    fontFamily: 'Gilroy-Medium',
  },
  labelRight: {
    fontSize: 15,
    fontFamily: 'Gilroy-Medium',
  },
});
