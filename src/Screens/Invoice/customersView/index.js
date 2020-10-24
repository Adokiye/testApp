import React from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Text,
} from 'react-native';
import { withNavigation } from 'react-navigation';

import styles from './styles';
import ContactCard from '../../../components/ContactCard';
import ButtonOutline from '../../../components/Buttons/buttonOutline';
import colors from '../../../helpers/colors';
import Icon from 'react-native-vector-icons/Feather';

const CustomersView = ({ navigation, customers, isLoading }) => {
  const filterMethod = (data, searchText) => {
    const result = data.filter(item => {
      let name = item.customer_name;
      return name.toUpperCase().includes(searchText.toUpperCase());
    });
    return result;
  };
  const customerRender = ({ item, index }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() =>
          navigation.navigate('EditCustomer', {
            prefilledData: {
              name: item.customer_name,
              customer_id: item.customer_id,
              email: item.customer_email,
              phone: item.customer_phone,
              address: item.customer_address,
            },
          })
        }>
        <ContactCard
          clientName={item.customer_name}
          bottomLeft={item.customer_email}
          topRight={item.customer_phone}
        />
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.topButton}>
        <ButtonOutline
          onPress={() => navigation.navigate('CreateCustomer')}
          text="Add a customer"
        />
      </View>
      <View style={styles.savedView}>
        <Text style={styles.savedText}>Customers</Text>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() =>
            navigation.navigate('DashboardSearch', {
              data: customers,
              renderItem: customerRender,
              filterMethod: filterMethod,
            })
          }>
          <View style={styles.searchIcon}>
            <Icon name="search" size={25} color={colors.PRIMARY_PURPLE} />
          </View>
        </TouchableOpacity>
      </View>
      {isLoading ? (
        <ActivityIndicator color={colors.PRIMARY_PINK} size="large" />
      ) : (
        <FlatList
          data={customers}
          renderItem={customerRender}
          keyExtractor={(item, index) => item + index}
          ListEmptyComponent={
            <Text style={styles.listEmpytText}>No Customers to display</Text>
          }
        />
      )}
    </View>
  );
};

export default withNavigation(CustomersView);
