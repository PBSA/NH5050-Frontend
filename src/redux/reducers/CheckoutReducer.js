import { fromJS } from 'immutable';
import ActionTypes from '../actions/ActionTypes';
import { StorageUtil } from '../../utility';

const initialState = fromJS({
  organizationId: StorageUtil.get('organization_id') ? StorageUtil.get('organization_id') : '',
  raffleId: StorageUtil.get('raffle_id') ? StorageUtil.get('raffle_id') : '',
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  ageCheck: false,
  emailCheck: false,
  bundle: '',
  detachement: '',
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

    case ActionTypes.SET_ORDER_INFO: {
      return state.merge({
        firstName: action.orderInfo.firstName,
        lastName: action.orderInfo.lastName,
        phone: action.orderInfo.phone,
        email: action.orderInfo.email,
        ageCheck: action.orderInfo.ageCheck,
        emailCheck: action.orderInfo.emailCheck,
        bundle: action.orderInfo.bundle,
        detachement: action.orderInfo.detachement,
      });
    }

    default:
      return state;
  }
};
