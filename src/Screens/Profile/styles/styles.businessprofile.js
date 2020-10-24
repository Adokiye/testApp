import {StyleSheet, Dimensions, Platform} from 'react-native';

const screen = Dimensions.get('screen');

const BusinessProfileStyle = () =>
  StyleSheet.create({
    houseImageView: {
      width: 100,
      height: 90,
      flexDirection: 'row',
    },
    editImageView: {
      width: 30,
      height: 30,
      borderRadius: 15,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#7E51FF',
      position: 'absolute',
      right: 0,
      bottom: 0,
    },
    imageView: {
      width: 90,
      height: 90,
      borderRadius: 45,
      alignItems: 'center',
      justifyContent: 'center',
    },
    profileDetailsView: {
      flexDirection: 'column',
      height: 55,
      width: screen.width * (84 / 100),
      alignSelf: 'center',
      justifyContent: 'space-between',
      backgroundColor: '#fff',
      borderBottomColor: '#F2F3F5',
      borderBottomWidth: 2,
      marginTop: screen.height * (3.7 / 100),
      paddingBottom: 10,
    },
    detailsText: {
      fontFamily: 'Gilroy-Medium',
      fontSize: 15,
      color: '#1B003B',
    },
    profileDetailsRowView: {
      flexDirection: 'row',
      height: 55,
      width: screen.width * (84 / 100),
      alignSelf: 'center',
      justifyContent: 'space-between',
      backgroundColor: '#fff',
      borderBottomColor: '#F2F3F5',
      borderBottomWidth: 2,
      marginTop: screen.height * (3.7 / 100),
      alignItems: 'center',
      paddingBottom: 10,
    },
    wrapperColumnCityView: {
      flexDirection: 'column',
      height: 40,
      justifyContent: 'space-between',
      width: '50%',
    },
    verifiedText: {
      color: '#1bc47d',
      fontSize: 13,
      fontFamily: 'Gilroy-Medium',
      marginRight: screen.width * (7.5 / 100),
    },
    unverifiedText: {
      color: '#FF8000',
      fontSize: 13,
      fontFamily: 'Gilroy-Medium',
      marginRight: screen.width * (7.5 / 100),
    },
    wrapperColumnView: {
      flexDirection: 'column',
      height: 40,
      justifyContent: 'space-between',
    },
    selectBankText: {
      color: '#5D6262',
    //  width: screen.width * (84 / 100),
      fontFamily: 'Gilroy-Medium',
      fontSize: 12,
      //alignSelf: 'center',
    },
  });

export default BusinessProfileStyle;
