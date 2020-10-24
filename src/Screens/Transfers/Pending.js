import React, { Component } from 'react';
import {
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';

import { getPendingTransfers } from '../../actions/transfers.action';
import { connect } from 'react-redux';
import styles from './styles/styles.transfers';
import ContactCard from '../../components/ContactCard';
import { numToMoneyString } from '../../helpers/thousandSeparator';

class Pending extends Component {
  state = {
    isLoading: true,
  };

  async componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    await this.props.getPendingTransfers();
    this.setState({
      isLoading: false,
    });
  };

  render() {
    const { isLoading } = this.state;
    const { pendingTransfers } = this.props;

    return (
      <ScrollView>
        {isLoading ? (
          <ActivityIndicator style={styles.mainLoader} size="large" />
        ) : (
          <FlatList
            bounces={false}
            data={pendingTransfers}
            extraData={this.props}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() =>
                  this.props.navigation.navigate('PendingDetails', item)
                }>
                <ContactCard
                  clientName={item.recipient_account_name}
                  bottomLeft={item.transfer_note}
                  topRight={numToMoneyString(item.amount)}
                  avatarColor="#FA4A84"
                  avatarTextColor="#fff"
                  style={styles.beneficiaryCard}
                />
              </TouchableOpacity>
            )}
            ListEmptyComponent={
              <Text style={styles.emptyListText}>No pending transfers</Text>
            }
            keyExtractor={(item, index) => `list-item-${index}`}
          />
        )}
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  const {
    transfers: { pendingTransfers },
  } = state;

  return {
    pendingTransfers,
  };
};

const mapDispatchToProps = {
  getPendingTransfers,
};

export default connect(mapStateToProps, mapDispatchToProps)(Pending);
