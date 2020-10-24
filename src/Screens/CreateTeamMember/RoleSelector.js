import React from 'react';
import {SafeAreaView, Picker} from 'react-native';
import Modal from 'react-native-modal';

const styles = {
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  container: {
    backgroundColor: '#fff',
  },
};

const RoleSelectorIOS = ({isShown, value, onSelect = () => {}}) => {
  return (
    <Modal
      animationType="slide"
      isVisible={isShown}
      hasBackdrop={false}
      style={styles.modal}>
      <SafeAreaView style={styles.container}>
        <Picker
          selectedValue={value}
          onValueChange={itemValue => onSelect(itemValue)}>
          <Picker.Item label="Administrator" value="bizadmin" />
          <Picker.Item label="Staff" value="staff" />
        </Picker>
      </SafeAreaView>
    </Modal>
  );
};

export default RoleSelectorIOS;
