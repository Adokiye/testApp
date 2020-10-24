import React from 'react';
import {View, Text, TextInput} from 'react-native';

import ChangePasswordStyle from './styles';
import ButtonOutline from '../Buttons/buttonOutline';
import ButtonMain from '../Buttons/buttonMain';

export default class ChangePassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    };
  }

  cancelOperation = () => {
    const operation = this.props.cancelOperation || (() => {});
    operation();
  };

  completeOperation = () => {
    const operation = this.props.change;
    operation();
  };

  render() {
    return (
      <View>
        <View style={ChangePasswordStyle.container}>
          <View style={ChangePasswordStyle.titleContainer}>
            <Text style={ChangePasswordStyle.title}>Change Password</Text>
          </View>
          <View style={ChangePasswordStyle.contentContainer}>
            <View style={ChangePasswordStyle.inputContainer}>
              <Text style={ChangePasswordStyle.inputLabel}>Old Password</Text>
              <TextInput
                value={this.state.oldPassword}
                onChangeText={text => {
                  this.setState({oldPassword: text});
                  this.props.setOldPassword(text);
                }}
                style={ChangePasswordStyle.input}
                secureTextEntry={true}
                placeholder="Enter Old Password"
              />
            </View>
            <View style={ChangePasswordStyle.inputContainer}>
              <Text style={ChangePasswordStyle.inputLabel}>New Password</Text>
              <TextInput
                value={this.state.newPassword}
                onChangeText={text => {
                  this.setState({newPassword: text});
                  this.props.setNewPassword(text);
                }}
                style={ChangePasswordStyle.input}
                secureTextEntry={true}
                placeholder="Enter New Password"
              />
            </View>
            <View style={ChangePasswordStyle.inputContainer}>
              <Text style={ChangePasswordStyle.inputLabel}>
                Confirm Password
              </Text>
              <TextInput
                value={this.state.confirmPassword}
                onChangeText={text => {
                  this.setState({confirmPassword: text});
                  this.props.setConfirmPassword(text);
                }}
                style={ChangePasswordStyle.input}
                secureTextEntry={true}
                placeholder="Confirm Password"
              />
            </View>
            <View style={ChangePasswordStyle.actions}>
              <View style={ChangePasswordStyle.button}>
                <ButtonOutline onPress={this.cancelOperation} text="Cancel" />
              </View>
              <View style={ChangePasswordStyle.button}>
                <ButtonMain onPress={this.completeOperation} text="Change" />
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
