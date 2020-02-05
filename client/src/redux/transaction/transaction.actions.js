import { TransactionActionTypes } from './transaction.actionTypes';

export const setTransactions = transactions => {
  return {
    type: TransactionActionTypes.SET_TRANSACTIONS,
    payload: transactions
  };
};

export const fetchTransactionsStart = () => {
  return {
    type: TransactionActionTypes.FETCH_TRANSACTIONS_START
  };
};

export const fetchTransactionsSuccess = transactions => {
  return {
    type: TransactionActionTypes.FETCH_TRANSACTIONS_SUCCESS,
    payload: transactions
  };
};

export const fetchTransactionsFailed = errorMessage => {
  return {
    type: TransactionActionTypes.FETCH_TRANSACTIONS_FAILED,
    payload: errorMessage
  };
};

export const fetchTransactionsStartAsync = (firebaseId, token) => {
  return async dispatch => {
    dispatch(fetchTransactionsStart());
    try {
      const response = await fetch(`/api/transaction/${firebaseId}`, {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer: ${token}`
        }
      });
      const transactions = response.json();
      dispatch(fetchTransactionsSuccess(transactions))
    } catch (error) {
      console.log(error);
      dispatch(fetchTransactionsFailed(error))
    }
  };
};
