import { getTabBarIcon } from '../components/AppTabBar';
import InvoiceStack from './invoice';
import MoreStack from './more';
import TransferStack from './transfer';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import colors from '../helpers/colors';
import AccountStack from './account';
import {
  tabBarStyle,
  tabStyle,
  labelStyle,
} from '../components/AppTabBar/styles';

const TabRouter = createBottomTabNavigator(
  {
    Accounts: AccountStack,
    Transfer: TransferStack,
    Invoice: InvoiceStack,
    More: MoreStack,
  },
  {
    initialRouteName: 'Accounts',
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) =>
        getTabBarIcon(navigation, focused, tintColor),
    }),
    tabBarOptions: {
      activeTintColor: colors.PRIMARY_PINK,
      inactiveTintColor: colors.DEEP_GREY_01,
      style: tabBarStyle,
      tabStyle,
      labelStyle,
    },
  },
);

export default TabRouter;
