import * as actionTypes from '../types/profile';
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
        console.log("\n"+"\n"+"\n"+"\n"+JSON.stringify(response)+"\n"+"\n"+"\n"+"\n")
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
//
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

