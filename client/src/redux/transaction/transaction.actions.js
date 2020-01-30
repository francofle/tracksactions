import { TransactionActionTypes } from './transaction.actionTypes';

export const setTransactions = transactions => {
  return {
    type: TransactionActionTypes.SET_TRANSACTIONS,
    payload: transactions
  };
};
