import { createSelector } from 'reselect';

const selectTransactions = rootReducer => rootReducer.transactions;

export const selectAllTransactions = createSelector(
  [selectTransactions],
  transactions => {
    return transactions;
  }
);
