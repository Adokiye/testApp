import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  Text,
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  Platform,
  FlatList,
} from 'react-native';
import {selectContactPhone} from 'react-native-select-contact';
import {PermissionsAndroid} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons';

import styles from './styles';
import colors from '../../helpers/colors';
import BackButton from '../../components/Buttons/BackButton';
import ContactCard from '../../components/ContactCard';
import ButtonOutline from '../../components/Buttons/buttonOutline';
import ShadowView from '../../components/ShadowView';
import Alert from '../../components/Alert/alert';
import {createInvoice} from '../../actions/invoice';

class InvoiceRecipients extends Component {
  state = {
    recipients: [],
    isUserAdded: true,
    error: false,
  };

  addRecipient = customerData => {
    this.props.navigation.push('CreateCustomer', {
      prefilledData: customerData,
      redirectTo: 'InvoiceRecipients',
      refreshPage: this.refreshPage,
    });
  };

  addRegisteredCustomer = customerData => {
    const {recipients} = this.state;
    recipients.push(customerData);
    this.setState({
      recipients,
      isUserAdded: true,
      error: false,
    });
  };

  refreshPage = async () => {
    this.setState({
      isUserAdded: false,
    });
  };

  removeRecipient = id => {
    const {recipients} = this.state;
    const newList = recipients.filter(item => item.customer_id !== id);
    this.setState({
      recipients: newList,
    });
  };

  displayError = error => {
    return this.setState({
      error,
    });
  };

  continueInvoiceCreation = async () => {
    const {recipients} = this.state;
    if (recipients.length === 0) {
      return this.displayError('Please add a recipient');
    }
    const invoiceData = this.props.navigation.getParam('invoiceData', {});
    invoiceData.recipients = recipients;

    const createdInvoice = await this.props.createInvoice(invoiceData);
    if (createdInvoice.error) {
      return this.displayError(createdInvoice.error.message);
    }

    this.props.navigation.navigate('InvoicePreviewer', {
      invoiceId: createdInvoice.invoice_id,
    });
  };

  selectContact = async () => {
    const addUser = async () => {
      let {
        contact: {emails, name},
        selectedPhone: {number: phone},
      } = await selectContactPhone();

      let email = '';
      if (emails.length > 0) {
        email = emails[0].address;
      }
      this.addRecipient({name, email, phone});
    };

    if (Platform.OS === 'android') {
      const permission = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
      );

      switch (permission) {
        case 'denied':
          this.displayError('You need to grant permission');
          break;

        case 'never_ask_again':
          this.displayError('Permission was not granted. Go to App settings');
          break;

        case 'granted':
          addUser();
          break;

        default:
          break;
      }
    } else {
      addUser();
    }
  };

  selectCustomer = async () => {};

  render() {
    const user = this.props.navigation.getParam('createdCustomer', {});
    if (user.customer_email && !this.state.isUserAdded) {
      this.addRegisteredCustomer(user);
    }

    const {recipients, error} = this.state;
    const isRecipientSelected = recipients.length > 0;

    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={colors.PRIMARY_PURPLE} />
        <Alert status="danger" message={error} />
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
          <Text style={styles.welcomeText}>Invoice recipient</Text>
        </View>

        <View style={styles.backWhite}>
          <View style={styles.contentContainer}>
            {recipients.map((recipient, index) => (
              <ShadowView key={index} style={styles.recipient}>
                <Text>{recipient.customer_name}</Text>
                <TouchableOpacity
                  onPress={() => this.removeRecipient(recipient.customer_id)}
                  style={styles.deleteIcon}>
                  <FontAwesomeIcon
                    style={styles.icon}
                    icon={faTrashAlt}
                    size={18}
                  />
                </TouchableOpacity>
              </ShadowView>
            ))}
          </View>

          {!isRecipientSelected && (
            <SafeAreaView style={{flex: 1}}>
              <FlatList
                data={this.props.customers}
                renderItem={({item}) => (
                  <TouchableOpacity
                    onPress={() => this.addRegisteredCustomer(item)}>
                    <ContactCard
                      clientName={item.customer_name}
                      bottomLeft={item.customer_email}
                      topRight={item.customer_phone}
                    />
                  </TouchableOpacity>
                )}
              />
              <View style={styles.button}>
                <ButtonOutline
                  onPress={this.selectContact}
                  text="Add from contacts"
                />
              </View>
            </SafeAreaView>
          )}
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    invoices: state.invoice.invoices,
    customers: state.customer.customers,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createInvoice: data => dispatch(createInvoice(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceRecipients);
