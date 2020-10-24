import * as actionTypes from '../types/app';

const loading = (state = true, action) => {
  switch (action.type) {
    case actionTypes.LOAD_START:
      return true;
    case actionTypes.LOAD_END:
      return false;
    default:
      return state;
  }
};

const error = (state = false, action) => {
  switch (action.type) {
    case actionTypes.LOAD_ERROR:
      return action.error;
    case actionTypes.CLEAR_ERROR:
      return false;
    default:
      return state;
  }
};

const user_stats = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_USER_STATS:
      return action.data;
    default:
      return state;
  }
};

const profile = (state = {}, action) => {
  console.log("jjjj"+JSON.stringify(state.profile_data))
  return {
    loading: profile_loading(state.loading, action),
    data: profile_data(state.profile_data, action),
  };
};

const profile_loading = (state = true, action) => {
  switch (action.type) {
    case actionTypes.LOAD_PROFILE_REQUEST:
      return true;
    case actionTypes.LOAD_PROFILE_RECIEVED:
      return false;
    default:
      return state;
  }
};

const profile_data = (state = {}, action) => { 
  //  console.log("\n"+"\n"+"\n"+"t    "+"-->"+JSON.stringify(action.data)+"\n"+"\n"+"\n")
  switch (action.type) {
    case actionTypes.LOAD_PROFILE_RECIEVED:   
      return action.data;
    default:
      return state;
  }
};

const businessAcccounts_loading = (state = true, action) => {
  switch (action.type) {
    case actionTypes.LOAD_BUSINESS_ACCOUNTS_REQUEST:
      return true;
    case actionTypes.LOAD_BUSINESS_ACCOUNTS_RECEIVED:
      return false;
    default:
      return state;
  }
};

const businessAccounts_data = (state = [], action) => {
  switch (action.type) {
    case actionTypes.LOAD_BUSINESS_ACCOUNTS_RECEIVED:
      return action.data;
    default:
      return state;
  }
};

const businessAcccounts = (state = {}, action) => {
  return {
    loading: businessAcccounts_loading(state.loading, action),
    data: businessAccounts_data(state.data, action),
  };
};

const selectedBusinessAccount = (state = false, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_SELECTED_BUSINESS_ACCOUNT:
      return action.data;
    default:
      return state;
  }
};

const adminBusinessAcccount_loading = (state = true, action) => {
  switch (action.type) {
    case actionTypes.LOAD_ADMIN_ACCOUNT_REQUEST:
      return true;
    case actionTypes.LOAD_ADMIN_ACCOUNT_RECEIVED:
      return false;
    default:
      return state;
  }
};

const adminBusinessAccount_data = (state = [], action) => {
  switch (action.type) {
    case actionTypes.LOAD_ADMIN_ACCOUNT_RECEIVED:
      return action.data;
    default:
      return state;
  }
};

const adminBusinessAcccount = (state = {}, action) => {
  return {
    loading: adminBusinessAcccount_loading(state.loading, action),
    data: adminBusinessAccount_data(state.data, action),
  };
};

export default (state = {}, action) => {
  return {
    loading: loading(state.loading, action),
    error: error(state.error, action),
    user_stats: user_stats(state.user_stats, action),
    profile_: profile_data(state.profile_data, action),
    businessAcccounts: businessAcccounts(state.businessAccounts, action),
    selectedBusinessAccount: selectedBusinessAccount(
      state.selectedBusinessAccount,
      action,
    ),
    adminBusinessAcccount: adminBusinessAcccount(
      state.adminBusinessAcccount,
      action,
    ),
  };
};
