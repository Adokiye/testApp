import * as actionTypes from '../types/registeredBusiness.types';

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
    case actionTypes.LOAD_CATEGORIES_ERROR:
      return action.error;
    default:
      return state;
  }
};

const data = (state = {}, action) => {
  return {
    step1_data: step1_data(state.step1_data, action),
    step2_data: step2_data(state.step2_data, action),
    step3_data: step3_data(state.step3_data, action),
  };
};

const step1_data = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_STEP1_DATA:
      return Object.assign({}, state, action.data);
    default:
      return state;
  }
};

const step2_data = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_STEP2_DATA:
      return Object.assign({}, state, action.data);
    default:
      return state;
  }
};

const step3_data = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_STEP3_DATA:
      return Object.assign({}, state, action.data);
    default:
      return state;
  }
};

const categories = (state = {}, action) => {
  return {
    loading: categoriesLoading(state.loading, action),
    data: categories_data(state.data, action),
  };
};

const categoriesLoading = (state = false, action) => {
  switch (action.type) {
    case actionTypes.LOAD_CATEGORIES_REQUEST:
      return true;
    case actionTypes.LOAD_CATEGORIES_SUCCESS:
      return false;
    default:
      return state;
  }
};

const categories_data = (state = [], action) => {
  switch (action.type) {
    case actionTypes.LOAD_CATEGORIES_SUCCESS:
      return action.data;
    default:
      return state;
  }
};

const registeredAccountCreation = (
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
    data: data(state.data, action),
    categories: categories(state.categories, action),
  };
};

export default registeredAccountCreation;
