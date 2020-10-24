import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {connect} from 'react-redux';
import ShadowCard from '../../components/Cards/registerUserCard';

// refactor this userInput component
import UserInput from '../CustomerRegister/userInputs';
import ProspaButton from '../../components/Buttons/prospaButton';
import ImageUploadButton from '../../components/Buttons/imageUploadButton';
import * as actions from '../../actions/registeredBusiness.action';
import AsyncStorage from '@react-native-community/async-storage';
import {withNavigation} from 'react-navigation';
import {handleStep3} from '../../actions/registeredBusiness.action';
import InviteCode from '../../components/Modal/inviteCodeModal';
import ImageResizer from 'react-native-image-resizer';

class RegisteredBusinessStepThree extends Component {
  constructor(props) {
    super(props);
    this.state = {
      RCNumber: '',
      CAC_certificate: '',
      director_id_photo_1: '',
      director_id_photo_2: '',
      isModalVisible: false,
      inviteCode: '',
    };
  }

  toggleModal = () => {
    this.setState({isModalVisible: !this.state.isModalVisible});
  };

  onSubmit = () => {
    let payload = {
      'RC number': this.state.RCNumber,
      'CAC certificate photo': this.state.CAC_certificate,
      'first director ID photo': this.state.director_id_photo_1,
      'second director ID photo': this.state.director_id_photo_2,
      'Invite code': this.state.inviteCode,
    };
    
    const {step1Data, step2Data} = this.props;
    payload = Object.assign(payload, step1Data, step2Data);

    // this.props.handleStep3(data);
    if (!this.props.loading) {
      AsyncStorage.getItem('user_stats').then(data => {
        const {token} = JSON.parse(data);
        this.toggleModal();
        this.props.handleStep3(payload, token, this.props.navigation);
      });
    }
  };

  // check if it is IOS then convert
  // after compress it down to the low
  reseizeImages = (image, type) => {
    ImageResizer.createResizedImage(image.uri, 1000, 200, 'JPEG', 100)
      .then(uri => {
        if (type === 'CAC') {
          this.setState({
            CAC_certificate: uri,
          });
        }

        if (type === 'Photo 1') {
          this.setState({
            director_id_photo_1: uri,
          });
        }

        if (type === 'Photo 2') {
          this.setState({
            director_id_photo_2: uri,
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
      <ShadowCard>
        <Text
          style={{
            fontSize: 22,
            fontFamily: 'Gilroy-Medium',
            color: '#270450',
            lineHeight: 28,
            marginBottom: 29,
          }}>
          upload your{' '}
          <Text style={{fontFamily: 'Gilroy-Bold'}}>business documents</Text>
        </Text>
        <UserInput
          label="RC Number"
          placeholder="0123456789"
          onTextInput={RCNumber => this.setState({RCNumber})}
        />
        <ImageUploadButton
          label="Upload business owner certificate"
          onUpload={data => this.reseizeImages(data, 'CAC')}
        />
        <ImageUploadButton
          label="Upload first Director ID photo"
          onUpload={data => this.reseizeImages(data, 'Photo 1')}
        />
        <ImageUploadButton
          label="Upload second Director ID photo"
          onUpload={data => this.reseizeImages(data, 'Photo 2')}
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
        {/* <View style={{flexDirection: 'row', marginTop: 21}}>
          <ProspaButton
            text="create account"
            loading={loading}
            handleClick={this.onSubmit}
          />
        </View> */}
        {loading === true ? (
          <View style={{flexDirection: 'row'}}>
            <ProspaButton text="Submit" gradient={true} loading={loading} />
          </View>
        ) : (
          <View style={{flexDirection: 'row'}}>
            <ProspaButton
              text="Submit"
              gradient={true}
              handleClick={this.toggleModal}
              loading={loading}
            />
          </View>
        )}
      </ShadowCard>
    );
  }
}

const mapStateToProps = state => {
  const {registeredAccountCreation} = state;
  const {loading} = registeredAccountCreation;
  const {step1_data, step2_data} = registeredAccountCreation.data;

  return {
    loading,
    step1Data: step1_data,
    step2Data: step2_data,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleStep3: (data, token, navigation) =>
      dispatch(actions.handleStep3(data, token, navigation)),
  };
};

export default withNavigation(
  connect(mapStateToProps, mapDispatchToProps)(RegisteredBusinessStepThree),
);
