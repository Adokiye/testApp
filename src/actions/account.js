import * as actionTypes from '../types/account';
import { AccountRequest } from '../api/index';
import { retrieveUserData } from '../helpers/libs';
import { storeUserLoginData } from '../helpers/auth';
import AsyncStorage from '@react-native-community/async-storage';

const loadStart = () => {
  return {
    type: actionTypes.LOAD_START,
  };
};

const loadEnd = () => {
  return {
    type: actionTypes.LOAD_END,
  };
};

const loadError = error => {
  return {
    type: actionTypes.LOAD_ERROR,
    error,
  };
};

const businessAccountsLoaded = data => {
  return {
    type: actionTypes.GET_BUSINESS_ACCOUNTS,
    data,
  };
};

const updateSelectedBusinessAccount = data => {
  return {
    type: actionTypes.UPDATE_SELECTED_BUSINESS_ACCOUNT,
    data,
  };
};

const updateWalletAllocation = data => {
  return {
    type: actionTypes.UPDATE_WALLET_ALLOCATION,
    data,
  };
};

const inflowOutflowLoaded = data => {
  return {
    type: actionTypes.GET_INFLOW_OUTFLOW,
    data,
  };
};

const walletInflowOutflowLoaded = data => {
  return {
    type: actionTypes.GET_WALLET_INFLOW_OUTFLOW,
    data,
  };
};

export const walletTransactionsLoaded = data => {
  return {
    type: actionTypes.GET_WALLET_TRANSACTIONS,
    data,
  };
};

export const getStatement = statement => {
  return {
    type: actionTypes.GET_STATEMENTS,
    statement,
  };
};

export const changeAPlan = plan => {
  return {
    type: actionTypes.CHANGE_PLAN,
    plan,
  };
};

export const selectBusinessAccount = (account, userData) => async dispatch => {
  dispatch(updateSelectedBusinessAccount(account));

  if (!userData) {
    userData = await retrieveUserData();
  }
  userData.biz_account_id = account.biz_account_id;
  await storeUserLoginData(userData);
};

export const getBusinessAccounts = () => async dispatch => {
  dispatch(loadStart());
  const response = await AccountRequest.getBusinessAccounts();

  if (response.error) {
    dispatch(loadError(response.error.message));
    return response;
  }

  // in the case where data = null
  const accounts = response.data || [];
  dispatch(businessAccountsLoaded(accounts));

  const userData = await retrieveUserData();
  const approvedAccounts = accounts.filter(
    account => account.biz_status === 'approved',
  );
  if (!userData.biz_account_id) {
    selectBusinessAccount(approvedAccounts[0], userData)(dispatch);
  } else {
    // in the case where selected business account id is present in async storage
    // but no selected business account in redux store
    // NOTE: business account id should be stored in async storage for account switching
    const selectedAccount =
      accounts.find(item => item.biz_account_id === userData.biz_account_id) ||
      approvedAccounts[0];
    selectedAccount &&
      (await selectBusinessAccount(selectedAccount, userData)(dispatch));
  }
  dispatch(loadEnd());
};

export const getInflowOutflow = () => async dispatch => {
  dispatch(loadStart());
  const response = await AccountRequest.getInflowOutflow();

  if (response.error) {
    return dispatch(loadError(response.error.message));
  }
  const inflowOutflow = {
    inflow: response.inflow,
    outflow: response.outflow,
  };
  dispatch(inflowOutflowLoaded(inflowOutflow));
};

export const updateWallet = data => async dispatch => {
  console.log(JSON.stringify(data));
  dispatch(loadStart());
  const result = await AccountRequest.updateWalletAllocation(data);

  console.log(JSON.stringify(result));
  if (result.error) {
    return result;
  }
  delete result.message;
  delete result.status_code;
  delete result.status;
  // console.log(JSON.stringify(result))
  dispatch(updateWalletAllocation(result));
  return result;
};

export const getWalletInflowOutflow = walletId => async dispatch => {
  dispatch(loadStart());
  const response = await AccountRequest.getWalletInflowOutflow(walletId);
  if (response.error) {
    return dispatch(loadError(response.error.message));
  }
  const inflowOutflow = {
    inflow: response.inflow,
    outflow: response.outflow,
  };
  dispatch(walletInflowOutflowLoaded({ [walletId]: inflowOutflow }));
};

export const getStatements = data => async dispatch => {
  dispatch(loadStart());
  const response = await AccountRequest.getStatements(data);
  if (response) {
    if (response.error) {
      return response;
    }
    delete response.message;
    delete response.status_code;
    delete response.status;

    dispatch(getStatement(response));
    return response;
  } else {
    return true;
  }
};

export const changePlan = data => async dispatch => {
  dispatch(loadStart());
  const response = await AccountRequest.changePlan(data);
  if (response.error) {
    return response;
  }
  delete response.message;
  delete response.status_code;
  delete response.status;

  dispatch(changeAPlan(response));
  return response;
};

export const fetchWalletTransactions = walletId => async dispatch => {
  dispatch(loadStart());
  const response = await AccountRequest.fetchWalletTransactions(walletId);
  const transactions = {
    [walletId]: response.data,
  };
  if (!response.error) {
    dispatch(walletTransactionsLoaded(transactions));
  }
};

export const grantAccessWithPin = pin => async dispatch => {
  dispatch(loadStart());
  const userInfo = await AsyncStorage.getItem('user_stats');
  const payload = {
    access_code: pin,
    rep_email: JSON.parse(userInfo).email,
  };
  const response = await AccountRequest.grantAccessWithPin(payload);
  if (response.error) {
    return response;
  }
  await storeUserLoginData({ token: response.token });
  return response;
};
