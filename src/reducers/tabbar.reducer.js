import {setState} from '../types/tabbar.js';
const initialState = {
  state: 'accounts',
};
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case setState:
      return {
        ...state,
        state: action.payload,
      };
    default:
      return state;
  }
};
export default rootReducer;
