import * as actionTypes from '../types/transfers';

const first_step_data = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.LOAD_FIRST_STEP_RECEIVED:
      return action.data;
    default:
      return state;
  }
};

const initialState = {
  isLoading: false,
  beneficiaries: [],
  pendingTransfers: [],
  listedBanks: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOAD_BENEFICIARY_RECEIVED:
      return {
        ...state,
        beneficiaries: action.data,
      };
    case actionTypes.LOAD_PENDING_RECEIVED:
      return {
        ...state,
        pendingTransfers: action.data,
      };
    case actionTypes.LOAD_LISTED_BANKS_RECEIVED:
      return {
        ...state,
        listedBanks: action.data,
      };
    default:
      return state;
  }
};
