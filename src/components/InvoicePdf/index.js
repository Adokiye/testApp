import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import ViewShot from 'react-native-view-shot';

const styles = StyleSheet.create({});

export default class PdfView extends React.Component {
  onCapture = uri => {
    console.log('DO!!!!', uri);
  };

  render() {
    return (
      <ViewShot
        onCapture={this.onCapture}
        captureMode="mount"
        options={{format: 'jpg', quality: 0.9}}>
        <Text>...Something to rasterize...</Text>
      </ViewShot>
    );
  }
}
