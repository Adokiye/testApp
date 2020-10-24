import * as actionTypes from '../types/account';

const initialState = {
  isLoading: false,
  businessAccounts: [],
  selectedBusinessAccount: {},
  inflowOutflow: {},
  walletTransactions: {
    // walletId: walletTransactions[...],
  },
  walletInflowOutflow: {
    // walletId: {...}
  },
};

const prepareWalletTransaction = (currentTransactions, newTransactions) => {
  return {
    ...currentTransactions,
    ...newTransactions,
  };
};

const accountReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_BUSINESS_ACCOUNTS:
      return {
        ...state,
        isLoading: false,
        businessAccounts: action.data,
      };
    case actionTypes.UPDATE_SELECTED_BUSINESS_ACCOUNT:
      return {
        ...state,
        isLoading: false,
        selectedBusinessAccount: action.data,
      };
    case actionTypes.UPDATE_WALLET_ALLOCATION:
    //console.log(action.data)
      return {
        ...state,
        isLoading: false,
        businessAccounts: action.data,
      };
      case actionTypes.GET_STATEMENTS:
      return {
        ...state,
        isLoading: false,
      };
     case actionTypes.CHANGE_PLAN:
      return {
        ...state,
        isLoading: false,
      }; 
    case actionTypes.GET_INFLOW_OUTFLOW:
      return {
        ...state,
        isLoading: false,
        inflowOutflow: action.data,
      };
    case actionTypes.GET_WALLET_INFLOW_OUTFLOW:
      return {
        ...state,
        isLoading: false,
        walletInflowOutflow: {
          ...state.walletInflowOutflow,
          ...action.data,
        },
      };
    case actionTypes.GET_WALLET_TRANSACTIONS:
      return {
        ...state,
        isLoading: false,
        walletTransactions: prepareWalletTransaction(
          state.walletTransactions,
          action.data,
        ),
      };
    case actionTypes.LOAD_START:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.LOAD_END:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default accountReducer;
