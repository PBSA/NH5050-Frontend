import { fromJS } from 'immutable';
import ActionTypes from '../actions/ActionTypes';
import { StorageUtil } from '../../utility';

const initialState = fromJS({
  organizationId: StorageUtil.get('organization_id') ? StorageUtil.get('organization_id') : '',
  raffleId: StorageUtil.get('raffle_id') ? StorageUtil.get('raffle_id') : '',
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
