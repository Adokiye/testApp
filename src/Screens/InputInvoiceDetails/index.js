import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  StatusBar,
} from 'react-native';
import Moment from 'moment';

import styles from './styles';
import colors from '../../helpers/colors';
import BackButton from '../../components/Buttons/BackButton';
import DatePicker from '../../components/Inputs/datePicker';
import {numToMoneyString} from '../../helpers/thousandSeparator';

export default class InputInvoiceDetails extends Component {
  state = {
    date: new Date(),
    dateFromNow: 'today',
    subTotal: this.props.navigation.getParam('total', 0),
    total: this.props.navigation.getParam('total', 0),
    shippingCost: '',
    taxRate: '',
  };

  setDate = date => {
    this.setState({date});
    this.calculateDateFromNow(date);
  };

  onChangeInput = (input, fieldName) => {
    const taxRate = fieldName === 'taxRate' ? input : this.state.taxRate;
    const shippingCost =
      fieldName === 'shippingCost' ? input : this.state.shippingCost;

    const {subTotal} = this.state;
    const taxCost = (+taxRate / 100) * +subTotal;
    const total = +subTotal + taxCost + +shippingCost;
    this.setState({
      [fieldName]: input,
      total,
    });
  };

  calculateDateFromNow = date => {
    const today = Moment(new Date());
    const newDate = Moment(date);
    const diff = Math.round(Moment.duration(newDate.diff(today)).asDays());

    let preparedString = '';
    if (diff < 1) {
      preparedString = 'today';
    } else if (diff === 1) {
      preparedString = 'in 1 day';
    } else {
      preparedString = `in ${diff} days`;
    }

    this.setState({
      dateFromNow: preparedString,
    });
  };

  continueInvoiceCreation = () => {
    const {taxRate, shippingCost, date, subTotal, total} = this.state;
    this.props.navigation.navigate('InvoiceRecipients', {
      invoiceData: {
        invoiceItems: this.props.navigation.getParam('invoiceItems', {}),
        shippingCost,
        taxRate,
        dueDate: Moment(date).format('YYYY-MM-DD'),
        invoice_sub_total: subTotal,
        invoice_grand_total: total,
      },
    });
  };

  render() {
    const {
      date,
      dateFromNow,
      subTotal,
      total,
      shippingCost,
      taxRate,
    } = this.state;

    const currencySign = '₦';
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={colors.PRIMARY_PURPLE} />
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
          <Text style={styles.welcomeText}>Invoice details</Text>
        </View>

        <ScrollView style={styles.backWhite}>
          <View style={styles.contentContainer}>
            <View style={styles.formSection}>
              <Text style={styles.text}>Due date</Text>
              <View style={[styles.row, styles.datePick]}>
                <DatePicker value={date} onSelect={this.setDate} />
                <Text style={styles.dueDate}>due {dateFromNow}</Text>
              </View>
            </View>

            <View style={[styles.row, styles.formSection]}>
              <View style={styles.half}>
                <Text style={styles.text}>
                  Shipping cost(
                  <Text style={styles.currencySign}>{currencySign}</Text>)
                </Text>
                <TextInput
                  style={styles.inputBox}
                  keyboardType="numeric"
                  placeholder="500"
                  value={shippingCost}
                  onChangeText={text =>
                    this.onChangeInput(text, 'shippingCost')
                  }
                />
              </View>
              <View style={styles.half}>
                <Text style={styles.text}>Tax rate(%)</Text>
                <TextInput
                  style={styles.inputBox}
                  keyboardType="numeric"
                  placeholder="5"
                  value={taxRate}
                  onChangeText={text => this.onChangeInput(text, 'taxRate')}
                />
              </View>
            </View>
            <View style={[styles.formSection, styles.totalContainer]}>
              <Text style={styles.text}>Sub-total:</Text>
              <Text style={[styles.text, styles.total]}>
                {numToMoneyString(+subTotal)}
              </Text>
            </View>
            <View style={[styles.formSection, styles.totalContainer]}>
              <Text style={styles.text}>Total:</Text>
              <Text style={[styles.text, styles.total]}>
                {numToMoneyString(+total)}
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}
