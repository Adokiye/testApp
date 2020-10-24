import React, { Component, Fragment } from 'react';
import {
  SafeAreaView,
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Image,
  StyleSheet,
  Animated,
  Easing,
  KeyboardAvoidingView,
  StatusBar,
  AsyncStorage,
} from 'react-native';

import RegistrationFirstScreen from './registerFirstScreen';
import RegistrationSecondScreen from './registerSecondScreen';
import RegistrationThirdScreen from './registerThirdScreen';

import Alert from '../../components/Alert/alert';
import CONFIG from '../../config';
import PaginationNumber from '../../components/Pagination/paginationNumber';
import RegisterCustomerFooter from '../../components/Footer/RegCustomerFooter';
// import AsyncStorage from "@react-native-community/async-storage";

// import {connect} from 'react-redux';

// import {RegisterCustomerAction} from '../../actions/registerCustomers';

const screen = Dimensions.get('screen');

export default class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewCount: 0,
      activeSlide: new Animated.Value(0),
      error: false,
      state_token: '',
      firstname: '',
      userPhoneNumber: '',
      userEmailNumber: '',
    };
  }

  nextSlide = () => {
    let viewCount = this.state.viewCount + 1;
    Animated.timing(this.state.activeSlide, {
      toValue: viewCount,
      duration: 200,
      easing: Easing.ease,
    }).start();

    this.setState({ viewCount: viewCount, error: false });
  };

  previousSlide = () => {
    if (this.state.viewCount > 0) {
      let viewCount = this.state.viewCount - 1;
      Animated.timing(this.state.activeSlide, {
        toValue: viewCount,
        duration: 200,
        easing: Easing.ease,
      }).start();

      this.setState({ viewCount: viewCount, error: false });
    } else {
      //go back to welcome screen
      this.props.navigation.goBack();
    }
  };

  handleStep1 = payload => {
    return new Promise((resolve, reject) => {
      //validate payload
      let expectedValues = ['BVN'];
      let isValid = true;

      this.setState({ error: false });

      for (var i = 0, len = expectedValues.length; i < len; i++) {
        if (payload[expectedValues[i]] === '') {
          isValid = false;
          this.setState({ error: `Please enter your ${expectedValues[i]}` });
          reject();
          break;
        } else {
          continue;
        }
      }

      if (isValid) {
        //make request to API
        let data = {
          bvn_number: payload.BVN,
          board_step: 'first_step',
        };

        fetch(CONFIG.BASE_URL + '/account/signup_biz_rep/', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify(data),
        })
          .then(response => {
            // //console.log(response, '>>>');
            if (response.status === 200 || response.status === 201) {
              response.json().then(res => {
                this.setState({
                  state_token: res.state_token,
                  firstname: res.first_name,
                  userPhoneNumber: res.phone_num,
                  userEmailNumber: res.email_address,
                });
                resolve();
              });
            }

            if (response.status === 400) {
              response.json().then(res => {
                this.setState({ error: res.message });
                reject();
              });
            }

            if (response.status >= 500) {
              this.setState({
                error:
                  'Something went wrong. Please check your internet connection and try again',
              });
              reject();
            }
          })
          .catch(() => {
            this.setState({
              error:
                'Something went wrong. Please check your internet connection and try again',
            });
            reject();
          });
      }
    });
  };

  handleStep2 = payload => {
    return new Promise((resolve, reject) => {
      let expectedValues = ['completePhoneNumber', 'date of birth'];
      let isValid = true;

      this.setState({ error: false });

      //validate payload
      for (var i = 0, len = expectedValues.length; i < len; i++) {
        if (payload[expectedValues[i]] === '') {
          isValid = false;
          this.setState({ error: `Please enter ${expectedValues[i]}` });
          reject();
          break;
        } else {
          continue;
        }
      }

      if (isValid) {
        const { userPhoneNumber } = this.state;
        //make request to API
        let data = {
          board_step: 'second_step',
          state_token: this.state.state_token,
          bvn_five_digit: payload[expectedValues[0]],
          date_of_birth: payload[expectedValues[1]],
        };

        fetch(CONFIG.BASE_URL + '/account/signup_biz_rep/', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify(data),
        })
          .then(response => {
            if (response.status === 200 || response.status === 201) {
              response.json().then(res => {
                this.setState({
                  state_token: res.state_token,
                  userPhoneNumber: `${userPhoneNumber}${payload.completePhoneNumber}`,
                });
                resolve();
              });
            }

            if (response.status === 400) {
              response.json().then(res => {
                this.setState({ error: res.message });
                reject();
              });
            }

            if (response.status >= 500) {
              this.setState({
                error:
                  'Something went wrong. Please check your internet connection and try again',
              });
              reject();
            }
          })
          .catch(() => {
            this.setState({
              error:
                'Something went wrong. Please check your internet connection and try again',
            });
            reject();
          });
      }
    });
  };

  handleStep3 = payload => {
    return new Promise((resolve, reject) => {
      let expectedValues = [
        'phone number',
        'email address',
        'password',
        'password confirmation',
      ];
      let isValid = true;
      this.setState({ error: false });

      for (var i = 0, len = expectedValues.length; i < len; i++) {
        if (payload[expectedValues[i]] === '') {
          isValid = false;
          this.setState({ error: `Please enter ${expectedValues[i]}` });
          reject();
          break;
        } else {
          continue;
        }
      }

      if (isValid) {
        //check phone number validity
        if (!payload.phoneNumberIsValid) {
          this.setState({ error: 'Please enter a valid phone number' });
          return;
        }
        //check if passwords match
        if (payload['password'] !== payload['password confirmation']) {
          this.setState({ error: "The passwords you entered don't match" });
          reject();
        } else {
          let data = {
            board_step: 'third_step',
            state_token: this.state.state_token,
            rep_phone: payload['phone number'],
            rep_email: payload['email address'],
            password1: payload['password'],
            password2: payload['password confirmation'],
          };
          //make request to API if everything is alright
          fetch(CONFIG.BASE_URL + '/account/signup_biz_rep/', {
            method: 'POST',
            headers: {
              'Content-type': 'application/json',
            },
            body: JSON.stringify(data),
          })
            .then(response => {
              if (response.status === 200 || response.status === 201) {
                response.json().then(res => {
                  AsyncStorage.setItem(
                    'user_stats',
                    JSON.stringify({
                      token: res.token,
                      user_type: res.user_type,
                      first_name: res.first_name,
                      last_name: res.last_name,
                    }),
                  ).then(() => {
                    this.props.navigation.push('RegistrationSuccess');
                    resolve();
                  });
                });
              }

              if (response.status === 400) {
                response.json().then(res => {
                  this.setState({ error: res.message });
                  reject();
                });
              }

              if (response.status >= 500) {
                this.setState({
                  error:
                    'Something went wrong. Please check your internet connection and try again',
                });
                reject();
              }
            })
            .catch(() => {
              this.setState({
                error:
                  'Something went wrong. Please check your internet connection and try again',
              });
              reject();
            });
        }
      }
    });
  };

  render() {
    const {
      viewCount,
      error,
      firstname,
      userPhoneNumber,
      userEmailNumber,
    } = this.state;
    const slidePosition = this.state.activeSlide.interpolate({
      inputRange: [0, 1, 2],
      outputRange: [0, -screen.width, -screen.width * 2],
    });

    return (
      <Fragment>
        <Alert status="danger" message={error} />
        <SafeAreaView
          style={{ flex: 1, backgroundColor: '#f5f6f7', position: 'relative' }}>
          <StatusBar
            barStyle="dark-content"
            backgroundColor="white"
            translucent={false}
          />
          <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled>
            <View style={styles.header}>
              <TouchableOpacity
                onPress={this.previousSlide}
                style={{ zIndex: 10 }}>
                <Image
                  style={{ width: 20.2, height: 15 }}
                  source={require('../../assets/icons/back_arrow.png')}
                  resizeMethod="auto"
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <PaginationNumber viewCount={viewCount} units={3} />
            </View>
            <ScrollView style={{ flex: 1 }}>
              <Animated.View
                style={[styles.slideViewContainer, { left: slidePosition }]}>
                <View style={styles.slideView}>
                  <RegistrationFirstScreen
                    nextSlide={this.nextSlide}
                    handleStep1={this.handleStep1}
                  />
                </View>
                <View style={styles.slideView}>
                  <RegistrationSecondScreen
                    nextSlide={this.nextSlide}
                    firstname={firstname}
                    handleStep2={this.handleStep2}
                    phoneNumber={userPhoneNumber}
                  />
                </View>
                <View style={styles.slideView}>
                  <RegistrationThirdScreen
                    nextSlide={this.nextSlide}
                    handleStep3={this.handleStep3}
                    initialPhoneNumber={userPhoneNumber}
                    initialEmailAddress={userEmailNumber}
                  />
                </View>
              </Animated.View>
            </ScrollView>
          </KeyboardAvoidingView>
          <RegisterCustomerFooter
            viewCount={viewCount}
            login={() => this.props.navigation.goBack()}
          />
        </SafeAreaView>
      </Fragment>
    );
  }
}

// const mapStateToProps = registerCustomers => registerCustomers;
// export const ConnectedRegisterCustomerScreen = connect(
//   mapStateToProps,
//   {RegisterCustomerAction},
// )(Registration);

const styles = StyleSheet.create({
  header: {
    width: screen.width,
    paddingHorizontal: 24,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
  },
  slideViewContainer: {
    position: 'relative',
    width: screen.width * 3,
    flexDirection: 'row',
    paddingTop: 35,
  },
  slideView: {
    position: 'relative',
    width: screen.width,
    paddingHorizontal: 24,
  },
});
