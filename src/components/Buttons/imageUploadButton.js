import React, {Component} from 'react';
import {View, Text} from 'react-native';
import ProspaButton from '../Buttons/prospaButton';
import ImagePicker from 'react-native-image-picker';

export default class ImageUploadButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uploaded: false,
    };
  }

  uploadImage = () => {
    ImagePicker.showImagePicker({title: this.props.label}, response => {
      if (!response.didCancel && !response.error && !response.customButton) {
        this.props.onUpload &&
          this.props.onUpload({
            uri: response.uri,
            name: response.fileName,
            type: response.type,
          });
        this.setState({uploaded: true});
      }
    });
  };

  render() {
    const {label, loading} = this.props;

    return (
      <View style={{marginBottom: 18, position: 'relative'}}>
        <Text
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            fontSize: 17,
            fontFamily: 'Gilroy-Semibold',
            color: '#5d6262',
            marginBottom: 9,
          }}>
          {label}
        </Text>
        <ProspaButton
          handleClick={this.uploadImage}
          gradient={!this.state.uploaded}
          text={this.state.uploaded ? 'Uploaded' : 'Upload photo'}
        />
      </View>
    );
  }
}
