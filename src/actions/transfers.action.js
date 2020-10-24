import * as actionTypes from '../types/transfers';
import { TransferRequest as request } from '../api/index';
import { getBusinessAccounts, getInflowOutflow } from './account';

const loadStart = () => {
  return {
    type: actionTypes.LOAD_START,
  };
};

const loadEnd = () => {
  return {
    type: actionTypes.LOAD_END,
  };
};

export const loadBeneficiaryReceived = data => {
  return {
    type: actionTypes.LOAD_BENEFICIARY_RECEIVED,
    data,
  };
};

export const loadListedBanksReceived = data => {
  return {
    type: actionTypes.LOAD_LISTED_BANKS_RECEIVED,
    data,
  };
};

export const loadPendingReceived = data => {
  return {
    type: actionTypes.LOAD_PENDING_RECEIVED,
    data,
  };
};

const updateAccounts = () => async dispatch => {
  getBusinessAccounts()(dispatch);
  getInflowOutflow()(dispatch);
};

export const getBeneficiaries = accountNumber => async dispatch => {
  dispatch(loadStart());
  const response = await request.fetchBeneficiaries(accountNumber);
  if (response.error) {
    return response;
  }
  dispatch(loadBeneficiaryReceived(response));
  dispatch(loadEnd());

  return response;
};

export const getPendingTransfers = () => async dispatch => {
  dispatch(loadStart());
  const response = await request.fetchPendingTransactions();
  if (response.error) {
    return response;
  }
  dispatch(loadPendingReceived(response));
  dispatch(loadEnd());
  return response;
};

export const getListedBanks = () => async dispatch => {
  dispatch(loadStart());
  const response = await request.fetchListedBanks();
  if (response.error) {
    return response;
  }
  dispatch(loadListedBanksReceived(response));
  dispatch(loadEnd());
  return response;
};

export const makeTransferFirstStep = data => async dispatch => {
  dispatch(loadStart());
  const payload = {
    transfer_step: 'first_step',
    transfer_type: data.bankCode,
    rep_acc_num: data.accountNumber,
  };
  dispatch(loadEnd());
  return await request.makeTransferFirstStep(payload);
};

export const makeBeneficiaryTransfer = data => async dispatch => {
  dispatch(loadStart());
  const { beneficiary_id, amount, access_code, transfer_note } = data;
  const payload = {
    beneficiary_id,
    amount,
    access_code,
    transfer_note,
  };
  if (!payload.transfer_note) {
    delete payload.transfer_note;
  }
  const response = await request.makeBeneficiaryTrasfer(payload);
  dispatch(loadEnd());
  updateAccounts()(dispatch);
  return response;
};

export const makeTransferSecondStep = data => async dispatch => {
  dispatch(loadStart());
  const payload = {
    ...data,
    transfer_step: 'second_step',
  };
  if (!payload.transfer_note) {
    delete payload.transfer_note;
  }
  const response = await request.makeTransferSecondStep(payload);
  dispatch(loadEnd());
  updateAccounts()(dispatch);
  return response;
};

export const transferBetweenWallets = data => async dispatch => {
  dispatch(loadStart());
  const response = await request.transferBetweenWallets(data);
  dispatch(loadEnd());
  updateAccounts()(dispatch);
  return response;
};
