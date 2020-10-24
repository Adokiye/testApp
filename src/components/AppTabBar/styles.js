import { StyleSheet, Dimensions } from 'react-native';
import colors from '../../helpers/colors';

const screen = Dimensions.get('screen');

export const tabIconStyle = isActive => {
  return StyleSheet.create({
    container: {
      borderTopColor: isActive ? colors.PRIMARY_PINK : 'transparent',
      borderTopWidth: 2,
      paddingTop: 8,
      position: 'absolute',
      top: 0,
    },
    iconBackground: {
      backgroundColor: isActive ? colors.LIGHT_PINK_01 : colors.LIGHT_GREY_01,
      width: 30,
      height: 30,
      borderRadius: 15,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
};

export const tabBarStyle = {
  borderTopColor: 'transparent',
  borderTopLeftRadius: 18,
  borderTopRightRadius: 18,
  elevation: 15,
  backgroundColor: '#fff',
  shadowOffset: { width: 0, height: 3 },
  shadowColor: '#ccc',
  shadowRadius: 10,
  shadowOpacity: 0.8,
  height: 65,
};

export const labelStyle = {
  fontFamily: 'Gilroy-Medium',
};

export const tabStyle = {
  height: 60,
};
