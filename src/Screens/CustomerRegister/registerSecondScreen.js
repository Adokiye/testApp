import React, {Component} from 'react';
import {View, Text} from 'react-native';
import RegisterUserCard from '../../components/Cards/registerUserCard';
import UserInputs from './userInputs';
import ProspaButton from '../../components/Buttons/prospaButton';
import Moment from 'moment';

import registerSecondScreenStyle from './styles/styles.registerSecondScreen';

export default class RegistrationSecondScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      date_of_birth: Moment().format('YYYY-MM-DD'),
      last_five_digits: '',
    };
  }

  handleSubmit = () => {
    if (this.state.loading) {
      return;
    }

    this.setState({loading: true});
    let data = {
      completePhoneNumber: this.state.last_five_digits,
      'date of birth': this.state.date_of_birth,
    };
    this.props
      .handleStep2(data)
      .then(() => {
        this.setState({loading: false});
        this.props.nextSlide();
      })
      .catch(() => {
        this.setState({loading: false});
      });
  };

  updateInputValue = (field, value) => {
    let data = {};
    data[field] = value;
    this.setState(data);
  };

  render() {
    const {firstname, phoneNumber} = this.props;
    const {loading} = this.state;

    return (
      <RegisterUserCard>
        <Text style={registerSecondScreenStyle.headerText}>
          Hi <Text style={registerSecondScreenStyle.font}>{firstname}, </Text>
          verify that you are the{' '}
          <Text style={registerSecondScreenStyle.font}>owner </Text>
          of the <Text style={registerSecondScreenStyle.font}>BVN</Text>
        </Text>
        <UserInputs
          label={`Last 5 digits of phone number  ${phoneNumber}*****`}
          type="numeric"
          placeholder="12345"
          onTextInput={value =>
            this.updateInputValue('last_five_digits', value)
          }
        />
        <UserInputs
          label="Date of birth"
          date={true}
          onDateInput={value => this.updateInputValue('date_of_birth', value)}
        />
        <Text style={registerSecondScreenStyle.text}>
          These details should match your BVN registration details
        </Text>
        <View style={{flexDirection: 'row'}}>
          <ProspaButton
            text="next"
            handleClick={this.handleSubmit}
            loading={loading}
          />
        </View>
      </RegisterUserCard>
    );
  }
}
