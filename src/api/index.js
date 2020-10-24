import Customer from './customer';
import Team from './team';
import Invoice from './invoice';
import User from './user';
import Auth from './auth';
import Account from './account';
import Transfer from './transfer';

export const InvoiceRequest = new Invoice();
export const UserRequest = new User();
export const CustomerRequest = new Customer();
export const TeamRequest = new Team();
export const AuthRequest = new Auth();
export const AccountRequest = new Account();
export const TransferRequest = new Transfer();

export const resetRequest = async () => {
  // make all functions here run simultaneously
  await InvoiceRequest.init();
  await UserRequest.init();
  await CustomerRequest.init();
  await AuthRequest.init();
  await AccountRequest.init();
  await TransferRequest.init();
  await TeamRequest.init();
};
