import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { connect } from 'react-redux';

import TransferMore from './TransferMore';
import Pending from './Pending';
import Alert from '../../components/Alert/alert';
import styles from './styles/styles.transfers';
import { CustomText } from '../../components/Text';

class Transfers extends Component {
  state = {
    search: false,
    tab: 'transfer',
    isPendingTabOpen: false,
  };

  getDisplay = tabName => {
    const { tab } = this.state;
    if (tabName === tab) {
      return 'flex';
    }
    return 'none';
  };

  render() {
    const { error } = this.props;
    const { isPendingTabOpen } = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Alert status="danger" message={error} />
        <View style={styles.header}>
          <CustomText style={styles.title}>Transfers</CustomText>
        </View>
        <View style={styles.parentTransferBar}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={
              this.state.tab === 'transfer'
                ? styles.activeButton
                : styles.inactiveButton
            }
            onPress={() => this.setState({ tab: 'transfer' })}>
            <Text
              style={
                this.state.tab === 'transfer'
                  ? styles.activeText
                  : styles.inactiveText
              }>
              Transfer Money
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            style={
              this.state.tab === 'pending'
                ? styles.activeButton
                : styles.inactiveButton
            }
            onPress={() =>
              this.setState({ tab: 'pending', isPendingTabOpen: true })
            }>
            <Text
              style={
                this.state.tab === 'pending'
                  ? styles.activeText
                  : styles.inactiveText
              }>
              Pending
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.backWhite}>
          <View style={{ flex: 1, display: this.getDisplay('transfer') }}>
            <TransferMore navigation={this.props.navigation} />
          </View>

          {isPendingTabOpen && (
            <View style={{ flex: 1, display: this.getDisplay('pending') }}>
              <Pending navigation={this.props.navigation} />
            </View>
          )}
        </View>
      </SafeAreaView>
    );
  }
}
const mapStateToProps = state => {
  const { transfers } = state;
  const { error } = transfers;

  return {
    error,
  };
};

export default connect(mapStateToProps)(Transfers);
