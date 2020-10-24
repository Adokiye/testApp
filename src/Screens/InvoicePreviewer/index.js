import React from 'react';
import {
  View,
  SafeAreaView,
  TouchableOpacity,
  Text,
  ScrollView,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { connect } from 'react-redux';
import Modal from 'react-native-modal';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

import styles from './styles';
import colors from '../../helpers/colors';
import { fetchUserProfile } from '../../actions/user';
import { fetchInvoices, sendInvoice } from '../../actions/invoice';
import { prepareMarkup } from './previewMarkup';
import BackButton from '../../components/Buttons/BackButton';
import ButtonMain from '../../components/Buttons/buttonMain';
import Alert from '../../components/Alert/alert';

class InvoicePreviewer extends React.Component {
  state = {
    isInvoiceLoading: true,
    isProfileLoading: true,
    invoiceId: this.props.navigation.getParam('invoiceId', null),
    invoice: {},
    isSendingComplete: false,
    isModalShowing: false,
    error: false,
  };

  componentDidMount() {
    this.fetchInvoice();
    this.fetchProfile();
  }

  fetchInvoice = async () => {
    const { invoiceId } = this.state;
    const invoices = await this.props.fetchInvoices();
    if (invoices.error) {
      return this.setState({
        error: invoices.error.message,
      });
    }
    const selectedInvoice = invoices.find(
      invoice => invoice.invoice_id === invoiceId,
    );
    this.setState({
      invoice: selectedInvoice,
      isInvoiceLoading: false,
    });
  };

  fetchProfile = async () => {
    const profile = await this.props.fetchProfile();
    if (profile.error) {
      this.setState({
        isProfileLoading: false,
        error: profile.error.message,
      });
    } else {
      this.setState({
        isProfileLoading: false,
      });
    }
  };

  renderPreviewer = () => {
    const { invoice } = this.state;
    const { profile } = this.props;
    const invoiceMarkup = prepareMarkup(invoice, profile);
    return invoiceMarkup;
  };

  renderCustomerEmail = () => {
    const {
      invoice: {
        customer_details: { customer_email: customerEmail },
      },
    } = this.state;
    return customerEmail;
  };

  sendInvoice = async () => {
    this.setState({
      isModalShowing: true,
    });

    const attemptSend = await sendInvoice(this.state.invoiceId);
    if (attemptSend.error) {
      return this.setState({
        isModalShowing: false,
        error: attemptSend.error.message,
      });
    }

    return this.setState({
      isSendingComplete: true,
    });
  };

  closePreview = () => {
    this.props.navigation.navigate('Invoice');
  };

  render() {
    const {
      invoiceId,
      isInvoiceLoading,
      isModalShowing,
      isSendingComplete,
      isProfileLoading,
      error,
    } = this.state;

    if (!invoiceId) {
      this.props.navigation.navigate('Invoice');
    }

    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={colors.PRIMARY_PURPLE} />
        <Alert status="danger" message={error} />

        <SafeAreaView>
          <View style={styles.header}>
            <BackButton />
            <Text style={styles.screenTitle}>Preview and Send</Text>
            <TouchableOpacity
              onPress={this.sendInvoice}
              activeOpacity={0.7}
              style={styles.nextBtn}>
              <Text style={styles.nextText}>Send</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>

        <View style={styles.backWhite}>
          <View style={styles.previewScreen}>
            {isProfileLoading || isInvoiceLoading ? (
              <ActivityIndicator
                size="large"
                color="grey"
                style={styles.previewLoader}
              />
            ) : (
              <WebView
                style={styles.webView}
                originWhitelist={['*']}
                source={{ html: this.renderPreviewer() }}
              />
            )}
          </View>

          <ScrollView style={styles.details}>
            <View style={styles.recipientTextContainer}>
              <Text style={styles.recipient}>
                {'Invoice will be emailed to '}
                {!isInvoiceLoading && (
                  <Text style={styles.boldText}>
                    {this.renderCustomerEmail()}
                  </Text>
                )}
              </Text>
              {isInvoiceLoading && (
                <ActivityIndicator style={styles.emailLoader} />
              )}
            </View>
          </ScrollView>
        </View>

        <Modal
          isVisible={isModalShowing}
          animationIn="slideInUp"
          style={styles.successModal}>
          {isSendingComplete ? (
            <SafeAreaView style={styles.successContent}>
              <View style={styles.modalContent}>
                <View style={styles.iconContainer}>
                  <FontAwesomeIcon
                    style={styles.successIcon}
                    icon={faCheck}
                    size={40}
                  />
                </View>
                <Text style={styles.successText}>
                  Invoice has been successfully sent
                </Text>
                <View style={styles.successButton}>
                  <ButtonMain onPress={this.closePreview} text="Got it!" />
                </View>
              </View>
            </SafeAreaView>
          ) : (
            <ActivityIndicator size="large" />
          )}
        </Modal>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    profile: state.user.profile,
    invoices: state.invoice.invoices,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchProfile: () => dispatch(fetchUserProfile()),
    fetchInvoices: () => dispatch(fetchInvoices()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InvoicePreviewer);
