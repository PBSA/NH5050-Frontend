import { fromJS } from 'immutable';
import ActionTypes from '../actions/ActionTypes';

const initialState = fromJS({
  organizationId: '',
  raffleId: '',
});

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_ORGANIZATION_ID: {
      return state.merge({
        organizationId: action.organizationId,
      });
    }

    case ActionTypes.SET_RAFFLE_ID: {
      return state.merge({
        raffleId: action.raffleId,
      });
    }

    default:
      return state;
  }
};
