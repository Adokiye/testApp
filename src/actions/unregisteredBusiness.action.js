import * as actionTypes from '../types/unregisteredBusiness.types';
import CONFIG from '../config';
import AsyncStorage from '@react-native-community/async-storage';
import RNHeicConverter from 'react-native-heic-converter';
import {Platform} from 'react-native';

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

const loadCategoriesRequest = () => {
  return {
    type: actionTypes.LOAD_CATEGORIES_REQUEST,
  };
};

const loadCategoriesError = error => {
  return {
    type: actionTypes.LOAD_CATEGORIES_ERROR,
    error,
  };
};

const loadCategoriesReceived = data => {
  return {
    type: actionTypes.LOAD_CATEGORIES_RECEIVED,
    data,
  };
};

const updateStep1Data = data => {
  return {
    type: actionTypes.UPDATE_STEP1_DATA,
    data,
  };
};

const updateStep2Data = data => {
  return {
    type: actionTypes.UPDATE_STEP2_DATA,
    data,
  };
};

export const getCategories = () => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      dispatch(loadCategoriesRequest());
      fetch(CONFIG.BASE_URL + '/extra/list_category/', {
        method: 'GET',
      })
        .then(response => {
          if (response.status === 200 || response.status === 201) {
            response.json().then(res => {
              dispatch(loadCategoriesReceived(res.data));
              resolve();
            });
          }

          if (response.status === 400) {
            response.json().then(res => {
              dispatch(loadCategoriesError(res.message));
              reject();
            });
          }

          if (response.status >= 500) {
            dispatch(
              loadCategoriesError(
                'Something went wrong. Please check your internet connection and try again.',
              ),
            );
          }
        })
        .catch(() => {
          dispatch(
            loadCategoriesError(
              'Something went wrong. Please check your internet connection and try again.',
            ),
          );
        });
    });
  };
};

export const handleStep1 = (data, nextSlide) => {
  return dispatch => {
    dispatch(clearError());
    dispatch(loadStart());

    const required = ['business name', 'business category', 'description'];
    let isValid = true;
    //validate data
    for (let i = 0, len = required.length; i < len; i++) {
      if (data[required[i]] === '') {
        isValid = false;
        dispatch(loadError(`Please ${required[i]} is required`));
        break;
      } else {
        continue;
      }
    }

    if (isValid) {
      dispatch(clearError());
      dispatch(updateStep1Data(data));
      dispatch(loadEnd());
      nextSlide();
    }
  };
};

export const handleStep2 = (data, nextSlide) => {
  return dispatch => {
    dispatch(clearError());
    dispatch(loadStart());

    const required = [
      'phoneNumber',
      'business email address',
      'address',
      'city',
      'state',
      // 'business certificate',
    ];
    let isValid = true;

    for (let i = 0, len = required.length; i < len; i++) {
      if (data[required[i]] === '') {
        isValid = false;
        dispatch(loadError(`Please enter ${required[i]}`));
        break;
      } else {
        continue;
      }
    }

    if (isValid) {
      if (data.phoneNumber !== '' && !data.phoneNumberIsValid) {
        dispatch(loadError('Please enter a valid phone number'));
        return;
      }
      dispatch(clearError());
      dispatch(updateStep2Data(data));
      dispatch(loadEnd());
      nextSlide();
    }
  };
};

export const handleStep3 = (data, token, navigation) => {
  return dispatch => {
    dispatch(clearError());
    dispatch(loadStart());

    const required = [
      'Business Number',
      'Business Certificate',
      'Business Identification',
    ];

    let isValid = true;

    for (let i = 0, len = required.length; i < len; i++) {
      if (data[required[i]] === '') {
        isValid = false;
        dispatch(loadError(`Please enter ${required[i]}`));
        break;
      } else {
        continue;
      }
    }
    // const response = handleError(data, required);

    if (isValid) {
      return createAccount(data, token, dispatch, navigation);
    }
  };
};

const createAccount = (data, token, dispatch, navigation) => {
  let payload = new FormData();
  payload.append('biz_type', 'unregistered');
  payload.append('biz_friendly_name', data.step1Data['business name']);
  payload.append('biz_category_id', data.step1Data['business category']);
  payload.append('biz_address', data.step2Data.address);
  payload.append('biz_city', data.step2Data.city);
  payload.append('biz_state', data.step2Data.state);
  if (data.step2Data.phoneNumber !== '') {
    payload.append('biz_phone', data.step2Data.phoneNumber);
  }
  payload.append('biz_email', data.step2Data['business email address']);
  payload.append('biz_description', data.step1Data.description);
  payload.append('director_id_photo', data['Business Identification']);
  payload.append('cac_cert_photo', data['Business Certificate']);
  payload.append('unregistered_biz_number', data['Business Number']);
  payload.append('has_unregistered_name', false);
  if (data['Invite code'] !== '') {
    payload.append('biz_refer_code', data['Invite code']);
  }

  return fetch(CONFIG.BASE_URL + '/account/launch_biz_account/', {
    method: 'POST',
    headers: {
      Authorization: 'Token ' + token,
    },
    body: payload,
  })
    .then(response => {
      if (response.status === 200 || response.status === 201) {
        response.json().then(res => {
          dispatch(loadEnd());
          navigation.navigate('Dashboard');
        });
      }

      if (response.status === 400) {
        response.json().then(res => {
          dispatch(loadError(res.message));
        });
      }

      if (response.status === 401 || response.status === 403) {
        response.json().then(res => {
          dispatch(loadError(res.message));
        });
      }

      if (response.status >= 500) {
        dispatch(
          loadError(
            'Something went wrong. Please check your internet connection and try again',
          ),
        );
      }
    })
    .catch(() => {
      dispatch(
        loadError(
          'Something went wrong. Please check your internet connection and try again',
        ),
      );
    });
};
