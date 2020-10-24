import React, { useState } from 'react';
import { Text, View, TouchableOpacity, SafeAreaView } from 'react-native';

import ExternalTransfer from './ExternalTransfer';
import InternalTransfer from './InternalTransfer';
import Alert from '../../../components/Alert/alert';
import styles from '../styles/styles.transfers';
import { CustomText } from '../../../components/Text';
import BackButton from '../../../components/Buttons/BackButton';

const NewTransfer = ({ navigation }) => {
  const [tab, setTab] = useState('external');
  const [error, setError] = useState(false);

  const displayError = message => {
    setError(message);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Alert status="danger" message={error} />
      <View style={styles.header}>
        <CustomText style={styles.title}>New transfers</CustomText>
        <View style={styles.backButton}>
          <BackButton />
        </View>
      </View>
      <View style={styles.parentTransferBar}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={
            tab === 'external' ? styles.activeButton : styles.inactiveButton
          }
          onPress={() => setTab('external')}>
          <Text
            style={
              tab === 'external' ? styles.activeText : styles.inactiveText
            }>
            External account
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          style={
            tab === 'internal' ? styles.activeButton : styles.inactiveButton
          }
          onPress={() => setTab('internal')}>
          <Text
            style={
              tab === 'internal' ? styles.activeText : styles.inactiveText
            }>
            Internal account
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.backWhite}>
        {tab === 'external' ? (
          <ExternalTransfer
            displayError={displayError}
            navigation={navigation}
          />
        ) : (
          <View style={{ flex: 1 }}>
            <InternalTransfer
              displayError={displayError}
              navigation={navigation}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default NewTransfer;
