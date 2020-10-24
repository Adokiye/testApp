import * as actionTypes from '../types/unregisteredBusiness.types';

const unregisteredAccountCreation = (
  state = {
    loading: false,
    error: false,
    data: {},
    categories: {},
  },
  action,
) => {
  return {
    loading: loading(state.loading, action),
    error: error(state.error, action),
    categories: categories(state.categories, action),
    data: {
      step1Data: step1Data(state.data.step1Data, action),
      step2Data: step2Data(state.data.step2Data, action),
    },
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
    case actionTypes.LOAD_CATEGORIES_ERROR:
      return action.error;
    case actionTypes.CLEAR_ERROR:
      return false;
    default:
      return state;
  }
};

const categories = (state = {}, action) => {
  return {
    loading: categories_loading(state.loading, action),
    data: categories_data(state.data, action),
  };
};

const categories_loading = (state = false, action) => {
  switch (action.type) {
    case actionTypes.LOAD_CATEGORIES_REQUEST:
      return true;
    case actionTypes.LOAD_CATEGORIES_RECEIVED:
      return false;
    default:
      return state;
  }
};

const categories_data = (state = [], action) => {
  switch (action.type) {
    case actionTypes.LOAD_CATEGORIES_RECEIVED:
      return action.data;
    default:
      return state;
  }
};

const step1Data = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_STEP1_DATA:
      return action.data;
    default:
      return state;
  }
};

const step2Data = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_STEP2_DATA:
      return action.data;
    default:
      return state;
  }
};

export default unregisteredAccountCreation;
