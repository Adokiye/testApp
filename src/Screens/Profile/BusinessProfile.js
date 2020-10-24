/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import {
  Text,
  View,
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import BusinessProfileStyle from './styles/styles.businessprofile';
import { connect } from 'react-redux';
import * as appActions from '../../actions/app';
import AddTin from '../../components/addTin/';
import { retrieveUserData } from '../../helpers/libs';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal from 'react-native-modal';
import ImagePicker from 'react-native-image-crop-picker';
import Loader from '../../components/Loading/overlayLoader';
const screen = Dimensions.get('screen');

class BusinessProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      add_tin: false,
      image: '',
      token: '',
      biz_account_id: '',
    };
  }

  async componentDidMount() {
    const userData = await retrieveUserData();
    const { token, biz_account_id } = userData;
    this.setState({
      biz_account_id,
      token,
    });
  }

  closeModal = () => {
    this.setState({
      add_tin: false,
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
          this.setState({ image: image.path });
          var photo = {
            uri: image.path,
            type: image.mime,
            name: Date.now() + 'image',
          };
          const data = new FormData();
          data.append('biz_account_id', this.state.biz_account_id);
          data.append('biz_logo', photo);
          console.log(JSON.stringify(data));
          this.props.uploadBusinessImage(data, this.state.token);
        }
      })
      .catch(e => console.log(e));
  }

  render() {
    const { params } = this.props.navigation.state;
    const { error, loading, selectedBusinessAccount } = this.props;
    // let height
    let image = '';
    if (this.state.image) {
      image = (
        <Image
          resizeMethod={'auto'}
          resizeMode={'contain'}
          style={{ width: 90, height: 90, borderRadius: 45 }}
          source={{ uri: this.state.image }}
        />
      );
    } else if (this.props.profile.biz_logo_url) {
      image = (
        <Image
          resizeMethod={'auto'}
          resizeMode={'contain'}
          style={{ width: 90, height: 90, borderRadius: 45 }}
          source={{ uri: this.props.profile.biz_logo_url }}
        />
      );
    } else {
      image = null;
      // <Image
      //   resizeMethod={'auto'}
      //   resizeMode={'contain'}
      //   style={{flex: 1}}
      //   source={require('../../assets/images/profileImage.png')}
      // />
    }
    return (
      <ScrollView>
        <View
          style={{
            width: screen.width * (84 / 100),
            alignSelf: 'center',
          }}>
          <View style={BusinessProfileStyle().houseImageView}>
            <View style={BusinessProfileStyle().imageView}>{image}</View>

            <View style={BusinessProfileStyle().editImageView}>
              <TouchableOpacity
                activeOpacity={0.7}
                hitSlop={{ left: 3, right: 3, bottom: 3, top: 3 }}
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
        <View style={BusinessProfileStyle().profileDetailsView}>
          <Text style={BusinessProfileStyle().selectBankText}>
            Business Name
          </Text>
          <Text style={BusinessProfileStyle().detailsText}>
            {selectedBusinessAccount.biz_friendly_name}
          </Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => this.setState({ add_tin: true })}>
          <View style={BusinessProfileStyle().profileDetailsRowView}>
            <View style={BusinessProfileStyle().wrapperColumnView}>
              <Text style={BusinessProfileStyle().selectBankText}>
                Tin number
              </Text>
              <Text style={BusinessProfileStyle().detailsText}>Add Tin</Text>
            </View>
            <Image
              resizeMethod={'auto'}
              resizeMode={'contain'}
              style={{ width: 15, height: 15, marginRight: '7.5%' }}
              source={require('../../assets/icons/grey_back.png')}
            />
          </View>
        </TouchableOpacity>
        <View style={BusinessProfileStyle().profileDetailsRowView}>
          <View style={BusinessProfileStyle().wrapperColumnCityView}>
            <Text style={BusinessProfileStyle().selectBankText}>City</Text>
            <Text style={BusinessProfileStyle().detailsText}>
              {this.props.profile.biz_city}
            </Text>
          </View>
          <View style={BusinessProfileStyle().wrapperColumnCityView}>
            <Text style={BusinessProfileStyle().selectBankText}>State</Text>
            <Text style={BusinessProfileStyle().detailsText}>
              {this.props.profile.biz_state}
            </Text>
          </View>
        </View>
        <View style={BusinessProfileStyle().profileDetailsRowView}>
          <View style={BusinessProfileStyle().wrapperColumnView}>
            <Text style={BusinessProfileStyle().selectBankText}>
              Mobile Number
            </Text>
            <Text style={BusinessProfileStyle().detailsText}>
              {this.props.profile.biz_phone}
            </Text>
          </View>
          {/* <Text style={BusinessProfileStyle().verifiedText}>Verified</Text> */}
        </View>
        <View style={BusinessProfileStyle().profileDetailsRowView}>
          <View style={BusinessProfileStyle().wrapperColumnView}>
            <Text style={BusinessProfileStyle().selectBankText}>
              Email Address
            </Text>
            <Text style={BusinessProfileStyle().detailsText}>
              {this.props.profile.biz_email}
            </Text>
          </View>
          {/* <Text style={BusinessProfileStyle().unverifiedText}>Unverified</Text> */}
        </View>
        <View style={BusinessProfileStyle().profileDetailsView}>
          <Text style={BusinessProfileStyle().selectBankText}>Address</Text>
          <Text numberOfLines={1} style={BusinessProfileStyle().detailsText}>
            {this.props.profile.biz_address}
          </Text>
        </View>
        <Modal isVisible={this.state.add_tin}>
          <AddTin
            cancelOperation={this.closeModal}
            completeOperation={this.closeModal}
          />
        </Modal>
        {loading ? <Loader loader={true} /> : null}
      </ScrollView>
    );
  }
}
const mapStateToProps = state => {
  //console.log(state, 'STATE');
  const { app, profile } = state;
  const { error, loading, selectedBusinessAccount, profile_ } = app;
  return {
    error,
    loading,
    selectedBusinessAccount,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    uploadBusinessImage: (payload, token) =>
      dispatch(appActions.uploadBusinessImage(payload, token)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BusinessProfile);
