import {StyleSheet} from 'react-native';

const TextButtonStyle = (position, size, hexColor, font) =>
  StyleSheet.create({
    container: {
      textAlign: position,
      fontSize: size,
      color: hexColor,
      fontFamily: font,
    },
  });

export default TextButtonStyle;
