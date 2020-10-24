import React from 'react';
import { TouchableHighlight } from 'react-native';
import { withNavigation } from 'react-navigation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from './styles/backButton.style';

const BackButton = ({
  navigation,
  onPress,
  color = '#fff',
  backgroundColor = 'transparent',
}) => {
  const iconName = 'keyboard-arrow-left';
  const iconSize = 34;

  return (
    <TouchableHighlight
      onPress={onPress ? onPress : () => navigation.goBack(null)}
      style={[styles.container, { backgroundColor: backgroundColor }]}
      underlayColor="#ffffff40"
      activeOpacity={0.7}>
      <MaterialIcons
        style={styles.icon}
        color={color}
        name={iconName}
        size={iconSize}
      />
    </TouchableHighlight>
  );
};

export default withNavigation(BackButton);
