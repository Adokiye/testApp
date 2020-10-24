/* eslint-disable react-native/no-inline-styles */
import React, {Component, Fragment} from 'react';
import {
  View,
  Animated,
  Easing,
  Platform,
  DatePickerAndroid,
  Picker,
  Text,
  Modal,
  DatePickerIOS,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Moment from 'moment';
import PhoneInput from 'react-native-phone-input';
// import NormalPicker from '../../components/Inputs/picker';
import TextInputs from '../../components/Inputs/textInput';

export default class UserInputs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appearance: new Animated.Value(0),
      active: false,
      selectedDate: new Date(),
      modalVisible: false,
    };
  }

  onInputFocus = () => {
    Animated.timing(this.state.appearance, {
      toValue: 1,
      duration: 200,
      easing: Easing.ease,
    }).start();

    this.setState({active: true});
  };

  onInputBlur = () => {
    Animated.timing(this.state.appearance, {
      toValue: 0,
      duration: 200,
      easing: Easing.ease,
    }).start();

    this.setState({active: false});
  };

  onDateClick = async () => {
    if (Platform.OS === 'ios') {
      //show date selection modal
      this.setState({modalVisible: true});
    } else if (Platform.OS === 'android') {
      try {
        const {action, year, month, day} = await DatePickerAndroid.open({
          date: this.state.selectedDate,
          mode: 'spinner',
        });
        if (action !== DatePickerAndroid.dismissedAction) {
          //create new date and update state
          let date = new Date(year, month, day);
          this.setState({selectedDate: date});

          let dateString = Moment(date).format('YYYY-MM-DD');
          this.props.onDateInput && this.props.onDateInput(dateString);
        }
      } catch ({code, message}) {
        // console.log(message);
      }
    }
  };

  editModalVisibility = status => {
    this.setState({modalVisible: status});
  };

  onIOSDateChange = newDate => {
    this.setState({selectedDate: newDate});
    let dateString = Moment(newDate).format('YYYY-MM-DD');
    this.props.onDateInput && this.props.onDateInput(dateString);
  };

  onTextInput = text => {
    if (this.props.phone) {
      this.props.onTextInput && this.props.onTextInput(this.phone.getValue());
      this.props.validate && this.props.validate(this.phone.isValidNumber());
    } else {
      this.props.onTextInput && this.props.onTextInput(text);
    }
  };

  onOptionSelect = (value, index) => {
    this.props.onOptionSelect;
    this.props.onOptionSelect(value);
  };

  render() {
    const {
      label,
      type,
      secure,
      placeholder,
      date,
      picker,
      options,
      option_label,
      option_value,
      selected_option,
      phone,
      initialPhoneNumber,
      initialEmailAddress,
    } = this.props;

    const {selectedDate, modalVisible} = this.state;

    const labelColor = this.state.appearance.interpolate({
      inputRange: [0, 1],
      outputRange: ['#5d6262', '#fa4a84'],
    });
    const defaultBgOpacity = this.state.appearance.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0],
    });
    const gradientBgOpacity = this.state.appearance.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    });

    let optionList;
    let selectedOptionValue;

    if (picker) {
      options.forEach(data => {
        if (data[option_value] === selected_option) {
          selectedOptionValue = data[option_label];
        }
      });

      optionList = options.map((data, index) => {
        return (
          <Picker.Item
            label={data[option_label]}
            key={index}
            value={data[option_value]}
          />
        );
      });
    }

    return (
      <View style={{position: 'relative', marginBottom: 18}}>
        <Animated.Text
          style={{
            fontSize: 17,
            fontFamily: 'Gilroy-Semibold',
            color: labelColor,
            marginBottom: 9,
          }}>
          {label}
        </Animated.Text>
        <View
          style={{
            position: 'relative',
            height: 48,
            borderRadius: 4,
            overflow: 'hidden',
            padding: 2,
          }}>
          <Animated.View
            style={{
              position: 'absolute',
              backgroundColor: '#eef0f1',
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              opacity: defaultBgOpacity,
            }}
          />
          <Animated.View
            style={{
              position: 'absolute',
              left: 0,
              bottom: 0,
              right: 0,
              top: 0,
              opacity: gradientBgOpacity,
            }}>
            <LinearGradient
              style={{flex: 1}}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={['#fa4a84', '#bb53f2', '#7e51ff']}
            />
          </Animated.View>
          <View style={{flex: 1, backgroundColor: 'white', borderRadius: 2}}>
            {date && (
              <Fragment>
                <TouchableOpacity
                  onPress={this.onDateClick}
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: 16,
                  }}>
                  <Text
                    style={{
                      fontSize: 15,
                      fontFamily: 'Gilroy-Bold',
                      color: '#270450',
                      height: 15,
                      lineHeight: 15,
                    }}>
                    {Moment(selectedDate).format('DD MMMM, YYYY')}
                  </Text>
                </TouchableOpacity>
                {Platform.OS === 'ios' && (
                  <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}>
                    <View style={{flex: 1, justifyContent: 'flex-end'}}>
                      <SafeAreaView style={{backgroundColor: 'white'}}>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'flex-end',
                            paddingHorizontal: 24,
                            paddingVertical: 16,
                            borderBottomColor: '#eef0f1',
                            borderBottomWidth: 1,
                          }}>
                          <Text
                            onPress={() => this.setState({modalVisible: false})}
                            style={{
                              fontSize: 16,
                              fontFamily: 'Gilroy-Semibold',
                              lineHeight: 16,
                              height: 16,
                              color: '#270450',
                            }}>
                            Done
                          </Text>
                        </View>
                        <DatePickerIOS
                          date={selectedDate}
                          mode="date"
                          onDateChange={this.onIOSDateChange}
                        />
                      </SafeAreaView>
                    </View>
                  </Modal>
                )}
              </Fragment>
            )}
            {picker && (
              <View style={{flex: 1}}>
                {Platform.OS === 'ios' ? (
                  <Fragment>
                    <TouchableOpacity
                      onPress={() => this.setState({modalVisible: true})}
                      style={{
                        flex: 1,
                        alignItems: 'center',
                        flexDirection: 'row',
                        paddingHorizontal: 12,
                      }}>
                      <Text
                        style={{
                          fontSize: 15,
                          fontFamily: 'Gilroy-Bold',
                          color: '#270450',
                          height: 15,
                          lineHeight: 15,
                        }}>
                        {selectedOptionValue}
                      </Text>
                    </TouchableOpacity>
                    <Modal
                      animationType="slide"
                      transparent={true}
                      visible={modalVisible}>
                      <View style={{flex: 1, justifyContent: 'flex-end'}}>
                        <SafeAreaView style={{backgroundColor: 'white'}}>
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'flex-end',
                              paddingHorizontal: 24,
                              paddingVertical: 16,
                              borderBottomColor: '#eef0f1',
                              borderBottomWidth: 1,
                            }}>
                            <Text
                              onPress={() =>
                                this.setState({modalVisible: false})
                              }
                              style={{
                                fontSize: 16,
                                fontFamily: 'Gilroy-Semibold',
                                lineHeight: 16,
                                height: 16,
                                color: '#270450',
                              }}>
                              Done
                            </Text>
                          </View>
                          <Picker
                            selectedValue={selected_option}
                            onValueChange={this.onOptionSelect}
                            enabled>
                            {optionList}
                          </Picker>
                        </SafeAreaView>
                      </View>
                    </Modal>
                  </Fragment>
                ) : (
                  <Picker
                    style={{flex: 1}}
                    selectedValue={selected_option}
                    onValueChange={this.onOptionSelect}
                    enabled>
                    {optionList}
                  </Picker>
                )}
              </View>
            )}
            {phone && (
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingHorizontal: 16,
                }}>
                <PhoneInput
                  initialCountry="ng"
                  ref={ref => {
                    this.phone = ref;
                  }}
                  textStyle={{
                    fontSize: 15,
                    fontFamily: 'Gilroy-Bold',
                    color: '#270450',
                  }}
                  value={initialPhoneNumber}
                  allowZeroAfterCountryCode={false}
                  getISOCode
                  getCountryCode
                  onChangePhoneNumber={this.onTextInput}
                />
              </View>
            )}
            {!date && !picker && !phone ? (
              <TextInputs
                type={type}
                secure={secure}
                placeholder={placeholder}
                onInputFocus={this.onInputFocus}
                onInputBlur={this.onInputBlur}
                onTextInput={this.onTextInput}
                defaultValue={initialEmailAddress}
              />
            ) : null}
          </View>
        </View>
      </View>
    );
  }
}
