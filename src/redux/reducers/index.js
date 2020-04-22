import { combineReducers } from 'redux-immutable';
import { connectRouter } from 'connected-react-router';
import CheckoutReducer from './CheckoutReducer';
import AdminReducer from './AdminReducer';

export default (history) => combineReducers({
  router: connectRouter(history),
  checkout: CheckoutReducer,
  admin: AdminReducer,
});
