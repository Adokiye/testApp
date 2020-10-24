import * as actionTypes from '../types/team';
import { TeamRequest as request } from '../api/index';

export const getTeams = teams => {
  return {
    type: actionTypes.GET_TEAMS,
    teams,
  };
};

export const createATeam = team => {
  return {
    type: actionTypes.CREATE_TEAM,
    team,
  };
};

export const removeATeam = team => {
  return {
    type: actionTypes.REMOVE_TEAM,
    team,
  };
};

export const requestLoading = () => {
  return {
    type: actionTypes.LOAD_START,
  };
};

export const fetchTeamMembers = () => async dispatch => {
  dispatch(requestLoading());
  const result = await request.fetchTeamMembers();
  if (result.error) {
    return result;
  }
  dispatch(getTeams(result));
  return result;
};

export const addTeamMember = data => async dispatch => {
  dispatch(requestLoading());
  const result = await request.addTeamMember(data);
  if (result.error) {
    return result;
  }
  delete result.message;
  delete result.status_code;
  delete result.status;

  dispatch(createATeam(result));
  return result;
};
//
export const removeTeamMember = data => async dispatch => {
  dispatch(requestLoading());
  const result = await request.removeTeamMember(data);
  if (result.error) {
    return result;
  }
  delete result.message;
  delete result.status_code;
  delete result.status;

  dispatch(removeATeam(result));
  return result;
};
