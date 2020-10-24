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
import {createCustomer} from '../../actions/customer';
import Alert from '../../components/Alert/alert';

class CreateCustomer extends Component {
  state = {
    name: '',
    email: '',
    phone: '',
    address: '',
    redirectTo: '',
    isLoading: false,
    error: false,
  };

  componentDidMount() {
    this.prefillData();
  }

  prefillData = () => {
    const prefilledData = this.props.navigation.getParam('prefilledData', {});
    const redirectTo = this.props.navigation.getParam('redirectTo', '');
    const {name = '', email, phone = '', address = ''} = prefilledData;
    this.setState({
      name,
      email,
      phone,
      address,
      redirectTo,
    });
  };

  handleInputChange = (text, fieldName) => {
    this.setState({
      [fieldName]: text,
      error: false,
    });
  };

  addCustomer = async () => {
    this.setState({
      isLoading: true,
    });

    const {name, email, phone, address, redirectTo} = this.state;
    const createdCustomer = await this.props.createCustomer({
      name,
      email,
      phone,
      address,
    });

    if (createdCustomer.error) {
      this.setState({
        error: createdCustomer.error.message,
        isLoading: false,
      });
      return;
    }

    const refresh = this.props.navigation.getParam('refreshPage', () => {});

    await refresh();
    if (redirectTo !== '') {
      this.props.navigation.navigate(redirectTo, {createdCustomer});
    } else {
      this.props.navigation.navigate('Invoice');
    }
  };

  render() {
    const {name, email, phone, address, error, isLoading} = this.state;
    return (
      <View style={styles.container}>
        <Alert status="danger" message={error} />
        <SafeAreaView>
          <View style={styles.header}>
            <BackButton />
          </View>
        </SafeAreaView>
        <View style={styles.textView}>
          <Text style={styles.welcomeText}>New customer</Text>
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
                text="Add"
                onPress={this.addCustomer}
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
    createCustomer: data => dispatch(createCustomer(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateCustomer);
