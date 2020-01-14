import { combineReducers } from 'redux';
import { counterReducer as counter } from './counter';

export default combineReducers({
  counter
});
