import { StyleSheet, Dimensions } from 'react-native';

const screen = Dimensions.get('screen');

const DashboardSearchStyle = StyleSheet.create({
  container: {
    // backgroundColor: '#ddd',
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
    width: screen.width - 32,
    alignSelf: 'center',
    marginTop: screen.height * (1.84 / 100),
    marginBottom: screen.height * (3.7 / 100),
  },
  activeTextInputView: {
    borderBottomColor: '#707070',
    borderTopColor: '#707070',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    width: screen.width,
    height: 50,
    backgroundColor: '#fff',
    alignSelf: 'center',
    // marginBottom: '3.81%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  inactiveTextInputView: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#EEF0F1',
    borderTopColor: '#EEF0F1',
    width: screen.width,
    height: 50,
    backgroundColor: '#fff',
    alignSelf: 'center',
    //   marginBottom: '3.81%',
  },
  beneficiariesView: {
    width: screen.width,
    height: 60,
    alignSelf: 'center',
    flexDirection: 'row',
    marginTop: screen.height * (2.7 / 100),
    alignItems: 'center',
    //   paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EEF0F1',
    paddingVertical: screen.width * (8 / 100),
  },
  initialsOval: {
    width: 45,
    height: 45,
    borderRadius: 45 / 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FA4A84',
    marginLeft: screen.width * (4 / 100),
  },
  initialsText: {
    color: '#fff',
    fontSize: 13,
    fontFamily: 'Gilroy-Medium',
  },
  wrapperColumnView: {
    flexDirection: 'column',
    marginLeft: screen.width * (4 / 100),
  },
  companyNameText: {
    fontSize: 13,
    color: '#1B003B',
    fontFamily: 'Gilroy-Medium',
  },
  companyDetailsText: {
    color: '#9CA0A5',
    fontSize: 11,
    fontFamily: 'Gilroy-Medium',
  },
});

export default DashboardSearchStyle;
