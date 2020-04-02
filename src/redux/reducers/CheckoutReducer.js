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
  playerId: 0,
  bundle: '',
  detachement: '',
  ticketPurchaseResponse: StorageUtil.get('ticketPurchaseResponse') ? StorageUtil.get('ticketPurchaseResponse') : {
    entries: [],
    ticket_sales: {
      id: 0,
      raffle_id: 0,
      total_jackpot: 0,
      total_progressive_jackpot: 0,
    },
  },
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
        playerId: action.orderInfo.playerId,
        bundle: action.orderInfo.bundle,
        detachement: action.orderInfo.detachement,
      });
    }

    case ActionTypes.SET_TICKET_PURCHASE_RESPONSE: {
      return state.merge({
        ticketPurchaseResponse: action.ticketPurchaseResponse,
      });
    }

    default:
      return state;
  }
};
