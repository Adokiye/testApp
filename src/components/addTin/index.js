import React from 'react';
import {View, Text, TextInput} from 'react-native';

import AddTinStyle from './styles';
import ButtonOutline from '../Buttons/buttonOutline';
import ButtonMain from '../Buttons/buttonMain';

export default class AddTin extends React.Component {
  state = {};

  cancelOperation = () => {
    const operation = this.props.cancelOperation || (() => {});
    operation();
  };

  completeOperation = () => {
    const operation = this.props.cancelOperation || (() => {});
    operation();
  };

  render() {
    return (
      <View>
        <View style={AddTinStyle.container}>
          <View style={AddTinStyle.titleContainer}>
            <Text style={AddTinStyle.title}>Add Tin number</Text>
          </View>
          <View style={AddTinStyle.contentContainer}>
            <View style={AddTinStyle.inputContainer}>
              <Text style={AddTinStyle.inputLabel}>Tin Number</Text>
              <TextInput
                // value={name}
                // onChangeText={text => this.handleInputChange(text, 'name')}
                style={AddTinStyle.input}
                secureTextEntry={true}
                placeholder="Enter Tin Number"
              />
            </View>
            <View style={AddTinStyle.actions}>
              <View style={AddTinStyle.button}>
                <ButtonOutline onPress={this.cancelOperation} text="Cancel" />
              </View>
              <View style={AddTinStyle.button}>
                <ButtonMain onPress={this.completeOperation} text="Save" />
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
