import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Picker,
  Platform,
} from 'react-native';

import styles from './styles';
import BackButton from '../../components/Buttons/BackButton';
import InputBox from '../../components/InputBox';
import ButtonMain from '../../components/Buttons/buttonMain';
import RoleSelectorIOS from './RoleSelector';
import { addTeamMember } from '../../actions/team';
import { connect } from 'react-redux';
import Alert from '../../components/Alert/alert';

class CreateTeamMember extends Component {
  state = {
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    role: 'bizadmin',
    isRoleSelectorOpen: false,
    isLoading: false,
    error: false,
  };

  handleInputChange = (text, fieldName) => {
    this.setState({
      [fieldName]: text,
    });
  };

  addTeamMember = async () => {
    this.setState({
      isLoading: true,
      error: null
    });

    const { firstname, lastname, email, phone, role } = this.state;
    const addedTeamMember = await this.props.addTeamMember({
      first_name: firstname,
      last_name: lastname,
      email,
      phone,
      role,
    });

    if (addedTeamMember.error) {
      this.setState({
        error: addedTeamMember.error.message,
        isLoading: false,
      });
      return;
    }

    this.props.navigation.navigate('AmTeams', {
      refresh: true
    });
  };

  toggleRoleSelector = newState => {
    this.setState({
      isRoleSelectorOpen: newState,
    });
  };

  onSelectRole = role => {
    this.setState({
      role,
    });
    console.log(role)
    setTimeout(() => {
      this.toggleRoleSelector(false);
    }, 200);
  };

  render() {
    const {
      firstname,
      lastname,
      role,
      email,
      phone,
      isRoleSelectorOpen,
      error,
    } = this.state;

    let roleIndicator = '-- Select Role --';
    if (role !== '') {
      roleIndicator = role;
    }
    return (
      <View style={styles.container}>
        <Alert status="danger" message={error} />
        <SafeAreaView>
          <View style={styles.header}>
            <BackButton />
          </View>
        </SafeAreaView>
        <View style={styles.textView}>
          <Text style={styles.welcomeText}>New team member</Text>
        </View>
        <ScrollView style={styles.backWhite}>
          <View style={styles.mainContent}>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>First name</Text>
              <InputBox
                onChange={text => this.handleInputChange(text, 'firstname')}
                value={firstname}
                placeholder="James"
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Last name</Text>
              <InputBox
                onChange={text => this.handleInputChange(text, 'lastname')}
                value={lastname}
                placeholder="Reverber"
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Email</Text>
              <InputBox
                onChange={text => this.handleInputChange(text, 'email')}
                value={email}
                placeholder="james.reverber@mail.me"
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Phone number</Text>
              <InputBox
                onChange={text => this.handleInputChange(text, 'phone')}
                value={phone}
                placeholder="+2348012345678"
                keyboardType="phone-pad"
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Role</Text>
              {Platform.OS === 'ios' && (
                <View>
                  <TouchableOpacity
                    onPress={() => this.toggleRoleSelector(true)}
                    style={styles.roleSelector}>
                    <Text style={styles.roleSelectorText}>{roleIndicator}</Text>
                  </TouchableOpacity>
                  <RoleSelectorIOS
                    value={role}
                    isShown={isRoleSelectorOpen}
                    onSelect={this.onSelectRole}
                  />
                </View>
              )}
              {Platform.OS === 'android' && (
                <View
                  style={[
                    styles.roleSelector,
                    { padding: 0, paddingLeft: 20 },
                  ]}>
                  <Picker
                    style={styles.pickerAndroid}
                    mode="dropdown"
                    selectedValue={role}
                    onValueChange={this.onSelectRole}>
                    <Picker.Item label="Admin" value="bizadmin" />
                    <Picker.Item label="Staff" value="staff" />
                  </Picker>
                </View>
              )}
            </View>
            <View style={styles.inputContainer}>
              <ButtonMain
                text="Add"
                onPress={this.addTeamMember}
                isLoading={this.state.isLoading}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}
const mapStateToProps = state => {
  return {
    error: state.team.error,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addTeamMember: data => dispatch(addTeamMember(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateTeamMember);
