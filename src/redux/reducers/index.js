import { combineReducers } from 'redux-immutable';
import { connectRouter } from 'connected-react-router';
import CheckoutReducer from './CheckoutReducer';

export default (history) => combineReducers({
  router: connectRouter(history),
  checkout: CheckoutReducer,
});
