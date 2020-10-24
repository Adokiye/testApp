import { createStackNavigator } from 'react-navigation-stack';
import { fromRight } from 'react-navigation-transitions';
import AmMenu from '../Screens/AmMenu';
import AmStatements from '../Screens/AmStatements';
import AmUpgradePlan from '../Screens/AmUpgradePlan';
import AmTeams from '../Screens/AmTeams';
import AmAccounts from '../Screens/AmAccounts';
import AmAccountSplitting from '../Screens/AmAccountSplitting';
import CreateTeamMember from '../Screens/CreateTeamMember';
import Profile from '../Screens/Profile';

const MoreStack = createStackNavigator(
  {
    AmMenu: AmMenu,
    AmStatements: AmStatements,
    AmTeams: AmTeams,
    AmAccounts: AmAccounts,
    AmAccountSplitting: AmAccountSplitting,
    CreateTeamMember: CreateTeamMember,
    AmUpgradePlan: AmUpgradePlan,
    Profile: Profile,
  },
  {
    headerMode: 'none',
    initialRouteName: 'AmMenu',
    transitionConfig: () => fromRight(),
  },
);

export default MoreStack;
