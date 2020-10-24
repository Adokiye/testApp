import * as actionTypes from '../types/customer';

const initialState = {
  isLoading: false,
  customers: [],
};

const customerReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_CUSTOMERS:
      return {
        ...state,
        isLoading: false,
        customers: action.customers,
      };
    case actionTypes.CREATE_CUSTOMER:
      return {
        ...state,
        isLoading: false,
        customers: [...state.customers, action.customer],
      };
    case actionTypes.EDIT_CUSTOMER:
      return {
        ...state,
        isLoading: false,
        customers: action.customers,
      };
    case actionTypes.LOAD_START:
      return {
        ...state,
        isLoading: true,
      };
    default:
      return state;
  }
};

export default customerReducer;
