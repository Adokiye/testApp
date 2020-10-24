import * as actionTypes from '../types/user';

const initialState = {
  isLoading: false,
  profile: {},
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_USER_PROFILE:
      return {
        ...state,
        isLoading: false,
        profile: action.profile,
      };
    case actionTypes.LOAD_START:
      return {
        ...state,
        isLoading: true,
      };
    default:
      return state;
  }
};

export default userReducer;
