import { createStackNavigator } from 'react-navigation-stack';
import AccountDetails from '../Screens/Accounts/AccountDetails';
import PendingDetails from '../components/Details/PendingDetails';
import TransactionDetails from '../Screens/Accounts/TransactionDetails';
import DashboardSearch from '../components/Search/DashboardSearch';
import { fromRight } from 'react-navigation-transitions';
import Accounts from '../Screens/Accounts';

const accountDetailsStack = createStackNavigator(
  {
    AccountDetails: AccountDetails,
    TransactionDetails: TransactionDetails,
  },
  {
    mode: 'modal',
    headerMode: 'none',
  },
);

const AccountStack = createStackNavigator(
  {
    Accounts: Accounts,
    AccountDetails: accountDetailsStack,
    PendingDetails: PendingDetails,
    DashboardSearch: DashboardSearch,
  },
  {
    headerMode: 'none',
    initialRouteName: 'Accounts',
    transitionConfig: () => fromRight(),
  },
);

export default AccountStack;
