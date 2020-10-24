import {StyleSheet, Dimensions} from 'react-native';

const screen = Dimensions.get('screen');

const PendingDetailsStyle =  StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
  },
  backButtonView: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#7E51FF',
  },
  backButtonImage: {
    width: 8.91,
    height: 15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: screen.width * (84/100),
    alignSelf: 'center',
    marginTop: screen.height * (1.84 / 100),
    marginBottom: screen.height * (3.7 / 100),
  },
  initialsOval: {
    width: 45,
    height: 45,
    borderRadius: 45 / 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FA4A84',
  },
  descriptionView: {
      width: screen.width * (84 / 100),
      marginTop: screen.height * (3.7 / 100),
      alignSelf: 'center',
      flexDirection: 'column',
  },
  labelText: {
      color: '#5D6262',
      fontFamily: 'Gilroy-Medium',
      fontSize: 12,
  },
  dataText: {
      color: '#1B003B',
      fontSize: 15,
      fontFamily: 'Gilroy-Medium',
      marginTop: screen.height * (1.724 / 100),
  },
  authorizeView: {
      width: screen.width * (40/100),
      height: 45,
      borderRadius: 6,
      backgroundColor: '#FA4A84',
      alignItems: 'center',
      justifyContent: 'center',
  },
  authorizeText: {
      color: '#fff',
      fontSize: 17,
      fontFamily: 'Gilroy-Medium',
  },
  cancelView: {
    width: screen.width * (40/100),
    height: 45,
    borderRadius: 6,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#FA4A84',
    borderWidth: 1,
  },
  cancelText: {
    color: '#FA4A84',
    fontSize: 17,
    fontFamily: 'Gilroy-Medium',
  },
  buttonView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: screen.width * (84/100),
    alignSelf: 'center',
    marginTop: screen.height * (1.84 / 100),
    marginBottom: screen.height * (1.84 / 100),
  },
});

export default PendingDetailsStyle;
