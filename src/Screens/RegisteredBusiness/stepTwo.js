import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {connect} from 'react-redux';
import {handleStep2} from '../../actions/registeredBusiness.action';
import ShadowCard from '../../components/Cards/registerUserCard';

// refactor this userInput component
import ProspaInput from '../CustomerRegister/userInputs';
import ProspaButton from '../../components/Buttons/prospaButton';

class RegisteredBusinessStepTwo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      businessPhoneNumber: '',
      phoneNumberIsValid: true,
      emailAddress: '',
      businessAddress: '',
      city: '',
      selectedState: 'fct',
    };
  }

  onSubmit = () => {
    const data = {
      'business phone number': this.state.businessPhoneNumber,
      phoneNumberIsValid: this.state.phoneNumberIsValid,
      'business email address': this.state.emailAddress,
      'business address': this.state.businessAddress,
      city: this.state.city,
      state: this.state.selectedState,
    };
    this.props.handleStep2(data);
  };

  render() {
    const {loading, states} = this.props;
    // //console.log(this.props, 'STATE');

    return (
      <ShadowCard>
        <Text
          style={{
            fontSize: 22,
            fontFamily: 'Gilroy-Medium',
            color: '#270450',
            lineHeight: 28,
            marginBottom: 29,
          }}>
          provide your business{' '}
          <Text style={{fontFamily: 'Gilroy-Bold'}}>contact details</Text>
        </Text>
        <ProspaInput
          label="Business email address"
          placeholder="abcfoods@gmail.com"
          type="email-address"
          onTextInput={emailAddress => this.setState({emailAddress})}
        />
        <ProspaInput
          label="Business phone number"
          phone={true}
          onTextInput={businessPhoneNumber =>
            this.setState({businessPhoneNumber})
          }
          validate={phoneNumberIsValid => this.setState({phoneNumberIsValid})}
        />
        <ProspaInput
          label="Business address"
          placeholder="6, Kunle Avenue"
          onTextInput={businessAddress => this.setState({businessAddress})}
        />
        <ProspaInput
          label="City"
          placeholder="Ikeja"
          onTextInput={city => this.setState({city})}
        />
        <ProspaInput
          label="State"
          picker={true}
          selected_option={this.state.selectedState}
          options={states}
          option_label="name"
          option_value="value"
          onOptionSelect={value => this.setState({selectedState: value})}
        />
        <View style={{flexDirection: 'row'}}>
          <ProspaButton
            text="next"
            gradient={true}
            handleClick={this.onSubmit}
            loading={loading}
          />
        </View>
      </ShadowCard>
    );
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleStep2: data => dispatch(handleStep2(data, ownProps.nextSlide)),
  };
};

const mapStateToProps = state => {
  const {registeredAccountCreation, states} = state;
  const {loading} = registeredAccountCreation;
  return {
    loading,
    states,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RegisteredBusinessStepTwo);
