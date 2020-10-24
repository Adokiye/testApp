import React, {Component} from 'react';
import {View, Text} from 'react-native';
import RegisterUserCard from '../../components/Cards/registerUserCard';
import UserInputs from './userInputs';
import ProspaButton from '../../components/Buttons/prospaButton';

import registerThirdScreenStyle from './styles/styles.registerThirdScreen';

export default class RegistrationThirdScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      phone_number: props.initialPhoneNumber,
      email_address: '',
      password: '',
      password_confirmation: '',
      phoneNumberIsValid: true,
    };
  }

  handleSubmit = () => {
    const {initialPhoneNumber} = this.props;
    if (this.state.loading) {
      return;
    }
    this.setState({loading: true});

    let data = {
      'phone number': this.state.phone_number || initialPhoneNumber,
      'email address': this.state.email_address,
      password: this.state.password,
      'password confirmation': this.state.password_confirmation,
      phoneNumberIsValid: this.state.phoneNumberIsValid,
    };

    this.props
      .handleStep3(data)
      .then(() => {
        this.setState({loading: false});
      })
      .catch(() => {
        this.setState({loading: false});
      });
  };

  // componentDidMount() {
  //   const {initialPhoneNumber} = this.props;

  //   //console.log('HERE>>>>', initialPhoneNumber, 'HERE>>>>');
  //   // eslint-disable-next-line react/no-did-mount-set-state
  //   // this.setState({phone_number: initialPhoneNumber});
  // }

  updateInputValue = (field, value) => {
    // //console.log(value, 'VALUE>>>');
    let data = {};
    data[field] = value;
    this.setState(data);
  };

  updatePhoneValue = (field, value) => {
    const {initialPhoneNumber} = this.props;

    // //console.log(initialPhoneNumber, 'initialPhoneNumber>>>');
    if (value) {
      let data = {};
      data[field] = value;
      this.setState(data);
    }
    this.setState({phone_number: initialPhoneNumber});
  };

  render() {
    const {loading} = this.state;
    const {initialPhoneNumber, initialEmailAddress} = this.props;

    // this.setState({phone_number: initialPhoneNumber});

    return (
      <RegisterUserCard>
        <Text style={registerThirdScreenStyle.headerText}>
          tell us <Text style={registerThirdScreenStyle.font}>more </Text>
          about <Text style={registerThirdScreenStyle.font}>yourself</Text> and
          <Text style={registerThirdScreenStyle.font}> secure</Text> your{' '}
          <Text style={registerThirdScreenStyle.font}>account</Text>
        </Text>
        <UserInputs
          label="Phone number"
          placeholder="012345678911"
          type="numeric"
          phone={true}
          initialPhoneNumber={initialPhoneNumber}
          onTextInput={value => this.updateInputValue('phone_number', value)}
          validate={phoneNumberIsValid => this.setState({phoneNumberIsValid})}
        />
        <UserInputs
          label="Email address"
          placeholder="johndoe@mail.com"
          type="email-address"
          initialEmailAddress={initialEmailAddress}
          onTextInput={value => this.updateInputValue('email_address', value)}
        />
        <UserInputs
          label="Password"
          placeholder="password"
          secure={true}
          onTextInput={value => this.updateInputValue('password', value)}
        />
        <UserInputs
          label="Confirm password"
          placeholder="confirm password"
          secure={true}
          onTextInput={value =>
            this.updateInputValue('password_confirmation', value)
          }
        />
        <View style={{flexDirection: 'row'}}>
          <ProspaButton
            text="Sign up"
            loading={loading}
            handleClick={this.handleSubmit}
          />
        </View>
      </RegisterUserCard>
    );
  }
}
