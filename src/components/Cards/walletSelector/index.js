import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import styles from './styles';
import ShadowView from '../../ShadowView';
import { CustomText } from '../../Text';
import CustomIcon from '../../CustomIcon';
import colors from '../../../helpers/colors';

const WalletSelector = ({
  title,
  info,
  type,
  onPress,
  selectable,
  selected,
}) => {
  let iconColor = colors.LIGHT_PURPLE_01;
  let iconBackground = colors.LIGHT_PURPLE_02;

  if (type === 'current') {
    iconColor = colors.PRIMARY_PINK;
    iconBackground = colors.LIGHT_PINK_01;
  }

  let buttonActiveStyles = selected
    ? {
        backgroundColor: colors.LIGHT_GREEN_01,
        borderColor: '#eee',
      }
    : {};

  let cardActiveStyles = selected
    ? {
        borderColor: colors.LIGHT_GREEN_01,
        borderWidth: 1,
        shadowOpacity: 0,
        elevation: 0,
      }
    : {};

  return (
    <TouchableOpacity disabled={!onPress} activeOpacity={0.7} onPress={onPress}>
      <ShadowView style={[styles.container, cardActiveStyles]}>
        <View
          style={[styles.iconContainer, { backgroundColor: iconBackground }]}>
          <CustomIcon size={20} color={iconColor} name="wallet" />
        </View>

        <View style={styles.infoContainer}>
          <CustomText style={styles.title}>{title}</CustomText>
          <CustomText style={styles.info}>{info}</CustomText>
        </View>

        {selectable ? (
          <View style={[styles.radioButton, buttonActiveStyles]} />
        ) : (
          <Ionicons
            name="ios-arrow-down"
            size={23}
            color={colors.MEDIUM_GREY_01}
          />
        )}
      </ShadowView>
    </TouchableOpacity>
  );
};

export default WalletSelector;
