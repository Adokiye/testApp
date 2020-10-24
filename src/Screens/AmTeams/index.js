import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  RefreshControl,
  FlatList,
  ActivityIndicator,
  Platform,
  Picker,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import styles from './styles';
import BackButton from '../../components/Buttons/BackButton';
import ButtonOutline from '../../components/Buttons/buttonOutline';
import ContactCard from '../../components/ContactCard';
import { fetchTeamMembers, removeTeamMember } from '../../actions/team';
import Modal from 'react-native-modal';
import { getRole } from '../../helpers/libs';
import colors from '../../helpers/colors';
import { CustomText } from '../../components/Text';
import Alert from '../../components/Alert/alert';
import Loader from '../../components/Loading/overlayLoader';

class AmTeams extends Component {
  state = {
    teams: [],
    refreshing: false,
    isOptionSelectorOpen: false,
    isLoading: false,
    error: false,
    selected_id: false,
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    await this.props.fetchTeamMembers();
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

  filterMethod = (data, searchText) => {
    const result = data.filter(item => {
      let name = item.first_name + ' ' + item.last_name;
      return name.toUpperCase().includes(searchText.toUpperCase());
    });
    return result;
  };

  openOptionSelector = id => {
    this.setState({ selected_id: id }, () => {
      this.setState({ isOptionSelectorOpen: true });
    });
  };

  completeOptionSelection = () => {
    this.setState(
      {
        isOptionSelectorOpen: false,
      },
      () => {
        this.delete(this.state.selected_id);
      },
    );
  };

  delete = async id => {
    this.setState({
      isLoading: true,
    });
    const response = await this.props.removeTeamMember({
      biz_member_id: id,
    });
    //
    if (response.error) {
      this.setState({
        error: response.error.message,
        isLoading: false,
      });
      return;
    }
    this.setState({
      isLoading: false,
    });
    this.props.navigation.navigate('AmMenu');
    //  await this.onRefresh();
  };

  async componentDidUpdate() {
    const { params } = this.props.navigation.state;
    if (params && params.menu) {
      params.menu = false;
      this.setState({ selected_id: params.id }, () => {
        this.setState({ isOptionSelectorOpen: true });
      });
    }
    if(params && params.refresh){
      params.refresh = false;
      await this.onRefresh();
    }
  }

  render() {
    const { isTeamLoading, teams } = this.props;

    const { refreshing, error, isLoading, isOptionSelectorOpen } = this.state;
    const teamRender = ({ item, index }) => {
      return (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => this.openOptionSelector(item.biz_member_id)}>
          <ContactCard
            clientName={item.first_name + ' ' + item.last_name}
            bottomLeft={getRole(item.user_type)}
            topRight={item.rep_phone}
            bottomRight={item.rep_email}
          />
        </TouchableOpacity>
      );
    };
    const searchTeamRender = ({ item, index }) => {
      return (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() =>
            this.props.navigation.navigate('AmTeams', {
              menu: true,
              id: item.biz_member_id,
            })
          }>
          <ContactCard
            clientName={item.first_name + ' ' + item.last_name}
            bottomLeft={getRole(item.user_type)}
            topRight={item.rep_phone}
            bottomRight={item.rep_email}
          />
        </TouchableOpacity>
      );
    };

    return (
      <View style={styles.container}>
        <Alert status="danger" message={error} />
        <SafeAreaView>
          <View style={styles.header}>
            <BackButton />
            <Text style={styles.screenTitle}>Teams</Text>
          </View>
        </SafeAreaView>
        <ScrollView
          style={styles.backWhite}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={this.onRefresh}
            />
          }>
          <View style={styles.mainContent}>
            <View style={styles.actionButton}>
              <ButtonOutline
                text="Add a team member"
                onPress={
                  () => this.props.navigation.navigate('CreateTeamMember')
                  //       console.log("nav")
                }
              />
            </View>
            <View style={styles.savedView}>
              <Text style={styles.savedText}>Team Members</Text>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() =>
                  this.props.navigation.navigate('DashboardSearch', {
                    data: teams,
                    renderItem: searchTeamRender,
                    filterMethod: this.filterMethod,
                  })
                }>
                <View style={styles.searchIcon}>
                  <Icon name="search" size={25} color={colors.PRIMARY_PURPLE} />
                </View>
              </TouchableOpacity>
            </View>
            <View>
              {isTeamLoading ? (
                <ActivityIndicator color={colors.PRIMARY_PINK} size="large" />
              ) : (
                <FlatList
                  data={teams}
                  renderItem={teamRender}
                  keyExtractor={(item, index) => item + index}
                  ListEmptyComponent={
                    <Text style={styles.listEmpytText}>
                      No Team Members to display
                    </Text>
                  }
                />
              )}
            </View>
            <Modal
              isVisible={isOptionSelectorOpen}
              style={styles.selector}
              onBackdropPress={() =>
                this.setState({ isOptionSelectorOpen: false })
              }>
              <SafeAreaView style={styles.bankPicker}>
                <TouchableOpacity
                  onPress={this.completeOptionSelection}
                  style={styles.selectorClose}>
                  <CustomText style={styles.selectorDoneText}>
                    Remove
                  </CustomText>
                </TouchableOpacity>
              </SafeAreaView>
            </Modal>
          </View>
        </ScrollView>
        {/* {isLoading ? <Loader loader={isLoading} /> : null} */}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    isTeamLoading: state.team.isLoading,
    teams: state.team.teams,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchTeamMembers: data => {
      return dispatch(fetchTeamMembers(data));
    },
    removeTeamMember: data => {
      return dispatch(removeTeamMember(data));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AmTeams);
