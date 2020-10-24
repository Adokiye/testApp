import React, { useState } from 'react';
import { FlatList, View, StatusBar, SafeAreaView } from 'react-native';
import styles from './styles/styles.dashboardsearch';
import SearchBar from './SearchBar';
import LineBreak from '../LineBreak';

const DashboardSearch = ({ navigation }) => {
  const data = navigation.getParam('data', []);
  const renderItem = navigation.getParam('renderItem', () => {});
  const filterMethod = navigation.getParam('filterMethod', () => {});

  const [inputValue, setInputValue] = useState('');
  const [resultData, setResultData] = useState(data);

  const handleTextChange = text => {
    setInputValue(text);
    const newResult = filterMethod(data, text);
    setResultData(newResult);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <SearchBar value={inputValue} onChangeText={handleTextChange} />
        <LineBreak />
        <FlatList
          data={resultData}
          renderItem={renderItem}
          keyExtractor={(item, index) => `list-item-${index}`}
        />
      </SafeAreaView>
    </View>
  );
};

export default DashboardSearch;
