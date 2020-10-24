import {StyleSheet, Dimensions} from 'react-native';

const screen = Dimensions.get('screen');

const WelcomeStyle = (activeSlide, height) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      position: 'relative',
    },
    animatedView: {
      flex: 1,
      left: activeSlide,
    },
    slidingContainer: {
      position: 'relative',
      width: screen.width * 3,
      flex: 1,
      flexDirection: 'row',
      paddingTop: 60.9,
    },
    slideView: {
      position: 'relative',
      width: screen.width,
      flex: 1,
    },
    headerText: {
      fontSize: 28,
      fontFamily: 'Gilroy-Medium',
      lineHeight: 28,
      marginBottom: 27,
      color: '#270450',
    },
    bodyCopy: {
      fontSize: 19,
      fontFamily: 'Gilroy-Medium',
      lineHeight: 26,
      color: '#5d6262',
      paddingRight: 20,
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
    onboardingImage: {
      width: screen.width,
      height: height,
      marginBottom: 48,
    },
    onboardingTextContainer: {
      paddingHorizontal: 39,
    },
    onboardingFontFamily: {
      fontFamily: 'Gilroy-Bold',
      fontWeight: 'bold',
    },
    onboardingPagination: {
      height: 78,
      position: 'relative',
    },
  });

export default WelcomeStyle;
