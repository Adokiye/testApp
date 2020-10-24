import { StyleSheet } from 'react-native';
import colors from '../../helpers/colors';

const labelStyles = {
  color: colors.MEDIUM_GREY_01,
  textTransform: 'uppercase',
  fontSize: 13,
  letterSpacing: 1,
  fontFamily: 'Gilroy-Medium',
  marginBottom: 5,
};

const mediumStyles = {
  fontSize: 17,
};

const processStyle = ({ label, medium }) =>
  StyleSheet.create({
    text: {
      color: colors.PRIMARY_PURPLE,
      fontFamily: 'Gilroy-Medium',
      letterSpacing: 0.5,
      ...(label ? labelStyles : {}),
      ...(medium ? mediumStyles : {}),
    },
  });

export default processStyle;
