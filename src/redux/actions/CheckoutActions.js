import ActionTypes from './ActionTypes';
import { StorageUtil } from '../../utility';

/**
 * Public actions related to checkout flow. E.G setting organization and raffle id
 *
 * @class CheckoutActions
 */
class CheckoutActions {
  /**
   *
   *
   * @static
   * @returns {Action}
   * @memberof CheckoutActions
   */
  static setOrganization(organization) {
    return { type: ActionTypes.SET_ORGANIZATION, organization };
  }

  /**
   *
   *
   * @static
   * @returns {Action}
   * @memberof CheckoutActions
   */
  static setOrganizationId(organizationId) {
    StorageUtil.set('organization_id', organizationId);
    return { type: ActionTypes.SET_ORGANIZATION_ID, organizationId };
  }

  /**
   *
   *
   * @static
   * @returns {Action}
   * @memberof CheckoutActions
   */
  static setRaffleId(raffleId) {
    StorageUtil.set('raffle_id', raffleId);
    return { type: ActionTypes.SET_RAFFLE_ID, raffleId };
  }

  /**
   *
   *
   * @static
   * @returns {Action}
   * @memberof CheckoutActions
   */
  static setRaffle(raffle) {
    return { type: ActionTypes.SET_RAFFLE, raffle };
  }

  /**
   *
   *
   * @static
   * @returns {Action}
   * @memberof CheckoutActions
   */
  static setOrderInfo(orderInfo) {
    StorageUtil.set('orderInfo', JSON.stringify(orderInfo));
    return { type: ActionTypes.SET_ORDER_INFO, orderInfo };
  }

  /**
   * Set the ticket purchase response to be displayed on confirmation page.
   *
   * @static
   * @returns {Action}
   * @memberof CheckoutActions
   */
  static setTicketPurchaseResponse(ticketPurchaseResponse) {
    StorageUtil.set('ticketPurchaseResponse', JSON.stringify(ticketPurchaseResponse));
    return { type: ActionTypes.SET_TICKET_PURCHASE_RESPONSE, ticketPurchaseResponse };
  }

  /**
   * Set checkout route
   *
   * @static
   * @returns {Action}
   * @memberof CheckoutActions
   */
  static setCheckoutRoute(checkoutRoute) {
    StorageUtil.set('checkoutRoute', checkoutRoute);
    return { type: ActionTypes.SET_CHECKOUT_ROUTE, checkoutRoute };
  }
}

export default CheckoutActions;
