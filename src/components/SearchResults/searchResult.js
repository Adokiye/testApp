import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

class SearchResult extends Component {
  //   handlePress = async () => {
  //     const res = await this.props.fetchDetails(this.props.place_id);
  //   };
  render() {
    return (
      <TouchableOpacity>
        <View style={styles.root}>
          <Text onPress={this.props.handlePress}>{this.props.description}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    height: 40,
    borderBottomWidth: StyleSheet.hairlineWidth,
    justifyContent: 'center',
  },
});

export default SearchResult;
