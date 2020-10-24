import React, { useState } from 'react';
import { View, Text, SectionList, ActivityIndicator } from 'react-native';
import { withNavigation } from 'react-navigation';
import Modal from 'react-native-modal';
import moment from 'moment';

import styles from './styles';

import ButtonOutline from '../../../components/Buttons/buttonOutline';
import InvoiceReport from '../invoiceReport';
import CardScroller from '../cardScroller';
import InvoiceCard from '../invoiceCard';
import CreateInvoiceItem from '../../../components/createInvoiceItem';
import { numToMoneyString } from '../../../helpers/thousandSeparator';
import colors from '../../../helpers/colors';

const InvoiceView = ({ navigation, invoices = [], isLoading }) => {
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);

  const createInvoice = () => {
    setShowInvoiceModal(true);
  };

  const closeModal = () => {
    setShowInvoiceModal(false);
  };

  const continueInvoiceCreation = values => {
    closeModal();
    navigation.navigate('CreateInvoice', { invoiceItem: values });
  };

  const calculateSummary = () => {
    if (invoices.error) {
      return { total: 0, received: 0, outstanding: 0 };
    }
    let total = 0;
    let received = 0;
    let outstanding = 0;
    invoices.forEach(invoice => {
      total += +invoice.invoice_grand_total;
      received += +invoice.invoice_amount_paid;
      outstanding += +invoice.invoice_amount_outstanding;
    });
    total = numToMoneyString(total);
    received = numToMoneyString(received);
    outstanding = numToMoneyString(outstanding);
    return { total, received, outstanding };
  };

  const groupInvoices = () => {
    const unpaid = [];
    const partPayment = [];
    const paid = [];

    invoices.forEach(invoice => {
      if (+invoice.invoice_amount_paid === 0) {
        unpaid.push(invoice);
      } else if (invoice.invoice_amount_paid === invoice.invoice_grand_total) {
        paid.push(invoice);
      } else {
        partPayment.push(invoice);
      }
    });

    const result = [
      {
        title: 'unpaid',
        data: unpaid,
      },
      {
        title: 'part-payment',
        data: partPayment,
      },
      {
        title: 'paid',
        data: paid,
      },
    ];
    return result;
  };

  const processDueDate = dueDate => {
    const date = moment(dueDate);
    return date.calendar(null, {
      sameDay: '[Due Today]',
      nextDay: '[Tomorrow]',
      nextWeek: '[Due by] dddd',
      lastDay: '[Due Yesterday]',
      lastWeek: '[Due last] dddd',
      sameElse: '[Due by] ll',
    });
  };

  const renderHeading = section => {
    const count = section.data.length;
    const suffix = count > 1 ? ' invoices' : ' invoice';
    let title = section.title;
    if (title === 'part-payment') {
      title = suffix + ' with part payment';
    } else {
      title = section.title + suffix;
    }
    return <Text style={styles.invoiceLabel}>{`${count} ${title}`}</Text>;
  };

  const { total, received, outstanding } = calculateSummary();

  return (
    <View>
      <View style={styles.topButton}>
        <ButtonOutline onPress={createInvoice} text="Create an invoice" />
      </View>

      {isLoading ? (
        <ActivityIndicator size="large" color={colors.PRIMARY_PINK} />
      ) : (
        <View>
          {invoices.length > 0 ? (
            <View>
              <CardScroller>
                <InvoiceReport label="Total" value={total} />
                <InvoiceReport
                  label="Received"
                  value={received}
                  color="#4CD964"
                />
                <InvoiceReport label="Outstanding" value={outstanding} />
              </CardScroller>

              <View style={styles.invoiceCards}>
                <SectionList
                  sections={groupInvoices()}
                  renderItem={({ item }) => (
                    <InvoiceCard
                      invoiceNumber={item.invoice_number}
                      clientName={item.customer_details.customer_name}
                      amount={numToMoneyString(+item.invoice_grand_total)}
                      dueDate={processDueDate(item.invoice_due_date)}
                    />
                  )}
                  keyExtractor={(item, index) => item + index}
                  renderSectionHeader={({ section }) => renderHeading(section)}
                />
              </View>
            </View>
          ) : (
            <Text style={[styles.invoiceLabel, styles.empty]}>
              No invoice found
            </Text>
          )}
        </View>
      )}

      <Modal isVisible={showInvoiceModal}>
        <CreateInvoiceItem
          cancelOperation={closeModal}
          completeOperation={continueInvoiceCreation}
        />
      </Modal>
    </View>
  );
};

export default withNavigation(InvoiceView);
