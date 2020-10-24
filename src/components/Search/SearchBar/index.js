import React from 'react';
import { TextInput, View, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';

import styles from './styles';

const SearchBar = ({
  value,
  onChangeText,
  placeholder = 'Search',
  navigation: { goBack },
}) => {
  const clearInput = () => {
    onChangeText('');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => goBack(null)}
        activeOpacity={0.7}
        style={styles.backIcon}>
        <Ionicons name="ios-arrow-back" size={27} />
      </TouchableOpacity>
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        autoCorrect={false}
        style={styles.inputBox}
      />
      {value.length > 0 && (
        <TouchableOpacity
          onPress={clearInput}
          activeOpacity={0.7}
          style={styles.clearIcon}>
          <Ionicons name="md-close" size={23} color="grey" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default withNavigation(SearchBar);
