import {StyleSheet, Platform} from 'react-native';

const AvatarStyle = (size, font, position, hexColor, margin) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 49,
      flexDirection: 'column',
      alignItems: 'center',
      paddingTop: Platform.OS === 'ios' ? 42 : 18,
      marginBottom: 37,
    },
    userAvatar: {
      width: 68,
      height: 68,
      borderRadius: 68,
      marginBottom: 24,
    },
    userText: {
      fontSize: size,
      fontFamily: font,
      textAlign: position,
      color: hexColor,
      marginBottom: margin,
    },
  });

export default AvatarStyle;
