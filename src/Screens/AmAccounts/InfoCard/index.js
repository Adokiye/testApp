import React from 'react';
import {Text} from 'react-native';
import ShadowView from '../../../components/ShadowView';

const styles = {
  container: {
    padding: 20,
    marginBottom: 20,
  },
  title: {
    color: '#1B003B',
    fontFamily: 'Gilroy-Medium',
    textTransform: 'capitalize',
    fontSize: 16,
  },
  info: {
    color: '#5D6262',
    fontFamily: 'Gilroy-Medium',
    textTransform: 'capitalize',
    marginTop: 10,
    fontSize: 16,
  },
};

const InfoCard = ({title, info}) => {
  return (
    <ShadowView style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.info}>{info}</Text>
    </ShadowView>
  );
};

export default InfoCard;
