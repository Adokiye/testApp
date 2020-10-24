import React, { Component } from 'react';
import {
  FlatList,
  View,
  Image,
  Text,
  Animated,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import TransactionDetailsStyle from './styles/styles.transactiondetails';
const styles = TransactionDetailsStyle();

const screen = Dimensions.get('screen');

export default class TransactionDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: true,
      data: null,
      new_data: null,
      text: '',
    };
  }

  render() {
    const { transaction } = this.props.navigation.state;
    return (
      <SafeAreaView style={styles.container}>
        <View>
          <View style={styles.header}>
            <TouchableOpacity
              activeOpacity={0.7}
              hitSlop={{ left: 2, right: 2, top: 2, bottom: 2 }}
              onPress={() => this.props.navigation.goBack()}>
              <View style={styles.backButtonView}>
                <Image
                  resizeMethod={'auto'}
                  resizeMode={'contain'}
                  style={styles.backButtonImage}
                  source={require('../../assets/icons/back_white.png')}
                />
              </View>
            </TouchableOpacity>
            <View
              style={
                TransactionDetailsStyle(params && params.in && 'in')
                  .initialsOval
              }>
              <Text style={styles.initialsText}>
                {params && params.description[0]}
              </Text>
            </View>
            <Image
              resizeMethod={'auto'}
              resizeMode={'contain'}
              style={{ width: 45, height: 45, opacity: 0 }}
              source={require('../../assets/icons/back_white.png')}
            />
          </View>
          <ScrollView>
            <View style={styles.descriptionView}>
              <Text style={styles.labelText}>Paid By</Text>
              <Text style={styles.dataText}>{params && params.name}</Text>
            </View>
            <View style={styles.descriptionView}>
              <Text style={styles.labelText}>Amount</Text>
              <Text style={styles.dataText}>
                {'\u20A6'}
                {params && params.amount}
              </Text>
            </View>
            <View style={styles.descriptionView}>
              <Text style={styles.labelText}>Reference</Text>
              <Text style={styles.dataText}>{params && params.reference}</Text>
            </View>
            <View style={styles.descriptionView}>
              <Text style={styles.labelText}>Description</Text>
              <Text style={styles.dataText}>
                {params && params.description}
              </Text>
            </View>
            <View style={styles.descriptionView}>
              <Text style={styles.labelText}>Status</Text>
              <Text style={styles.dataText}>{params && params.status}</Text>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}
