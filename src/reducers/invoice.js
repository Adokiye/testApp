import * as actionTypes from '../types/invoice';

const initialState = {
  isLoading: false,
  invoices: [],
};

const invoiceReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_INVOICES:
      return {
        ...state,
        isLoading: false,
        invoices: action.invoices,
      };
    case actionTypes.ADD_INVOICE:
      return {
        ...state,
        isLoading: false,
        invoices: [...state.invoices, action.invoices], // refactor to avoid repetition
      };
    case actionTypes.CREATE_INVOICE:
      return {
        ...state,
        isLoading: false,
      };
    case actionTypes.LOAD_START:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.LOAD_ERROR:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default invoiceReducer;
