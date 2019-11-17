import {createSelector} from 'reselect';

//input selector:
const selectUser = rootReducer => rootReducer.user;

//output
export const selectCurrentUser = createSelector(
  [selectUser],
  (user) => {
    return user.currentUser
  }
);