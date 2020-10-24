import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import styles from './styles';
import ShadowView from '../../ShadowView';
import colors from '../../../helpers/colors';
import CustomIcon from '../../CustomIcon';

const AccountInfoCard = ({ type, bank, info, colorTheme = '', onPress }) => {
  const walletColor = {
    icon: colorTheme === 'pink' ? colors.PRIMARY_PINK : colors.LIGHT_PURPLE_01,
    background:
      colorTheme === 'pink' ? colors.LIGHT_PINK_01 : colors.LIGHT_PURPLE_02,
  };

  return (
    <ShadowView style={styles.ShadowView}>
      <TouchableOpacity
        disabled={!onPress}
        onPress={onPress ? onPress : () => {}}
        style={styles.container}
        activeOpacity={0.7}>
        <View>
          <Text style={styles.type}>{type}</Text>
          <Text style={styles.bank}>{bank}</Text>
          <Text style={styles.mainInfo}>{info}</Text>
        </View>
        <View
          style={[
            styles.iconContainer,
            { backgroundColor: walletColor.background },
          ]}>
          <CustomIcon name="wallet" color={walletColor.icon} size={17} />
        </View>
      </TouchableOpacity>
    </ShadowView>
  );
};

export default AccountInfoCard;
