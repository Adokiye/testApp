import React from 'react';
import { View, Text } from 'react-native';

import styles from './styles';

const ProcessedAvatar = ({
  text,
  color = '#5D6262',
  backgroundColor = '#EEF0F1',
}) => {
  return (
    <View style={[styles.initialsOval, { backgroundColor }]}>
      <Text style={[styles.initialsText, { color }]}>{text}</Text>
    </View>
  );
};

const processInitials = name => {
  // collect first letter of each name
  if(name && name != undefined){
      console.log(name)
  let nameSplit = name.split(' ');
  const first = nameSplit[0][0];
  let second = nameSplit[1];
  if (!second) {
    second = nameSplit[0][1] || '';
  } else {
    second = second[0];
  }
  return (first + second).toUpperCase();
  }else{
    return;
  }

};

const ContactCard = ({
  clientName,
  topRight,
  bottomLeft,
  bottomRight,
  style: customStyle = {},
  avatarColor,
  avatarTextColor,
}) => {
  const abbrev = processInitials(clientName);

  return (
    <View style={[styles.container, customStyle]}>
      <ProcessedAvatar
        backgroundColor={avatarColor}
        color={avatarTextColor}
        text={abbrev}
      />
      <View style={styles.flex1}>
        <View style={styles.contentRow}>
          <Text style={styles.companyNameText} numberOfLines={1}>
            {clientName}
          </Text>
          <Text style={styles.topRight}>{topRight}</Text>
        </View>
        <View style={styles.contentRow}>
          <Text style={styles.text}>{bottomLeft}</Text>
          <Text style={[styles.text, styles.bottomRight]}>{bottomRight}</Text>
        </View>
      </View>
    </View>
  );
};

export default ContactCard;
