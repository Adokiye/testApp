import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';
import * as actions from '../../actions/unregisteredBusiness.action';
import UserInputs from '../CustomerRegister/userInputs';
import ProspaButton from '../../components/Buttons/prospaButton';
import RegisterUserCard from '../../components/Cards/registerUserCard';
import AsyncStorage from '@react-native-community/async-storage';
import ImageUploadButton from '../../components/Buttons/imageUploadButton';
import {withNavigation} from 'react-navigation';
import InviteCode from '../../components/Modal/inviteCodeModal';
import ImageResizer from 'react-native-image-resizer';

class UnregisteredBusinessStepThree extends Component {
  constructor(props) {
    super(props);
    this.state = {
      businessNumber: '',
      businessCert: '',
      businessID: '',
      isModalVisible: false,
      inviteCode: '',
    };
  }

  onSubmit = () => {
    if (!this.props.loading) {
      const step2Data = this.props;
      let payload = {
        'Business Number': this.state.businessNumber,
        'Business Certificate': this.state.businessCert,
        'Business Identification': this.state.businessID,
        'Invite code': this.state.inviteCode,
      };
      //merge step1Data
      payload = Object.assign(payload, step2Data);
      AsyncStorage.getItem('user_stats').then(stats => {
        const {token} = JSON.parse(stats);
        this.toggleModal();
        this.props.handleStep3(payload, token, this.props.navigation);
      });
      // this.toggleModal;
    }
  };

  toggleModal = () => {
    this.setState({isModalVisible: !this.state.isModalVisible});
  };

  reseizeImages = (image, type) => {
    ImageResizer.createResizedImage(image.uri, 1000, 200, 'JPEG', 100)
      .then(uri => {
        if (type === 'Cert') {
          this.setState({
            businessCert: uri,
          });
        }

        if (type === 'ID') {
          this.setState({
            businessID: uri,
          });
        }
      })
      .catch(err => {
        // console.log(err, 'IMAGE RESIZE ERROR>>>><<');
        // return Alert.alert(
        //   'Unable to resize the photo',
        //   'Check the console for full the error message',
        // );
      });
  };

  render() {
    const {loading} = this.props;

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
          Upload your business{' '}
          <Text style={{fontFamily: 'Gilroy-Bold'}}>documents</Text>
        </Text>
        <UserInputs
          label="Business number"
          placeholder="business number"
          onTextInput={businessNumber => this.setState({businessNumber})}
        />
        <ImageUploadButton
          label="Business Certificate"
          onUpload={businessCert => this.reseizeImages(businessCert, 'Cert')}
          loading={loading}
        />
        <ImageUploadButton
          label="Business Identification"
          onUpload={businessID => this.reseizeImages(businessID, 'ID')}
          loading={loading}
        />
        <InviteCode
          modalVisibility={this.state.isModalVisible}
          modalToggle={this.toggleModal}
          skipButton={this.onSubmit}
          submitButton={this.onSubmit}
          loading={loading}
          state={this.state.inviteCode}
          onTextInput={inviteCode => this.setState({inviteCode})}
        />
        {/* <UserInputs
          label="Invite Code"
          placeholder="Optional"
          onTextInput={inviteCode => this.setState({inviteCode})}
        /> */}
        {loading === true ? (
          <View style={{flexDirection: 'row'}}>
            <ProspaButton
              gradient={true}
              text="Register Business"
              loading={loading}
            />
          </View>
        ) : (
          <View style={{flexDirection: 'row'}}>
            <ProspaButton
              gradient={true}
              text="Register Business"
              loading={loading}
              handleClick={this.toggleModal}
            />
          </View>
        )}
      </RegisterUserCard>
    );
  }
}

const mapStateToProps = state => {
  const {unregisteredAccountCreation, states} = state;
  const {loading, data} = unregisteredAccountCreation;
  const {step1Data, step2Data} = data;

  return {
    states,
    loading,
    step1Data,
    step2Data,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleStep3: (data, token, navigation) =>
      dispatch(actions.handleStep3(data, token, navigation)),
  };
};

export default withNavigation(
  connect(mapStateToProps, mapDispatchToProps)(UnregisteredBusinessStepThree),
);
