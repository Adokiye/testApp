const axios = require('axios').default;
import AsyncStorage from '@react-native-community/async-storage';
import { NavigationActions } from 'react-navigation';

import { store } from '../../App';
import CONFIG from '../config';

const baseURL = CONFIG.BASE_URL;

export default class ProspaRequest {
  _token = '';
  requestInstance;
  noTokenRequestInstance;
  businessAccountId;

  constructor() {
    this.init();
  }

  async init() {
    const storedUserData = await AsyncStorage.getItem('user_stats');
    const userData = JSON.parse(storedUserData) || {};

    await this._setToken(userData.token);
    this._setRequestInstance();
    this._setBusinessAccountId(userData.biz_account_id);
  }

  async _setToken(token) {
    this._token = token;
  }

  _setBusinessAccountId(id) {
    this.businessAccountId = id;
  }

  _setRequestInstance() {
    this.requestInstance = axios.create({
      baseURL,
      headers: {
        Authorization: `Token ${this._token}`,
      },
    });
    this.noTokenRequestInstance = axios.create({
      baseURL,
    });
  }

  handleError(err) {
    if (err.response) {
      // error from API
      console.log('LIFE HAPPENS', err.response);
      if (err.response.status === 401) {
        // redirect to login screen
        store.dispatch(
          NavigationActions.navigate({
            routeName: 'Login',
            params: {
              errorMessage: 'Please login to continue',
            },
          }),
        );
      }
      return {
        error: {
          message: err.response.data.message,
        },
      };
    }
    if (err.request) {
      // a network error
      console.log('Network Error', err.request);

      const response = err.request.response;
      return {
        error: {
          message: response.message,
        },
      };
    }
  }
}
