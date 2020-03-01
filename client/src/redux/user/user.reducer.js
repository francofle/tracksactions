import { UserActionTypes } from './user.actionTypes';

const INITIAL_STATE = {
  currentUser: null
};

const userReducer = (currentState = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.SET_CURRENT_USER:
      return {
        ...currentState,
        currentUser: action.payload
      };
    case UserActionTypes.SET_TOTAL_BALANCE:
      Object.assign(
         currentState,
        {},
        { currentUser: {...currentState.currentUser, totalBalance: { $numberDecimal: action.payload } } }
      );
      return currentState;
    default:
      return currentState;
  }
};

export default userReducer;
