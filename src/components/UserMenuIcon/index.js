import React from 'react';
import {View, Image, Text} from 'react-native';

import styles from './styles';

const processAvatar = () => {
  const defaultImage = require('../../assets/images/oval.png');
  let source = {defaultImage};
  const avatarUrl =
    'https://lh3.googleusercontent.com/-Q7jb4lI04Tc/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rea9SWGPBh43T5pdMNbh8bCQFENig.CMID/s192-c/photo.jpg';

  if (avatarUrl) {
    source = {uri: avatarUrl};
  }
  return source;
};

const UserMenuIcon = () => {
  const source = processAvatar();
  const notificationCount = 0;

  return (
    <View style={styles.imageParentView}>
      <View style={styles.imageView}>
        <Image
          resizeMethod="auto"
          resizeMode="contain"
          style={styles.image}
          source={source}
        />
      </View>
      {notificationCount > 0 && (
        <View style={styles.notificationView}>
          <Text style={styles.notificationText}>{notificationCount}</Text>
        </View>
      )}
    </View>
  );
};

export default UserMenuIcon;
