import React, {Component} from 'react';
import {
  FlatList,
  View,
  Image,
  Text,
  Animated,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Modal from 'react-native-modal';

const screen = Dimensions.get('screen');

export default class Loader extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Modal isVisible={this.props.loader}>
          <ActivityIndicator size={'large'} color={'#FA4A84'} />
        </Modal>
      </View>
    );
  }
}
