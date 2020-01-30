import { combineReducers } from 'redux';
import userReducer from './user/user.reducer';
import transactionReducer from './transaction/transcation.reducer'

export default combineReducers({
  user: userReducer,
  transaction: transactionReducer
});
