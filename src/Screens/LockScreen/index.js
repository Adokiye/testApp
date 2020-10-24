import React, {Component} from 'react';
import {SafeAreaView, StatusBar, ScrollView} from 'react-native';

import PinInputKeypad from './pinInputKeypad';
import UserIntro from '../../components/Avatar/userIntro';
import TextButton from '../../components/Buttons/textButton';

import LockScreen from './styles/styles.lockscreen';

export default class PinLogin extends Component {
  render() {
    return (
      <SafeAreaView style={LockScreen.container}>
        <StatusBar barStyle="dark-content" translucent={false} />
        <ScrollView style={{flex: 1}}>
          <UserIntro />
          <PinInputKeypad />
          <TextButton text="Forgot pin?" />
        </ScrollView>
      </SafeAreaView>
    );
  }
}
