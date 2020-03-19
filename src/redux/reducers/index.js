import { combineReducers } from 'redux-immutable'
import {connectRouter} from 'connected-react-router';
// import test from './testReducer'

export default (history) => combineReducers({
  router: connectRouter(history),
})