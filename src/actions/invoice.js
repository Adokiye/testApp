import * as actionTypes from '../types/invoice';
import { InvoiceRequest as request } from '../api/index';

export const getInvoices = invoices => {
  return {
    type: actionTypes.GET_INVOICES,
    invoices,
  };
};

export const requestLoading = () => {
  return {
    type: actionTypes.LOAD_START,
  };
};

export const requestFailure = () => {
  return {
    type: actionTypes.LOAD_ERROR,
  };
};

export const generateInvoice = () => {
  return {
    type: actionTypes.CREATE_INVOICE,
  };
};

export const fetchInvoices = () => async dispatch => {
  dispatch(requestLoading());
  const result = await request.fetchInvoices();
  if (result.error) {
    dispatch(requestFailure());
    return result;
  }
  dispatch(getInvoices(result));
  return result;
};

export const createInvoice = invoiceData => async dispatch => {
  dispatch(requestLoading());
  const result = await request.createInvoice(invoiceData);
  if (result.error) {
    dispatch(requestFailure());
    return result;
  }
  dispatch(generateInvoice());
  return result;
};

export const sendInvoice = async invoiceId => {
  return await request.sendInvoice(invoiceId);
};
