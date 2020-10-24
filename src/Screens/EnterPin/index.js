import React, { useState } from 'react';
import styles from './styles';
import { View, StatusBar, SafeAreaView } from 'react-native';
import Modal from 'react-native-modal';

import BackButton from '../../components/Buttons/BackButton';
import { CustomText } from '../../components/Text';
import InputArea from './InputArea';
import Keypad from './Keypad';
import colors from '../../helpers/colors';
import FullScreenLoaderMain from '../../components/Loading/FullScreenLoaderMain';

const EnterPin = ({ navigation, cancelOperation, onComplete }) => {
  const [pin, setPin] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  if (!cancelOperation) {
    cancelOperation = navigation.getParam('cancelOperation', () =>
      navigation.goBack(),
    );
  }
  if (!onComplete) {
    onComplete = navigation.getParam('onComplete', () => {});
  }

  const onInputChange = input => {
    setPin(input);
    setErrorMessage(false);
  };

  const onCompleteInput = async accessCode => {
    setIsLoading(true);
    const result = (await onComplete(accessCode)) || {};
    if (result.errorMessage) {
      setErrorMessage(result.errorMessage);
      setIsLoading(false);
    } else {
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} barStyle="dark-content" />
      <SafeAreaView style={styles.backButton}>
        <BackButton
          backgroundColor={colors.LIGHT_PURPLE_02}
          color={colors.LIGHT_PURPLE_01}
          onPress={cancelOperation}
        />
      </SafeAreaView>
      <SafeAreaView style={styles.content}>
        <View>
          <CustomText style={styles.title}>Enter your security code</CustomText>
          <CustomText style={styles.subTitle}>
            Please, enter your 4 digit security code
          </CustomText>
        </View>
        {errorMessage && (
          <CustomText style={styles.errorMessage}>{errorMessage}</CustomText>
        )}
        <View style={styles.inputArea}>
          <InputArea error={!!errorMessage} value={pin} />
        </View>
        <View style={styles.keypad}>
          <Keypad
            value={pin}
            onKeyPress={onInputChange}
            limit={4}
            onComplete={onCompleteInput}
          />
        </View>
      </SafeAreaView>
      <Modal isVisible={isLoading}>
        <FullScreenLoaderMain />
      </Modal>
    </View>
  );
};

EnterPin.navigationOptions = ({ navigation }) => {
  return {
    tabBarVisible: false,
  };
};

export default EnterPin;
