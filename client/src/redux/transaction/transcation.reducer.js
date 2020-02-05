import { TransactionActionTypes } from './transaction.actionTypes';

const INITIAL_STATE = {
  transactions: null,
  isFetching: true,
  errorMessage: undefined
};

const transactionReducer = (rootReducerState = INITIAL_STATE, action) => {
  switch (action.type) {
    case TransactionActionTypes.FETCH_TRANSACTIONS_START:
      return {
        ...rootReducerState,
        isFetching: true
      };

    case TransactionActionTypes.FETCH_TRANSACTIONS_SUCCESS:
      return {
        ...rootReducerState,
        isFetching: false,
        transactions: action.payload
      };
    case TransactionActionTypes.FETCH_TRANSACTIONS_FAILED:
      return {
        ...rootReducerState,
        isFetching: false,
        errorMessage: action.payload
      };
    default:
      return rootReducerState;
  }
};

export default transactionReducer;
