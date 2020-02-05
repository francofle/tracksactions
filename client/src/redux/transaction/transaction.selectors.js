import { createSelector } from 'reselect';

const selectTransactions = rootReducer => rootReducer.transaction;

export const selectAllTransactions = createSelector(
  [selectTransactions],
  transaction => transaction.transactions
);

export const selectIsTransactionsFetching = createSelector(
  [selectTransactions],
  transaction => transaction.isFetching
);
