import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
} from 'react-native';
import {connect} from 'react-redux';

import styles from './styles';
import BackButton from '../../components/Buttons/BackButton';
import InputBox from '../../components/InputBox';
import ButtonMain from '../../components/Buttons/buttonMain';
import {editCustomer} from '../../actions/customer';
import Alert from '../../components/Alert/alert';

class EditCustomer extends Component {
  state = {
    name: '',
    email: '',
    phone: '',
    address: '',
    redirectTo: '',
    isLoading: false,
    error: false,
    customer_id: ''
  };

  componentDidMount() {
    this.prefillData();
  }
//
  prefillData = () => {
    const prefilledData = this.props.navigation.getParam('prefilledData', {});
    const {name = '', email, phone = '', address = '', customer_id = ''} = prefilledData;

    this.setState({
      name,
      email,
      phone,
      address,
      customer_id,
    });
  };

  handleInputChange = (text, fieldName) => {
    this.setState({
      [fieldName]: text,
      error: false,
    });
  };

  editCustomer = async () => {
    this.setState({
      isLoading: true,
    });

    const { name, email, phone, address, customer_id } = this.state;
    const editedCustomer = await this.props.editCustomer({
      customer_id, 
      customer_name: name,
      customer_email: email,
      customer_phone: phone,
      customer_address: address,
    });

    if (editedCustomer.error) {
      this.setState({
        error: editedCustomer.error.message,
        isLoading: false,
      });
      return;
    }
      this.props.navigation.navigate('Invoice', {
        refresh: true
      });
  };

  render() {
    const { name, email, phone, address, error, isLoading } = this.state;
    return (
      <View style={styles.container}>
        <Alert status="danger" message={error} />
        <SafeAreaView>
          <View style={styles.header}>
            <BackButton />
          </View>
        </SafeAreaView>
        <View style={styles.textView}>
          <Text style={styles.welcomeText}>Edit customer</Text>
        </View>

        <ScrollView style={styles.backWhite}>
          <KeyboardAvoidingView>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>
                Name <Text style={styles.requireIndicator}>*</Text>
              </Text>
              <InputBox
                onChange={text => this.handleInputChange(text, 'name')}
                value={name}
                placeholder="Customer's name"
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>
                Email <Text style={styles.requireIndicator}>*</Text>
              </Text>
              <InputBox
                onChange={text => this.handleInputChange(text, 'email')}
                value={email}
                placeholder="Customer's email"
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>
                Phone number <Text style={styles.requireIndicator}>*</Text>
              </Text>
              <InputBox
                onChange={text => this.handleInputChange(text, 'phone')}
                value={phone}
                placeholder="Customer's phone number"
                keyboardType="phone-pad"
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Address</Text>
              <InputBox
                onChange={text => this.handleInputChange(text, 'address')}
                value={address}
                placeholder="12, My street, City"
              />
            </View>
            <View style={styles.inputContainer}>
              <ButtonMain
                text="Edit"
                onPress={this.editCustomer}
                isLoading={isLoading}
              />
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    error: state.customer.error,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    editCustomer: data => dispatch(editCustomer(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditCustomer);
