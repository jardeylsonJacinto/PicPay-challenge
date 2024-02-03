import { ITransaction } from './Transaction';

export interface IUser {
  id: String;
  fullName: String;
  email: String;
  password: String;
  amount: Number;
  makeTransfer(idPayee: String, value: Number): ITransaction;
}
