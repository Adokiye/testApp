import React, {Component} from 'react';
import {
  FlatList,
  View,
  Image,
  Text,
  Animated,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import moment from 'moment';
import PendingDetailsStyle from './styles/styles.pendingdetails';
import Icon from 'react-native-vector-icons/FontAwesome';

const screen = Dimensions.get('screen');

export default class PendingDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: true,
      data: null,
      new_data: null,
      text: '',
    };
  }

  titleCase(str) {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
      // You do not need to check if i is larger than splitStr length, as your for does that for you
      // Assign it back to the array
      splitStr[i] =
        splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    // Directly return the joined string
    return splitStr.join(' ');
  }

  render() {
    const {params} = this.props.navigation.state;
    return (
      <View style={PendingDetailsStyle.container}>
        <View style={PendingDetailsStyle.header}>
          <TouchableOpacity
            activeOpacity={0.7}
            hitSlop={{left: 2, right: 2, top: 2, bottom: 2}}
            onPress={() => this.props.navigation.goBack()}>
            <View style={PendingDetailsStyle.backButtonView}>
              <Image
                resizeMethod={'auto'}
                resizeMode={'contain'}
                style={PendingDetailsStyle.backButtonImage}
                source={require('../../assets/icons/back_white.png')}
              />
            </View>
          </TouchableOpacity>
          <View style={PendingDetailsStyle.initialsOval}>
            <Icon name="bank" size={17} color="#fff" />
          </View>
          <Image
            resizeMethod={'auto'}
            resizeMode={'contain'}
            style={{width: 45, height: 45, opacity: 0}}
            source={require('../../assets/icons/back_white.png')}
          />
        </View>
        <ScrollView>
          <View style={PendingDetailsStyle.descriptionView}>
            <Text style={PendingDetailsStyle.labelText}>Initiated By</Text>
            <Text style={PendingDetailsStyle.dataText}>
              {params && this.titleCase(params.created_by)}
            </Text>
          </View>
          <View style={PendingDetailsStyle.descriptionView}>
            <Text style={PendingDetailsStyle.labelText}>Amount</Text>
            <Text style={PendingDetailsStyle.dataText}>
              {'\u20A6'}
              {params && params.amount}
            </Text>
          </View>
          <View style={PendingDetailsStyle.descriptionView}>
            <Text style={PendingDetailsStyle.labelText}>To</Text>
            <Text style={PendingDetailsStyle.dataText}>
              {params && this.titleCase(params.recipient_account_name)}
            </Text>
          </View>
          <View style={PendingDetailsStyle.descriptionView}>
            <Text style={PendingDetailsStyle.labelText}>Description</Text>
            <Text style={PendingDetailsStyle.dataText}>
              {params && params.transfer_note}
            </Text>
          </View>
          <View style={PendingDetailsStyle.descriptionView}>
            <Text style={PendingDetailsStyle.labelText}>Date</Text>
            <Text style={PendingDetailsStyle.dataText}>
              {params && moment(params.pub_date).format('DD MMMM, YYYY')}
            </Text>
          </View>
        </ScrollView>
        <View style={PendingDetailsStyle.buttonView}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() =>
              this.props.navigation.navigate('EnterPin', {
                transfer_id: params.transfer_id,
                transfer_decision: 'approve',
                pending: true,
              })
            }>
            <View style={PendingDetailsStyle.authorizeView}>
              <Text style={PendingDetailsStyle.authorizeText}>Authorize</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() =>
              this.props.navigation.navigate('EnterPin', {
                transfer_id: params.transfer_id,
                transfer_decision: 'disapprove',
                amount: params.amount,
                paid_to: this.titleCase(params.recipient_account_name),
              })
            }>
            <View style={PendingDetailsStyle.cancelView}>
              <Text style={PendingDetailsStyle.cancelText}>Decline</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
