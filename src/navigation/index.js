import { createSwitchNavigator } from 'react-navigation';
import {
  createReduxContainer,
  createReactNavigationReduxMiddleware,
  createNavigationReducer,
} from 'react-navigation-redux-helpers';
import LoadingScreen from '../components/Loading/loadingScreen';
import Welcome from '../Screens/Welcome/index';
import AuthenticationStack from './auth';
import TabNavigator from './tabNavigator';
import { connect } from 'react-redux';

export const RootNavigator = createSwitchNavigator(
  {
    LoadingScreen: LoadingScreen,
    Welcome: Welcome,
    Auth: AuthenticationStack,
    // App: DashboardStack,
    Dashboard: TabNavigator,
    // AutoCompleteAddress: AutoCompleteAddress,
  },
  {
    initialRouteName: 'LoadingScreen',
  },
);

//create react navigation middleware
export const navigationMiddleware = createReactNavigationReduxMiddleware(
  state => state.navigation,
);
//create navigation middleware
export const navigationReducer = createNavigationReducer(RootNavigator);

const App = createReduxContainer(RootNavigator);

const mapStateToProps = ({ navigation }) => {
  return {
    state: navigation,
  };
};

export default connect(mapStateToProps)(App);
