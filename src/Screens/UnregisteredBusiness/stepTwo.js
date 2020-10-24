import React, {Component} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import * as actions from '../../actions/unregisteredBusiness.action';
import UserInputs from '../CustomerRegister/userInputs';
import ProspaButton from '../../components/Buttons/prospaButton';
import RegisterUserCard from '../../components/Cards/registerUserCard';
import ImageUploadButton from '../../components/Buttons/imageUploadButton';
import AsyncStorage from '@react-native-community/async-storage';
import {withNavigation} from 'react-navigation';
import {API_KEY} from '../../../key';
// import {GoogleAutoComplete} from 'react-native-google-autocomplete';
import SearchResult from '../../components/SearchResults/searchResult';

class UnregisteredBusinessStepTwo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneNumber: '',
      phoneNumberIsValid: true,
      emailAddress: '',
      address: '',
      city: '',
      state: this.props.states[0].value,
    };
  }

  onSubmit = () => {
    let data = {
      'business email address': this.state.emailAddress,
      phoneNumber: this.state.phoneNumber,
      phoneNumberIsValid: this.state.phoneNumberIsValid,
      address: this.state.address,
      city: this.state.city,
      state: this.state.state,
    };
    this.props.handleStep2(data);
  };

  handlePress = async (fetchDetails, place_id) => {
    this.setState({address: place_id.main_text});
    const res = await fetchDetails(place_id);
    const result = JSON.stringify(fetchDetails);
  };

  render() {
    const {loading, states} = this.props;

    return (
      <RegisterUserCard>
        <Text
          style={{
            fontSize: 22,
            fontFamily: 'Gilroy-Medium',
            color: '#270450',
            lineHeight: 28,
            marginBottom: 29,
          }}>
          please provide your{' '}
          <Text style={{fontFamily: 'Gilroy-Bold'}}>contact details</Text>
        </Text>
        <UserInputs
          label="Business email address"
          placeholder="abcfoods@gmail.com"
          onTextInput={emailAddress => this.setState({emailAddress})}
        />
        <UserInputs
          label="Business phone number"
          phone={true}
          onTextInput={phoneNumber => this.setState({phoneNumber})}
          validate={phoneNumberIsValid => this.setState({phoneNumberIsValid})}
        />
        {/* <GoogleAutoComplete
          apiKey={API_KEY}
          minLength={1}
          lat={9.082}
          lng={8.6753}>
          {({handleTextChange, locationResults, fetchDetails}) => {
            // eslint-disable-next-line no-lone-blocks
            {
              //console.log('lOcationResults', locationResults);
            }
            return (
              <> */}
        <UserInputs
          label="Business Address"
          placeholder="6, Kunle Avenue"
          onTextInput={address => this.setState({address})}
        />
        {/* <ScrollView>
                  {locationResults.map(el => (
                    <SearchResult
                      key={el.id}
                      {...el}
                      fetchDetails={fetchDetails}
                      // selectLocation={el => //console.log('EL')}
                      handlePress={() =>
                        this.handlePress(el, el.structured_formatting)
                      }
                    />
                  ))}
                </ScrollView>
              </>
            );
          }}
        </GoogleAutoComplete> */}

        <UserInputs
          label="City"
          placeholder="Festac town"
          onTextInput={city => this.setState({city})}
        />
        <UserInputs
          label="State"
          picker={true}
          options={states}
          selected_option={this.state.state}
          option_label="name"
          option_value="value"
          onOptionSelect={state => this.setState({state})}
        />
        {/* <ImageUploadButton
        label="Business Certificate"
        onUpload={businessCertificate => this.setState({businessCertificate})}
      /> */}
        <View style={{flexDirection: 'row'}}>
          <ProspaButton
            gradient={true}
            text="next"
            loading={loading}
            handleClick={this.onSubmit}
          />
        </View>
      </RegisterUserCard>
    );
  }
}

const mapStateToProps = state => {
  const {unregisteredAccountCreation, states, navigation} = state;
  const {loading} = unregisteredAccountCreation;

  return {
    states,
    loading,
    navigation,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleStep2: data =>
      dispatch(actions.handleStep2(data, ownProps.nextSlide)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UnregisteredBusinessStepTwo);
