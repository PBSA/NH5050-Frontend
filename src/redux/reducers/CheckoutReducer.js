import { fromJS } from 'immutable';
import ActionTypes from '../actions/ActionTypes';
import { StorageUtil } from '../../utility';

const orderInfo = JSON.parse(StorageUtil.get('orderInfo'));
const initialState = fromJS({
  checkoutRoute: StorageUtil.get('checkoutRoute') ? StorageUtil.get('checkoutRoute') : '/dashboard',
  organization: [],
  organizationId: StorageUtil.get('organization_id') ? StorageUtil.get('organization_id') : '',
  raffle: [],
  raffleId: StorageUtil.get('raffle_id') ? StorageUtil.get('raffle_id') : '',
  firstName: orderInfo ? orderInfo.firstName : '',
  lastName: orderInfo ? orderInfo.lastName : '',
  phone: orderInfo ? orderInfo.phone : '',
  email: orderInfo ? orderInfo.email : '',
  ageCheck: orderInfo ? orderInfo.ageCheck : false,
  emailCheck: orderInfo ? orderInfo.emailCheck : true,
  bundleVal: orderInfo ? orderInfo.bundleVal : '0',
  detachementVal: orderInfo ? orderInfo.detachementVal : '',
  playerId: 0,
  bundle: orderInfo ? orderInfo.bundle : '',
  detachement: orderInfo ? orderInfo.detachement : '',
  ticketPurchaseResponse: StorageUtil.get('ticketPurchaseResponse') ? JSON.parse(StorageUtil.get('ticketPurchaseResponse')) : {
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
    case ActionTypes.SET_ORGANIZATION: {
      return state.merge({
        organization: action.organization,
      });
    }

    case ActionTypes.SET_ORGANIZATION_ID: {
      return state.merge({
        organizationId: action.organizationId,
      });
    }

    case ActionTypes.SET_RAFFLE: {
      return state.merge({
        raffle: action.raffle,
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
        bundleVal: action.orderInfo.bundleVal,
        detachementVal: action.orderInfo.detachementVal,
      });
    }

    case ActionTypes.SET_TICKET_PURCHASE_RESPONSE: {
      return state.merge({
        ticketPurchaseResponse: action.ticketPurchaseResponse,
      });
    }

    case ActionTypes.SET_CHECKOUT_ROUTE: {
      return state.merge({
        checkoutRoute: action.checkoutRoute,
      });
    }

    default:
      return state;
  }
};
