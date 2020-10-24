import { createStackNavigator } from 'react-navigation-stack';
import { fromRight } from 'react-navigation-transitions';
import Transfers from '../Screens/Transfers';
import NewTransfer from '../Screens/Transfers/NewTransfer/NewTransfer';
import SuccessTransfer from '../Screens/Transfers/SuccessTransfer';
import EnterPin from '../Screens/EnterPin';
import DashboardSearch from '../components/Search/DashboardSearch';
import TransactionSuccess from '../Screens/TransactionSuccess';

const TransferStack = createStackNavigator(
  {
    Transfer: Transfers,
    NewTransfer: NewTransfer,
    SuccessTransfer: SuccessTransfer,
    DashboardSearch: DashboardSearch,
  },
  {
    headerMode: 'none',
    initialRouteName: 'Transfer',
    transitionConfig: () => fromRight(),
  },
);

const TransferWithPin = createStackNavigator(
  {
    Transfer: TransferStack,
    EnterPin: EnterPin,
    TransactionSuccess: TransactionSuccess,
  },
  {
    mode: 'modal',
    headerMode: 'none',
    navigationOptions: ({ navigation }) => {
      const routeName =
        navigation.state.routes[navigation.state.index].routeName;
      let tabBarVisible = true;

      if (routeName === 'EnterPin' || routeName === 'TransactionSuccess') {
        tabBarVisible = false;
      }
      return { tabBarVisible };
    },
  },
);

export default TransferWithPin;
