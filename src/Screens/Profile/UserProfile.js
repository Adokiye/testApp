/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  Text,
  View,
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import UserProfileStyle from './styles/styles.userprofile';
import ChangePassword from '../../components/changePassword/index';

import {connect} from 'react-redux';
import * as appActions from '../../actions/app';
// import Loader from '../../components/Loading/overlayLoader';
import AsyncStorage from '@react-native-community/async-storage';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal from 'react-native-modal';
import ImagePicker from 'react-native-image-crop-picker';
import Loader from '../../components/Loading/overlayLoader';

const screen = Dimensions.get('screen');

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      change_password: false,
      image: '',
      token: '',
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    };
  }

  async componentDidMount() {
    const store = await AsyncStorage.getItem('user_stats');
    const {token} = JSON.parse(store);
    console.log(token);
    this.setState({
      token,
    });
  }

  setOldPassword = oldPassword => {
    this.setState({oldPassword});
  };

  setNewPassword = newPassword => {
    this.setState({newPassword});
  };

  async change() {
    const payload = {
      old_password: this.state.oldPassword,
      password1: this.state.newPassword,
      password2: this.state.confirmPassword,
    };
    this.closeModal();
    await this.props.changePassword(payload, this.state.token)
  }
 
  setConfirmPassword = confirmPassword => {
    this.setState({confirmPassword});
  };

  closeModal = () => {
    this.setState({
      change_password: false,
    });
  };

  async imageUpload() {
    ImagePicker.openPicker({
      cropping: true,
      includeExif: true,
      mediaType: 'photo',
    })
      .then(image => {
        if (image) {
          this.setState({image: image.path});
          var photo = {
            uri: image.path,
            type: image.mime,
            name: Date.now() + 'image',
          };
          const data = new FormData();
          data.append('profile_photo', photo);
          console.log(JSON.stringify(data));
          this.props.uploadUserImage(data, this.state.token);
        }
      })
      .catch(e => console.log(e));
  }

  render() {
    const {params} = this.props.navigation.state;
    const {error, loading} = this.props;
    // let height
    let image = '';
    if (this.state.image) {
      image = (
        <Image
          resizeMethod={'auto'}
          resizeMode={'contain'}
          style={{width: 90, height: 90, borderRadius: 45}}
          source={{uri: this.state.image}}
        />
      );
    } else if (this.props.profile.photo_url) {
      image = (
        <Image
          resizeMethod={'auto'}
          resizeMode={'contain'}
          style={{width: 90, height: 90, borderRadius: 45}}
          source={{uri: this.props.profile.photo_url}}
        />
      );
    } else {
      image = null;
    }
    return (
      <ScrollView>
        <View
          style={{
            width: screen.width * (84 / 100),
            alignSelf: 'center',
          }}>
          <View style={UserProfileStyle().houseImageView}>
            <View style={UserProfileStyle().imageView}>{image}</View>

            <View style={UserProfileStyle().editImageView}>
              <TouchableOpacity
                activeOpacity={0.7}
                hitSlop={{left: 3, right: 3, bottom: 3, top: 3}}
                onPress={this.imageUpload.bind(this)}>
                <MaterialCommunityIcon
                  name="cloud-upload-outline"
                  color={'#fff'}
                  size={17}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={UserProfileStyle().profileDetailsView}>
          <Text style={UserProfileStyle().selectBankText}>First Name</Text>
          <Text style={UserProfileStyle().detailsText}>
            {this.props.first_name}
          </Text>
        </View>
        <View style={UserProfileStyle().profileDetailsView}>
          <Text style={UserProfileStyle().selectBankText}>Last Name</Text>
          <Text style={UserProfileStyle().detailsText}>
            {this.props.last_name}
          </Text>
        </View>
        <View style={UserProfileStyle().profileDetailsRowView}>
          <View style={UserProfileStyle().wrapperColumnView}>
            <Text style={UserProfileStyle().selectBankText}>Mobile Number</Text>
            <Text style={UserProfileStyle().detailsText}>
              {this.props.profile.phone}
            </Text>
          </View>
          {/* <Text style={UserProfileStyle().verifiedText}>Verified</Text> */}
        </View>
        <View style={UserProfileStyle().profileDetailsRowView}>
          <View style={UserProfileStyle().wrapperColumnView}>
            <Text style={UserProfileStyle().selectBankText}>Email Address</Text>
            <Text style={UserProfileStyle().detailsText}>
              {this.props.profile.email}
            </Text>
          </View>
          {/* <Text style={UserProfileStyle().unverifiedText}>Unverified</Text> */}
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => this.setState({change_password: true})}>
          <View style={UserProfileStyle().profileDetailsRowView}>
            <View style={UserProfileStyle().wrapperColumnView}>
              <Text style={UserProfileStyle().selectBankText}>Password</Text>
              <Text style={UserProfileStyle().detailsText}>******</Text>
            </View>
            <Image
              resizeMethod={'auto'}
              resizeMode={'contain'}
              style={{width: 15, height: 15, marginRight: '7.5%'}}
              source={require('../../assets/icons/grey_back.png')}
            />
          </View>
        </TouchableOpacity>
        <Modal isVisible={this.state.change_password}>
          <ChangePassword
            cancelOperation={this.closeModal}
            completeOperation={this.closeModal}
            setOldPassword={this.setOldPassword.bind(this)}
            setNewPassword={this.setNewPassword.bind(this)}
            setConfirmPassword={this.setConfirmPassword.bind(this)}
            change={this.change.bind(this)}
          />
        </Modal>
        {loading ? <Loader loader={true} /> : null}
      </ScrollView>
    );
  }
}
const mapStateToProps = state => {
  //console.log(state, 'STATE');
  const {app, profile} = state;
  const {error, loading} = app;
  return {
    error,
    loading,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    uploadUserImage: (payload, token) =>
      dispatch(appActions.uploadUserImage(payload, token)),
    changePassword: (payload, token) =>
      dispatch(appActions.changePassword(payload, token)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserProfile);
