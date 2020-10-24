import * as actionTypes from '../types/app';
import AsyncStorage from '@react-native-community/async-storage';
import { NavigationActions } from 'react-navigation';

import { resetRequest } from '../api/index';
import CONFIG from '../../src/config';

const updateUserStats = data => {
  return {
    type: actionTypes.UPDATE_USER_STATS,
    data,
  };
};

const loadStart = () => {
  return {
    type: actionTypes.LOAD_START,
  };
};

const loadEnd = () => {
  return {
    type: actionTypes.LOAD_END,
  };
};

const loadError = error => {
  return {
    type: actionTypes.LOAD_ERROR,
    error,
  };
};

const networkLoadError = () => {
  return {
    type: actionTypes.LOAD_ERROR,
    error:
      'Something went wrong. Please check your internet connection and try again',
  };
};

const loadProfileRequest = () => {
  return {
    type: actionTypes.LOAD_PROFILE_REQUEST,
  };
};

const clearError = () => {
  return {
    type: actionTypes.CLEAR_ERROR,
  };
};

const loadProfileReceived = data => {
  console.log(
    '\n' +
      '\n' +
      '\n' +
      '\n' +
      '\n' +
      '\n' +
      '\n' +
      'jjjjjjjlkllkllk------->' +
      JSON.stringify(data) +
      '\n' +
      '\n' +
      '\n' +
      '\n' +
      '\n' +
      '\n' +
      '\n' +
      '\n' +
      '\n' +
      '\n' +
      '\n' +
      '\n' +
      '\n' +
      '\n' +
      '\n',
  );
  return {
    type: actionTypes.LOAD_PROFILE_RECIEVED,
    data,
  };
};

export const loadAdminAccountReceived = data => {
  return {
    type: actionTypes.LOAD_ADMIN_ACCOUNT_RECEIVED,
    data,
  };
};

export const loadAdminAccountsRequest = () => {
  return {
    type: actionTypes.LOAD_ADMIN_ACCOUNT_REQUEST,
  };
};

export const storeUserStats = data => async dispatch => {
  await AsyncStorage.setItem('user_stats', JSON.stringify(data));
  await resetRequest();
  return dispatch(updateUserStats(data));
};

const logout = () => {
  return (dispatch, getState) => {
    //get user_stats from state and update loggedIn
    let user_stats = Object.assign({}, getState().app.user_stats, {
      loggedIn: false,
    });
    const { user_type } = getState().app.user_stats;
    //update state and loca storage
    dispatch(storeUserStats(user_stats)).then(() => {
      //route to pin login page
      if (user_type === 'ecosystem') {
        dispatch(NavigationActions.navigate({ routeName: 'PinLogin' }));
      } else {
        dispatch(NavigationActions.navigate({ routeName: 'Login' }));
      }
    });
  };
};

export const getProfile = token => {
  return async dispatch => {
    dispatch(clearError());
    dispatch(loadProfileRequest());

    try {
      const response = await fetch(
        CONFIG.BASE_URL + '/account/my_prospa_profile/',
        {
          method: 'GET',
          headers: {
            Authorization: 'Token ' + token,
          },
        },
      );

      if (response.status === 200 || response.status === 201) {
        response.json().then(res => {
          // console.log("\n"+"\n"+"\n"+"\n"+"\n"+"\n"+"\n"+JSON.stringify(res.data)+"\n"+"\n"+"\n"+"\n"+"\n"+"\n"+"\n"+"\n"+"\n"+"\n"+"\n"+"\n"+"\n"+"\n"+"\n")
          dispatch(loadEnd());
          dispatch(loadProfileReceived(res.data));
        });
      }
      if (response.status === 400) {
        response.json().then(res => {
          dispatch(loadError(res.message));
          dispatch(clearError());
          // reject('retry');
        });
      }

      if (response.status === 401 || response.status === 403) {
        dispatch(logout());
        // reject();
      }

      if (response.status >= 500) {
        dispatch(networkLoadError());
        dispatch(clearError());
        // reject('retry');
      }
    } catch (err) {
      dispatch(networkLoadError());
      dispatch(clearError());
      // reject('retry');
    }
  };
};

