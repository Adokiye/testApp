/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  SafeAreaView,
  Text,
  Animated,
  View,
  Dimensions,
  Image,
  Easing,
  StatusBar,
  ScrollView,
} from 'react-native';

import WelcomeStyle from './styles/styles.welcome';

import PaginatedControl from './onboardingPagination';
import ButtonControl from './onboardingButton';

const screen = Dimensions.get('screen');

export default class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSlide: new Animated.Value(0),
      viewCount: 0,
    };
  }

  onNextClick = () => {
    let viewCount = this.state.viewCount + 1;
    this.setState({viewCount: viewCount});

    Animated.timing(this.state.activeSlide, {
      toValue: viewCount,
      duration: 300,
      easing: Easing.ease,
    }).start();
  };

  onPreviousClick = () => {
    let viewCount = this.state.viewCount - 1;
    this.setState({viewCount: viewCount});

    Animated.timing(this.state.activeSlide, {
      toValue: viewCount,
      duration: 300,
      easing: Easing.ease,
    }).start();
  };

  handleLoginClick = () => {
    this.props.navigation.navigate('Login');
  };

  handleRegisterClick = () => {
    this.props.navigation.navigate('Register');
  };

  render() {
    const {navigate} = this.props.navigation;
    // let height;
    let activeSlide = this.state.activeSlide.interpolate({
      inputRange: [0, 1, 2],
      outputRange: [0, -screen.width, -screen.width * 2],
    });

    const {viewCount} = this.state;

    return (
      <SafeAreaView style={WelcomeStyle().container}>
        <StatusBar barStyle="dark-content" backgroundColor="white" />
        <ScrollView style={{flex: 1}}>
          <Animated.View style={{flex: 1, left: activeSlide}}>
            <View style={WelcomeStyle().slidingContainer}>
              <View
                style={{
                  position: 'relative',
                  width: screen.width,
                  flex: 1,
                }}>
                <Image
                  style={{width: screen.width, height: 249, marginBottom: 48}}
                  source={require('../../assets/images/welcome_illustration_1.png')}
                  resizeMethod="auto"
                  resizeMode="contain"
                />
                <View style={WelcomeStyle().onboardingTextContainer}>
                  <Text style={WelcomeStyle().headerText}>
                    open a{' '}
                    <Text style={WelcomeStyle().onboardingFontFamily}>
                      business account
                    </Text>{' '}
                    today in{' '}
                    <Text style={WelcomeStyle().onboardingFontFamily}>
                      minutes
                    </Text>
                  </Text>
                  <Text style={WelcomeStyle().bodyCopy}>
                    Get an account number for your business today. Perfect for
                    small business and sole traders
                  </Text>
                </View>
              </View>
              <View
                style={{
                  position: 'relative',
                  width: screen.width,
                  flex: 1,
                }}>
                <Image
                  style={{width: screen.width, height: 249, marginBottom: 48}}
                  source={require('../../assets/images/welcome_illustration_2.png')}
                  resizeMethod="auto"
                  resizeMode="cover"
                />
                <View style={WelcomeStyle().onboardingTextContainer}>
                  <Text style={WelcomeStyle().headerText}>
                    get a{' '}
                    <Text style={WelcomeStyle().onboardingFontFamily}>
                      free business Mastercard
                    </Text>
                  </Text>
                  <Text style={WelcomeStyle().bodyCopy}>
                    Totally free to use in Nigeria and abroad - no sneaky
                    transactions or card purchase fee here.
                  </Text>
                </View>
              </View>
              <View
                style={{
                  position: 'relative',
                  width: screen.width,
                  flex: 1,
                }}>
                <Image
                  style={{width: screen.width, height: 249, marginBottom: 48}}
                  source={require('../../assets/images/welcome_illustration_3.png')}
                  resizeMethod="auto"
                  resizeMode="contain"
                />
                <View style={WelcomeStyle().onboardingTextContainer}>
                  <Text style={WelcomeStyle().headerText}>
                    get a{' '}
                    <Text style={WelcomeStyle().onboardingFontFamily}>
                      free business Mastercard
                    </Text>
                  </Text>
                  <Text style={WelcomeStyle().bodyCopy}>
                    Totally free to use in Nigeria and abroad - no sneaky
                    transactions or card purchase fee here.
                  </Text>
                </View>
              </View>
            </View>
          </Animated.View>
        </ScrollView>
        <View style={WelcomeStyle().onboardingPagination}>
          <PaginatedControl
            viewCount={viewCount}
            onNextClick={{
              first: this.onNextClick,
              second: this.onPreviousClick,
            }}
            onPreviousClick={this.onPreviousClick}
          />
          <ButtonControl
            viewCount={viewCount}
            handleLoginClick={this.handleLoginClick}
            handleRegisterClick={this.handleRegisterClick}
          />
        </View>
      </SafeAreaView>
    );
  }
}
