import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {connect} from 'react-redux';
import ShadowCard from '../../components/Cards/registerUserCard';

// refactor this userInput component
import ProspaInput from '../CustomerRegister/userInputs';
import ProspaButton from '../../components/Buttons/prospaButton';
import AsyncStorage from '@react-native-community/async-storage';
import {withNavigation} from 'react-navigation';
import {handleStep4} from '../../actions/registeredBusiness.action';

class RegisteredBusinessStepFour extends Component {
  constructor(props) {
    super(props);
    this.state = {
      businessReferCode: '',
    };
  }

  onSubmit = () => {
    let payload = {
      businessReferCode: this.state.businessReferCode,
    };

    // combine all the data I have gotten and stored on the reducer into one for the final API call
    const {step1Data, step2Data, step3Data} = this.props;
    payload = Object.assign(payload, step1Data, step2Data, step3Data);

    if (!this.props.loading) {
      AsyncStorage.getItem('user_stats').then(data => {
        const {token} = JSON.parse(data);
        this.props.handleStep4(payload, token, this.props.navigation);
      });
    }
  };

  render() {
    const {loading} = this.props;

    return (
      <ShadowCard>
        <Text
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            fontSize: 22,
            fontFamily: 'Gilroy-Medium',
            color: '#270450',
            lineHeight: 28,
            marginBottom: 29,
          }}>
          Business Referral{' '}
          <Text style={{fontFamily: 'Gilroy-Bold'}}>Code</Text>
        </Text>
        <ProspaInput
          label="Invite code"
          placeholder="optional"
          onTextInput={RCNumber => this.setState({RCNumber})}
        />
        <View style={{flexDirection: 'row', marginTop: 21}}>
          <ProspaButton
            text="Submit"
            loading={loading}
            handleClick={this.onSubmit}
          />
        </View>
      </ShadowCard>
    );
  }
}

const mapStateToProps = state => {
  const {registeredAccountCreation} = state;
  const {loading} = registeredAccountCreation;
  const {step1_data, step2_data, step3_data} = registeredAccountCreation.data;

  return {
    loading,
    step1Data: step1_data,
    step2Data: step2_data,
    step3Data: step3_data,
  };
};

const mapDispatchToProps = {
  handleStep4,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withNavigation(RegisteredBusinessStepFour));
