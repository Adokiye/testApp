import React, { Component } from 'react';
import { SafeAreaView, Text, StatusBar, Image, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';

import LoginInput from '../../components/Inputs/loginInput';
import ProspaButton from '../../components/Buttons/prospaButton';
import * as actions from '../../actions/login.action';
import styles from './styles';

class Login extends Component {
  state = {
    email: '',
    password: '',
    error: this.props.navigation.getParam('errorMessage', false),
    isLoading: false,
  };

  componentDidMount() {}

  updateValue = (key, value) => {
    this.setState({
      [key]: value,
      error: false,
    });
  };

  onSubmit = async () => {
    this.setState({
      isLoading: true,
    });

    const { email, password } = this.state;
    const data = {
      email,
      password,
    };

    if (!this.props.loading) {
      const loginAttempt = await this.props.handleLogin(data);
      if (!loginAttempt.error) {
        this.props.navigation.navigate(
          loginAttempt.biz_creation === null
            ? 'RegistrationSuccess'
            : 'Dashboard',
        );
      } else {
        this.setState({
          error: loginAttempt.error.message,
          isLoading: false,
        });
      }
    }
  };

  render() {
    const { error, isLoading } = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent={true}
        />
        <KeyboardAwareScrollView
          contentContainerStyle={styles.scrollContainer}
          bounces={false}
          style={styles.content}>
          <View style={styles.logoImageContainer}>
            <Image
              source={require('../../assets/images/logo_white.png')}
              resizeMethod="auto"
              resizeMode="cover"
              style={styles.logoImage}
            />
          </View>
          <View style={styles.formArea}>
            {error && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorMessage}>{error}</Text>
              </View>
            )}
            <LoginInput
              placeholder="Email address"
              type="email-address"
              icon={require('../../assets/icons/email.png')}
              iconWidth={21}
              iconHeight={15}
              onInput={value => this.updateValue('email', value)}
            />
            <LoginInput
              placeholder="Password"
              secure={true}
              icon={require('../../assets/icons/padlock.png')}
              iconWidth={15}
              iconHeight={21}
              onInput={value => this.updateValue('password', value)}
            />
            <Text style={styles.forgotPassword}>Forgot password?</Text>
            <ProspaButton
              text="Log in"
              color="white"
              textColor="#270450"
              loading={isLoading}
              handleClick={this.onSubmit}
            />
            <Text style={styles.noAccountText}>
              Don't have an account?
              <Text
                style={styles.signupText}
                onPress={() => this.props.navigation.navigate('Register')}>
                Sign up
              </Text>
            </Text>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  const {
    login: { loading, error },
  } = state;

  return {
    loading,
    error,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleLogin: data => dispatch(actions.handleLogin(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
