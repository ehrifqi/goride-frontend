import {combineReducers} from 'redux';
import currentUser from './currentUser';
import error from './error';
import activeBook from './activeBook';

const rootReducer = combineReducers({
  currentUser,
  error,
  activeBook
});

export default rootReducer;