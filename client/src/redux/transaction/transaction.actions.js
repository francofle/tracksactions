import { TransactionActionTypes } from './transaction.actionTypes';
import { auth } from "../../firebase/firebase.utils";

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
      const response = await fetch(`/api/users/${firebaseId}`, {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (data.message) {
        alert('Server errors. Please come back later');
        await auth.signOut();
        // await dispatch(fetchTransactionsFailed(data.message));
      } else {
        await dispatch(fetchTransactionsSuccess(data.transactions));
      }

    } catch (error) {
      console.log(error.message);
    }
  };
};
