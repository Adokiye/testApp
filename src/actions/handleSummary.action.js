import * as actionTypes from '../types/summary';
import * as appActions from '../actions/app';
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

export const loadSummaryRequest = () => {
  return {
    type: actionTypes.LOAD_SAMPLE_REQUEST,
  };
};

export const loadSummaryReceived = data => {
  return {
    type: actionTypes.LOAD_SAMPLE_RECEIVED,
    data,
  };
};
export const handleSummary = (id, token) => {
  return async dispatch => {
    dispatch(loadSummaryRequest());

    try {
      const response = await fetch(
        CONFIG.BASE_URL + `/express/per_sub_monthly_flow/${id}/`,
        {
          method: 'GET',
          headers: {
            Authorization: 'Token ' + token,
          },
        },
      );

      if (response.status === 200 || response.status === 201) {
        response.json().then(res => {
          dispatch(loadSummaryReceived(res));
        });
      }

      if (response.status === 400) {
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
    } catch (err) {
      dispatch(
        loadError(
          'Something went wrong. Please check your internet connection and try again',
        ),
      );
    }
  };
};
