/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {Text} from 'react-native';

class PaginationItem extends Component {
  render() {
    const {value, active} = this.props;

    return (
      <Text
        style={{
          fontSize: 14,
          fontFamily: 'Gilroy-Medium',
          letterSpacing: 0.65,
          height: 14,
          color: active ? '#fa4a84' : '#9ca0a5',
          marginHorizontal: 11,
        }}>
        {value}
      </Text>
    );
  }
}

export default PaginationItem;
