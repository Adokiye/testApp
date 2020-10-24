import * as actionTypes from '../types/team';

const initialState = {
  isLoading: false,
  teams: [],
};

const teamReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_TEAMS:
      return {
        ...state,
        isLoading: false,
        teams: action.teams,
      };
    case actionTypes.CREATE_TEAM:
      return {
        ...state,
        isLoading: false,
        //teams: [...state.teams, action.team],
      };
    case actionTypes.REMOVE_TEAM:
      return {
        ...state,
        isLoading: false,
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

export default teamReducer;
