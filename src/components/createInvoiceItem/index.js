import React from 'react';
import {View, Text, TextInput, KeyboardAvoidingView} from 'react-native';

import styles from './styles';
import ButtonOutline from '../Buttons/buttonOutline';
import ButtonMain from '../Buttons/buttonMain';
import {numToMoneyString} from '../../helpers/thousandSeparator';

export default class CreateInvoiceItem extends React.Component {
  state = {
    name: '',
    price: '',
    quantity: '',
    error: '',
  };

  handleInputChange = (text, fieldName) => {
    this.setError('');
    this.setState({[fieldName]: text});
  };

  cancelOperation = () => {
    const operation = this.props.cancelOperation || (() => {});
    operation();
  };

  setError = error => {
    this.setState({
      error,
    });
  };

  validateFields = () => {
    let {name, price, quantity} = this.state;
    if (name === '' || price === '') {
      this.setError('All fields are required');
      return {isValid: false};
    }

    if (isNaN(quantity)) {
      this.setError('Incorrect value for quantity');
      return {isValid: false};
    }

    if (+quantity === 0) {
      quantity = 1;
    }

    return {
      isValid: true,
      data: {
        item_description: name,
        item_unit_price: price,
        item_qty: quantity,
        item_total_amount: +price * +quantity,
      },
    };
  };

  completeOperation = () => {
    const validation = this.validateFields();
    if (!validation.isValid) {
      return;
    }

    const operation = this.props.completeOperation || (() => {});
    operation(validation.data);
  };

  render() {
    let {name, price, quantity, error} = this.state;

    let totalPrice = +price * +quantity;
    if (+quantity === 0) {
      totalPrice = +price;
    }
    totalPrice = numToMoneyString(+totalPrice, false);

    const currencySymbol = '₦';

    return (
      <KeyboardAvoidingView>
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>New item</Text>
          </View>
          {error.length > 0 && <Text style={styles.errorMessage}>{error}</Text>}
          <View style={styles.contentContainer}>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Item name</Text>
              <TextInput
                value={name}
                onChangeText={text => this.handleInputChange(text, 'name')}
                style={styles.input}
                placeholder="Services rendered"
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Price</Text>
              <View style={styles.prefixedInputContainer}>
                <Text style={styles.inputPrefix}>{currencySymbol}</Text>
                <TextInput
                  value={price}
                  onChangeText={text => this.handleInputChange(text, 'price')}
                  style={[styles.input, styles.prefixedInput]}
                  keyboardType="numeric"
                  placeholder="0.00"
                />
              </View>
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Quantity</Text>
              <TextInput
                value={quantity}
                onChangeText={text => this.handleInputChange(text, 'quantity')}
                style={styles.input}
                keyboardType="numeric"
                placeholder="1"
              />
            </View>
            <View>
              <Text style={styles.totalPrice}>
                Total: {`${currencySymbol} ${totalPrice}`}
              </Text>
            </View>
            <View style={styles.actions}>
              <View style={styles.button}>
                <ButtonOutline onPress={this.cancelOperation} text="Cancel" />
              </View>
              <View style={styles.button}>
                <ButtonMain onPress={this.completeOperation} text="Add" />
              </View>
            </View>
          </View>
        </View>
        {/* <KeyboardSpacer /> */}
      </KeyboardAvoidingView>
    );
  }
}
