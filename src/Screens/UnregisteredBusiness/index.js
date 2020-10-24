import React, {Component, Fragment} from 'react';
import {
  View,
  Animated,
  Easing,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  Platform,
} from 'react-native';
import {connect} from 'react-redux';
// import Alert from '../Alert';
import Alert from '../../components/Alert/alert';
import HeaderPagination from '../../components/Pagination/paginationNumber';
// import Step1 from './Step1';
// import Step2 from './Step2';
import UnregisteredBusinessStepOne from './stepOne';
import UnregisteredBusinessStepTwo from './stepTwo';
import UnregisteredBusinessStepThree from './stepThree';

const screen = Dimensions.get('screen');

class CreateUnregisteredAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewCount: 0,
      activeSlide: new Animated.Value(0),
      error: false,
    };
  }

  nextSlide = () => {
    let viewCount = this.state.viewCount + 1;
    Animated.timing(this.state.activeSlide, {
      toValue: viewCount,
      duration: 200,
      easing: Easing.ease,
    }).start();

    this.setState({viewCount: viewCount, error: false});
  };

  previousSlide = () => {
    if (this.state.viewCount > 0) {
      let viewCount = this.state.viewCount - 1;
      Animated.timing(this.state.activeSlide, {
        toValue: viewCount,
        duration: 200,
        easing: Easing.ease,
      }).start();

      this.setState({viewCount: viewCount, error: false});
    } else {
      //go back to welcome screen
      this.props.navigation.goBack();
    }
  };

  render() {
    const {error, loading} = this.props;
    const slidePosition = this.state.activeSlide.interpolate({
      inputRange: [0, 1, 2],
      outputRange: [0, -screen.width, -screen.width * 2],
    });

    return (
      <Fragment>
        <Alert status="danger" message={error} />
        <SafeAreaView
          style={{flex: 1, position: 'relative', backgroundColor: '#f5f6f7'}}>
          {/* check if the props: named this is equal to this, then render this component */}
          <StatusBar
            barStyle="dark-content"
            backgroundColor="white"
            translucent={false}
          />
          <View
            style={{
              position: 'relative',
              height: 50,
              paddingHorizontal: 24,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            {loading === true ? null : (
              <TouchableOpacity
                onPress={this.previousSlide}
                style={{zIndex: 10}}>
                <Image
                  source={require('../../assets/icons/back_arrow.png')}
                  resizeMethod="auto"
                  resizeMode="center"
                  style={{width: 24, height: 24}}
                />
              </TouchableOpacity>
            )}
            <HeaderPagination viewCount={this.state.viewCount} units={3} />
          </View>
          {Platform.OS === 'ios' ? (
            <KeyboardAvoidingView style={{flex: 1}} behavior="padding" enabled>
              <ScrollView style={{flex: 1}}>
                <Animated.View
                  style={[styles.slideViewContainer, {left: slidePosition}]}>
                  <View style={styles.slideView}>
                    <UnregisteredBusinessStepOne nextSlide={this.nextSlide} />
                  </View>
                  <View style={styles.slideView}>
                    <UnregisteredBusinessStepTwo nextSlide={this.nextSlide} />
                  </View>
                  <View style={styles.slideView}>
                    <UnregisteredBusinessStepThree />
                  </View>
                </Animated.View>
              </ScrollView>
            </KeyboardAvoidingView>
          ) : (
            <KeyboardAvoidingView style={{flex: 1}} enabled>
              <ScrollView style={{flex: 1}}>
                <Animated.View
                  style={[styles.slideViewContainer, {left: slidePosition}]}>
                  <View style={styles.slideView}>
                    <UnregisteredBusinessStepOne nextSlide={this.nextSlide} />
                  </View>
                  <View style={styles.slideView}>
                    <UnregisteredBusinessStepTwo nextSlide={this.nextSlide} />
                  </View>
                  <View style={styles.slideView}>
                    <UnregisteredBusinessStepThree />
                  </View>
                </Animated.View>
              </ScrollView>
            </KeyboardAvoidingView>
          )}

          {/* check if the props: named this is equal to this, then render this component for the invite code */}
        </SafeAreaView>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  slideViewContainer: {
    position: 'relative',
    width: screen.width * 3,
    flexDirection: 'row',
    paddingTop: 35,
    paddingBottom: 38,
  },
  slideView: {
    position: 'relative',
    width: screen.width,
    paddingHorizontal: 24,
  },
});

const mapStateToProps = state => {
  const {unregisteredAccountCreation} = state;
  const {error, loading} = unregisteredAccountCreation;

  return {
    error,
    loading,
  };
};

export default connect(
  mapStateToProps,
  null,
)(CreateUnregisteredAccount);
