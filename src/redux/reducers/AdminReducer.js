import { fromJS } from 'immutable';
import ActionTypes from '../actions/ActionTypes';
import { StorageUtil } from '../../utility';

const initialState = fromJS({
  isLoggedIn: StorageUtil.get('loggedIn') ? (StorageUtil.get('loggedIn') === 'true') : false,
  ticketFilter: 1,
});

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_IS_LOGGED_IN: {
      return state.merge({
        isLoggedIn: action.loggedIn,
      });
    }

    case ActionTypes.SET_TICKET_FILTER: {
      return state.merge({
        ticketFilter: action.ticketFilter,
      });
    }

    default:
      return state;
  }
};
