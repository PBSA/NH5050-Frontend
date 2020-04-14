import { combineReducers } from 'redux-immutable';
import { connectRouter } from 'connected-react-router';
import CheckoutReducer from './CheckoutReducer';
import AppReducer from './AppReducer';

export default (history) => combineReducers({
  router: connectRouter(history),
  checkout: CheckoutReducer,
  app: AppReducer,
});
