import * as actionTypes from '../types/customer';
import { CustomerRequest as request } from '../api/index';

export const getCustomers = customers => {
  return {
    type: actionTypes.GET_CUSTOMERS,
    customers,
  };
};

export const createACustomer = customer => {
  return {
    type: actionTypes.CREATE_CUSTOMER,
    customer,
  };
};

export const editACustomer = customer => {
  return {
    type: actionTypes.EDIT_CUSTOMER,
    customer,
  };
};

export const requestLoading = () => {
  return {
    type: actionTypes.LOAD_START,
  };
};

export const fetchCustomers = () => async dispatch => {
  dispatch(requestLoading());
  const result = await request.fetchCustomers();
  if (result.error) {
    return result;
  }
  dispatch(getCustomers(result));
  return result;
};

export const createCustomer = data => async dispatch => {
  dispatch(requestLoading());
  const result = await request.createCustomer(data);
  if (result.error) {
    return result;
  }
  delete result.message;
  delete result.status_code;
  delete result.status;

  dispatch(createACustomer(result));
  return result;
};

export const editCustomer = data => async dispatch => {
  dispatch(requestLoading());
  const result = await request.editCustomer(data);
  if (result.error) {
    return result;
  }
  delete result.message;
  delete result.status_code;
  delete result.status;
  console.log(result)
  dispatch(editACustomer(result));
  return result;
};
