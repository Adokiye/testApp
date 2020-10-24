import * as actionTypes from '../types/transactions';
import CONFIG from '../config';

const loadStart = () => {
  return {
    type: actionTypes.LOAD_START,
  };
};

const loadError = error => {
  return {
    type: actionTypes.LOAD_ERROR,
    error,
  };
};

const loadEnd = () => {
  return {
    type: actionTypes.LOAD_END,
  };
};

const clearError = () => {
  return {
    type: actionTypes.CLEAR_ERROR,
  };
};
