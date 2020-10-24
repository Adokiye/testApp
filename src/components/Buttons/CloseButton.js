import React from 'react';
import { TouchableHighlight } from 'react-native';
import { withNavigation } from 'react-navigation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import styles from './styles/closeButton.style';
import spaces from '../../helpers/spaces';

const CloseButton = ({ navigation, alignment = 'right' }) => {
  const iconName = 'close';
  const iconSize = 28;
  return (
    <TouchableHighlight
      onPress={() => navigation.goBack()}
      style={[styles.container, { [alignment]: spaces.appSpacing }]}
      underlayColor="#F7F4FF"
      activeOpacity={0.7}>
      <MaterialIcons style={styles.icon} name={iconName} size={iconSize} />
    </TouchableHighlight>
  );
};

export default withNavigation(CloseButton);
