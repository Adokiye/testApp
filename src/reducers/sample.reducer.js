import * as actionTypes from '../types/summary';
const handleSampleCreation = (
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
    data: prospaSampledata(state.data.ProspaSample, action),
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

const prospaSampledata = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.LOAD_SAMPLE_RECEIVED:
      return action.data;
    default:
      return state;
  }
};

export default handleSampleCreation;
