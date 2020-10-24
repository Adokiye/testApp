import React from 'react';
import {
  Text,
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

import styles from './styles';
import UserMenuIcon from '../../components/UserMenuIcon';

const AmMenu = ({ navigation }) => {
  const MenuItem = ({ text, navigateTo = '' }) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate(navigateTo)}
        activeOpacity={0.6}
        style={styles.menuItem}>
        <Text style={styles.menuText}>{text}</Text>
        <FontAwesomeIcon style={styles.icon} icon={faChevronRight} size={18} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={styles.header}>
          <UserMenuIcon />
        </View>
      </SafeAreaView>
      <View style={styles.textView}>
        <Text style={styles.welcomeText}>My Account</Text>
      </View>

      <ScrollView style={styles.backWhite}>
        <View>
          <MenuItem text="Accounts" navigateTo="AmAccounts" />
          <MenuItem text="Statements" navigateTo="AmStatements" />
          <MenuItem text="Teams" navigateTo="AmTeams" />
          <MenuItem text="Account splitting" navigateTo="AmAccountSplitting" />
          <MenuItem text="My Profile" navigateTo="Profile" />
          <MenuItem text="Upgrade Plan" navigateTo="AmUpgradePlan" />
        </View>
      </ScrollView>
    </View>
  );
};

export default AmMenu;
