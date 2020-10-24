import { createStackNavigator } from 'react-navigation-stack';
import { fromRight } from 'react-navigation-transitions';

import TabRouter from './tabNavigator';
import PendingDetails from '../components/Details/PendingDetails';
import TransactionDetails from '../components/Details/TransactionDetails';
import DashboardSearch from '../components/Search/DashboardSearch';

const DashboardStack = createStackNavigator(
  {
    Dashboard: TabRouter,
    PendingDetails: PendingDetails,
    TransactionDetails: TransactionDetails,
    DashboardSearch: DashboardSearch,
  },
  {
    headerMode: 'none',
    initialRouteName: 'Dashboard',
    transitionConfig: () => fromRight(),
  },
);

export default DashboardStack;
