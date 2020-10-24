import * as actionTypes from '../types/registeredBusiness.types';
import CONFIG from '../config';
import AsyncStorage from '@react-native-community/async-storage';

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

const updateStep3Data = data => {
  return {
    type: actionTypes.UPDATE_STEP3_DATA,
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

const clearError = () => {
  return {
    type: actionTypes.CLEAR_ERROR,
  };
};

const loadError = error => {
  return {
    type: actionTypes.LOAD_ERROR,
    error,
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

const loadCategoriesSuccess = data => {
  return {
    type: actionTypes.LOAD_CATEGORIES_SUCCESS,
    data,
  };
};

export const handleStepOne = (data, nextSlide) => {
  return dispatch => {
    dispatch(clearError());
    dispatch(loadStart());

    const required = [
      'trading name',
      // 'friendly business name',
      'business category',
      'description',
    ];
    let isValid = true;
    //validate data
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
      //update data
      dispatch(updateStep1Data(data));
      dispatch(loadEnd());
      dispatch(clearError());
      nextSlide();
    }
  };
};

export const getCategories = token => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      dispatch(loadCategoriesRequest());
      fetch(CONFIG.BASE_URL + '/extra/list_category/', {
        method: 'GET',
      })
        .then(response => {
          if (response.status === 200 || response.status === 201) {
            response.json().then(res => {
              dispatch(loadCategoriesSuccess(res.data));
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

export const handleStep2 = (data, nextSlide) => {
  return dispatch => {
    dispatch(loadStart());
    dispatch(clearError());

    const required = [
      'business phone number',
      'business email address',
      'business address',
      'city',
      'state',
    ];
    let isValid = true;

    //validate data
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
      if (!data.phoneNumberIsValid) {
        dispatch(loadError('Please enter a valid phone number'));
        return;
      }
      //update data
      dispatch(loadEnd());
      dispatch(clearError());
      dispatch(updateStep2Data(data));
      nextSlide();
    }
  };
};

export const handleStep3 = (data, token, navigation) => {
  return dispatch => {
    dispatch(clearError());
    dispatch(loadStart());

    const required = [
      'RC number',
      'CAC certificate photo',
      'first director ID photo',
      'second director ID photo',
    ];
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
      return createRegisteredAccount(data, token, dispatch, navigation);
    }
  };
};

export const createRegisteredAccount = (data, token, dispatch, navigation) => {
  let payload = new FormData();
  payload.append('biz_type', 'registered');
  payload.append('biz_name', data['trading name']);
  payload.append('biz_description', data.description);
  // payload.append('biz_friendly_name', data['business name']);
  payload.append('biz_category_id', data['business category']);
  payload.append('biz_address', data['business address']);
  payload.append('biz_city', data.city);
  payload.append('biz_state', data.state);
  payload.append('biz_email', data['business email address']);
  payload.append('biz_phone', data['business phone number']);
  payload.append('rc_number', data['RC number']);
  payload.append('cac_cert_photo', data['CAC certificate photo']);
  payload.append('use_friendly', true);
  payload.append('director_id_photo', data['first director ID photo']);
  payload.append('director_id_photo_two', data['second director ID photo']);
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
          //update user stats
          dispatch(loadEnd());
          navigation.navigate('Dashboard');
        });
      }

      if (response.status === 400) {
        response.json().then(res => {
          dispatch(loadError(res.message));
        });
      }

      if (response.status === 403 || response.status === 401) {
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

export const handleStep4 = (data, token, navigation) => {
  return dispatch => {
    dispatch(clearError());
    dispatch(loadStart());

    return createRegisteredAccount(data, token, navigation, dispatch);
  };
};