export const uploadUserImage = (data, token) => {
  return async dispatch => {
    console.log('\n' + 'data--->' + JSON.stringify(data));
    dispatch(loadStart());

    try {
      const response = await fetch(
        CONFIG.BASE_URL + '/account/update_personal_profile/',
        {
          method: 'POST',
          headers: {
            Authorization: 'Token ' + token,
            'Content-type': 'application/json',
          },
          body: data,
        },
      );
      console.log(response);
      if (response.status === 200 || response.status === 201) {
        response.json().then(res => {
          //dispatch(loadTransferToNumber(res));
          dispatch(loadEnd());
        });
      }
      if (response.status === 400) {
        response.json().then(res => {
          dispatch(loadError(res.message));
          dispatch(loadEnd());
        });
      }
      if (response.status === 401) {
        response.json().then(res => {
          dispatch(loadError('Page not found'));
          dispatch(loadEnd());
        });
      }

      if (response.status >= 500) {
        console.log(
          '\n' +
            '\n' +
            '\n' +
            '\n' +
            JSON.stringify(response) +
            '\n' +
            '\n' +
            '\n' +
            '\n',
        );
        dispatch(
          loadError(
            'Something went wrong. Please check your internet connection and try again',
          ),
        );
        dispatch(loadEnd());
      }
    } catch (err) {
      console.log(err + 'error');
      dispatch(
        loadError(
          'Something went wrong. Please check your internet connection and try again',
        ),
      );
    }
  };
};

export const uploadBusinessImage = (data, token) => {
  return async dispatch => {
    console.log('\n' + 'data--->' + JSON.stringify(data));
    dispatch(loadStart());

    try {
      const response = await fetch(
        CONFIG.BASE_URL + '/account/update_mybiz_profile/',
        {
          method: 'POST',
          headers: {
            Authorization: 'Token ' + token,
            'Content-type': 'application/json',
          },
          body: data,
        },
      );
      console.log(response);
      if (response.status === 200 || response.status === 201) {
        response.json().then(res => {
          //dispatch(loadTransferToNumber(res));
          dispatch(loadEnd());
        });
      }
      if (response.status === 400) {
        response.json().then(res => {
          dispatch(loadError(res.message));
          dispatch(loadEnd());
        });
      }
      if (response.status === 401) {
        response.json().then(res => {
          dispatch(loadError('Page not found'));
          dispatch(loadEnd());
        });
      }

      if (response.status >= 500) {
        console.log(
          '\n' +
            '\n' +
            '\n' +
            '\n' +
            JSON.stringify(response) +
            '\n' +
            '\n' +
            '\n' +
            '\n',
        );
        dispatch(
          loadError(
            'Something went wrong. Please check your internet connection and try again',
          ),
        );
        dispatch(loadEnd());
      }
    } catch (err) {
      console.log(err + 'error');
      dispatch(
        loadError(
          'Something went wrong. Please check your internet connection and try again',
        ),
      );
    }
  };
};

export const changePassword = (data, token) => {
  return async dispatch => {
    console.log('\n' + 'data--->' + JSON.stringify(data));
    dispatch(loadStart());

    try {
      const response = await fetch(
        CONFIG.BASE_URL + '/account/change_password/',
        {
          method: 'POST',
          headers: {
            Authorization: 'Token ' + token,
            'Content-type': 'application/json',
          },
          body: JSON.stringify(data),
        },
      );
      console.log(response);
      if (response.status === 200 || response.status === 201) {
        response.json().then(res => {
          //dispatch(loadTransferToNumber(res));
          dispatch(loadEnd());
        });
      }
      if (response.status === 400) {
        response.json().then(res => {
          dispatch(loadError(res.message));
          dispatch(loadEnd());
        });
      }
      if (response.status === 404) {
        response.json().then(res => {
          dispatch(loadError(res.message));
          dispatch(loadEnd());
        });
      }
      if (response.status === 401) {
        response.json().then(res => {
          dispatch(loadError('Page not found'));
          dispatch(loadEnd());
        });
      }

      if (response.status >= 500) {
        dispatch(
          loadError(
            'Something went wrong. Please check your internet connection and try again',
          ),
        );

        dispatch(loadEnd());
      }
    } catch (err) {
      console.log(err + 'error');
      dispatch(
        loadError(
          'Something went wrong. Please check your internet connection and try again',
        ),
      );
    }
  };
};
