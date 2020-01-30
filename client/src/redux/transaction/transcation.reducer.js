import {TransactionActionTypes} from "./transaction.actionTypes";

const INITIAL_STATE = {
  transactions: null
};

const transactionReducer = (rootReducerState = INITIAL_STATE, action) => {
  switch (action.type) {
    case TransactionActionTypes.SET_TRANSACTIONS:
      return {
        ...rootReducerState,
        transactions: action.payload
      };
    default:
      return rootReducerState;
  }
};

export default transactionReducer;