import * as actionTypes from '../types/login';
import { AuthRequest, resetRequest } from '../api/index';
import { storeUserLoginData } from '../helpers/auth';
import { getBusinessAccounts } from './account';

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

export const handleLogin = data => async dispatch => {
  dispatch(loadStart());
  dispatch(clearError());

  const required = ['email', 'password'];
  let isValid = true;

  // abstract validation during refactoring
  for (let i = 0; i < required.length; i++) {
    if (data[required[i]] === '') {
      isValid = false;
      return { error: { message: `Please enter ${required[i]}` } };
    } else {
      continue;
    }
  }

  const payload = {
    username: data.email,
    password: data.password,
  };
  const response = await AuthRequest.login(payload);

  if (response.error) {
    return response;
  }

  await storeUserLoginData(response);
  await getBusinessAccounts()(dispatch);
  dispatch(loadEnd());
  return response;
};
