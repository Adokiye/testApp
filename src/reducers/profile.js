import * as actionTypes from '../types/profile';

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

export default (state = {}, action) => {
  return {
    loading: loading(state.loading, action),
    error: error(state.error, action),
  };
};
