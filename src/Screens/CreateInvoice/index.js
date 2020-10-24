import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-native-modal';

import styles from './styles';
import BackButton from '../../components/Buttons/BackButton';
import CreateInvoiceItem from '../../components/createInvoiceItem';
import {numToMoneyString} from '../../helpers/thousandSeparator';

export default class CreateInvoice extends Component {
  state = {
    items: [this.props.navigation.getParam('invoiceItem', {})],
    showInvoiceModal: false,
    total: 0,
  };

  closeModal = () => {
    this.setState({
      showInvoiceModal: false,
    });
  };

  addInvoice = values => {
    const newList = this.state.items;
    newList.push(values);
    this.setState({
      items: newList,
    });
    this.calculateTotal();
    this.closeModal();
  };

  showInvoiceModal = () => {
    this.setState({
      showInvoiceModal: true,
    });
  };

  continueInvoiceCreation = () => {
    this.props.navigation.navigate('InputInvoiceDetails', {
      invoiceItems: this.state.items,
      total: this.state.total,
    });
  };

  calculateTotal = () => {
    let totalPrice = 0;
    // add all item prices
    this.state.items.forEach(item => {
      totalPrice = +item.item_total_amount + totalPrice;
    });

    // convert to 2 decimal places
    totalPrice = totalPrice.toFixed(2);
    this.setState({
      total: totalPrice,
    });
  };

  componentDidMount() {
    this.calculateTotal();
  }

  render() {
    const {items, showInvoiceModal, total} = this.state;

    return (
      <View style={styles.container}>
        <SafeAreaView>
          <View style={styles.header}>
            <BackButton />
            <TouchableOpacity
              onPress={this.continueInvoiceCreation}
              activeOpacity={0.7}
              style={styles.nextBtn}>
              <Text style={styles.nextText}>Next</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
        <View style={styles.textView}>
          <Text style={styles.welcomeText}>New invoice</Text>
        </View>

        <ScrollView style={styles.backWhite}>
          <View style={styles.mainContent}>
            <View style={styles.itemLabel}>
              <Text style={styles.labelText}>Item name: </Text>
              <Text style={styles.labelText}>Price: </Text>
            </View>
            <View style={styles.invoiceItemsList}>
              {items.map((item, index) => (
                <View key={index} style={styles.invoiceItem}>
                  <Text style={styles.labelText}>{item.item_description}</Text>
                  <Text style={styles.labelText}>
                    {numToMoneyString(+item.item_total_amount)}
                  </Text>
                </View>
              ))}
            </View>
            <View style={styles.itemLabel}>
              <Text style={styles.labelText}>Total: </Text>
              <Text style={[styles.labelText, styles.rightEnd]}>
                {numToMoneyString(+total)}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={this.showInvoiceModal}
            activeOpacity={0.7}
            style={styles.addAction}>
            <View style={styles.plusIcon}>
              <FontAwesomeIcon style={styles.icon} icon={faPlus} size={12} />
            </View>
            <Text style={styles.addText}>Add new item</Text>
          </TouchableOpacity>
        </ScrollView>
        <Modal isVisible={showInvoiceModal}>
          <CreateInvoiceItem
            cancelOperation={this.closeModal}
            completeOperation={this.addInvoice}
          />
        </Modal>
      </View>
    );
  }
}
