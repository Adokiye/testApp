import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import Modal from 'react-native-modal';

const styles = {
  previewLoader: {
    flex: 1,
  },
};

const FullScreenLoader = ({isVisible}) => {
  return (
    <Modal isVisible={isVisible}>
      <View>
        <ActivityIndicator
          size="large"
          color="grey"
          style={styles.previewLoader}
        />
      </View>
    </Modal>
  );
};

export default FullScreenLoader;
