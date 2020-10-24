import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  RefreshControl,
} from 'react-native';
import styles from './styles.invoice';
import UserMenuIcon from '../../components/UserMenuIcon';
import InvoiceView from './invoiceView';
import CustomersView from './customersView';

import { fetchInvoices } from '../../actions/invoice';
import { fetchCustomers } from '../../actions/customer';

class Invoice extends Component {
  state = {
    currentTab: 'invoice',
    invoices: [],
    customers: [],
    refreshing: false,
  };

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(){
    const {params} = this.props.navigation.state;
    if(params && params.refresh){
      params.refresh = false;
      this.fetchData();
    }
  }

  fetchData = async () => {
    await this.props.fetchInvoices();
    await this.props.fetchCustomers();
  };

  changeTab = tab => {
    this.setState({
      currentTab: tab,
    });
  };

  processTabButton = (tabName, buttonText) => {
    if (tabName === this.state.currentTab) {
      return (
        <View style={styles.activeButton}>
          <Text style={styles.activeText}>{buttonText}</Text>
        </View>
      );
    }
    return (
      <View style={styles.inactiveButton}>
        <Text style={styles.inactiveText}>{buttonText}</Text>
      </View>
    );
  };

  onRefresh = async () => {
    this.setState({
      refreshing: true,
    });

    await this.fetchData();

    this.setState({
      refreshing: false,
    });
  };

  animateView = () => {};

  render() {
    const {
      isInvoiceLoading,
      isCustomerLoading,
      invoices,
      customers,
    } = this.props;

    const { currentTab, refreshing } = this.state;
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <SafeAreaView>
          <View style={styles.header}>
            <UserMenuIcon />
          </View>
        </SafeAreaView>
        <View style={styles.textView}>
          <Text style={styles.welcomeText}>Invoice</Text>
        </View>
        <View style={styles.parentTransferBar}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => this.changeTab('invoice')}>
            {this.processTabButton('invoice', 'Invoice')}
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => this.changeTab('customers')}>
            {this.processTabButton('customers', 'Customers')}
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.backWhite}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={this.onRefresh}
            />
          }>
          <View style={styles.mainWrapper}>
            {currentTab === 'invoice' && (
              <InvoiceView invoices={invoices} isLoading={isInvoiceLoading} />
            )}
            {currentTab === 'customers' && (
              <CustomersView
                customers={customers}
                isLoading={isCustomerLoading}
              />
            )}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    isInvoiceLoading: state.invoice.isLoading,
    isCustomerLoading: state.customer.isLoading,
    invoices: state.invoice.invoices,
    customers: state.customer.customers,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchInvoices: () => {
      dispatch(fetchInvoices());
    },
    fetchCustomers: () => {
      dispatch(fetchCustomers());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Invoice);
