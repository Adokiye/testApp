import React, {Fragment} from 'react';
import {
  Text,
  TouchableOpacity,
  Platform,
  Modal,
  View,
  SafeAreaView,
  Picker,
} from 'react-native';
import PickerStyle from './styles/picker.style';

const NormalPicker = props => {
  const {
    selectedOption,
    modalVisible,
    optionList,
    selectedOptionValue,
    onOptionSelect,
    editModalVisibility,
    hideModalVisibility,
  } = props;
  return (
    <View style={{flex: 1}}>
      {Platform.OS === 'ios' ? (
        <Fragment>
          <TouchableOpacity
            onPress={editModalVisibility}
            style={PickerStyle.container}>
            <Text style={PickerStyle.text}>{selectedOptionValue}</Text>
          </TouchableOpacity>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}>
            <View style={{flex: 1, justifyContent: 'flex-end'}}>
              <SafeAreaView style={{backgroundColor: 'white'}}>
                <View style={PickerStyle.view}>
                  <Text onPress={hideModalVisibility} style={PickerStyle.text1}>
                    Done
                  </Text>
                </View>
                <Picker
                  selectedValue={selectedOption}
                  onValueChange={onOptionSelect}
                  enabled>
                  {optionList}
                </Picker>
              </SafeAreaView>
            </View>
          </Modal>
        </Fragment>
      ) : (
        <Picker
          style={{flex: 1}}
          selectedValue={selectedOption}
          onValueChange={onOptionSelect}
          enabled>
          {optionList}
        </Picker>
      )}
    </View>
  );
};

export default NormalPicker;
