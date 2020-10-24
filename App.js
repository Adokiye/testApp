import React, { Component } from 'react';
import { Provider } from 'react-redux';
import AppContainer from './src/navigation/index';
import getStore from './src/store/index';
import {
  navigationMiddleware,
  navigationReducer,
} from './src/navigation/index';

export const store = getStore(navigationMiddleware, navigationReducer);
export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}
