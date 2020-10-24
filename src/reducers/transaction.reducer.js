import * as actionTypes from '../types/transactions';

const subAccountTransactions = (
  state = {
    loading: false,
    error: false,
    data: '',
  },
  action,
) => {
  return {
    loading: loading(state.loading, action),
    error: error(state.error, action),
    data: transactions(state.data.transactions, action),
  };
};

const loading = (state = false, action) => {
  switch (action.type) {
    case actionTypes.LOAD_START:
      return true;
    case actionTypes.LOAD_END:
      return false;
    case actionTypes.LOAD_ERROR:
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

const transactions = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.LOAD_TRANSACTION_RECEIVED:
      return action.data;
      console.log("\n"+"\n"+"\n"+"\n"+"\n"+"\n"+
      JSON.stringify(action.data)+"\n"+"\n"+"\n"+"\n"+"\n"+"\n")
    default:
      return state;
  }
};

export default subAccountTransactions;
