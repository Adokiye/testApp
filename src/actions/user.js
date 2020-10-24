import * as actionTypes from '../types/user';
import {UserRequest as request} from '../api/index';

export const getUserInfo = profile => {
  return {
    type: actionTypes.FETCH_USER_PROFILE,
    profile,
  };
};

export const requestLoading = () => {
  return {
    type: actionTypes.LOAD_START,
  };
};

export const fetchUserProfile = () => async dispatch => {
  dispatch(requestLoading());
  const result = await request.fetchUserProfile();
  if (!result.error) {
    dispatch(getUserInfo(result));
  }
  return result;
};
