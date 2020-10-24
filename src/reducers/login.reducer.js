import * as actionTypes from '../types/registeredBusiness.types';

const login = (state = {}, action) => {
  return {
    error: error(state.error, action),
    loading: loading(state.loading, action),
  };
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

export default login;
