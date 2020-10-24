import React from 'react';
import { View } from 'react-native';

import { tabIconStyle } from './styles';
import CustomIcon from '../CustomIcon';

export const getTabBarIcon = (navigation, focused, tintColor) => {
  const st yles = tabIconStyle(focused);
  const { routeName } = navigation.state;
  let iconName = '';

  switch (routeName) {
    case 'Accounts':
      iconName = 'wallet';
      break;

    case 'Transfer':
      iconName = 'transfer-left-right';
      break;

    case 'Invoice':
      iconName = 'invoice';
      break;

    case 'More':
      iconName = 'cog_wheel';
      break;

    default:
      break;
  }

  return (
    <View style={styles.container}>
      <View style={styles.iconBackground}>
        <CustomIcon name={iconName} color={tintColor} size={14} />
      </View>
    </View>
  );
};
