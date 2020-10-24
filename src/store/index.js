import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import getRootReducer from '../reducers/index';

const loggerMiddleware = createLogger();

export default function getStore(navigationMiddleware, navigationReducer) {
  return createStore(
    getRootReducer(navigationReducer),
    applyMiddleware(thunkMiddleware, loggerMiddleware, navigationMiddleware),
  );
}
