import { combineReducers } from 'redux';
import login from './login.reducer';
import transfers from './transfers.reducer';
import profile from './profile';
import registeredAccountCreation from './registeredBusiness.reducer';
import unregisteredAccountCreation from './unregisteredBusiness.reducer';
import states from './states.reducer';
import rootReducer from './tabbar.reducer.js';
import summary from './sample.reducer';
import subAccountTransactions from './transaction.reducer';
import app from './app';
import invoiceReducer from './invoice';
import customerReducer from './customer';
import teamReducer from './team';
import userReducer from './user';
import accountReducer from './account';

export default function getRootReducer(navigationReducer) {
  return combineReducers({
    account: accountReducer,
    registeredAccountCreation,
    unregisteredAccountCreation,
    states,
    login,
    app,
    rootReducer,
    summary,
    transfers,
    profile,
    subAccountTransactions,
    navigation: navigationReducer,
    invoice: invoiceReducer,
    customer: customerReducer,
    team: teamReducer,
    user: userReducer,
  });
}
