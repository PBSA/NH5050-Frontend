import ActionTypes from './ActionTypes';

/**
 * Public actions related to checkout flow. E.G setting organization and raffle id
 *
 * @class CheckoutActions
 */
class CheckoutActions {
  /**
   * Toggles the display of the modal component.
   *
   * @static
   * @returns {Action}
   * @memberof CheckoutActions
   */
  static setOrganizationId(organizationId) {
    return { type: ActionTypes.SET_ORGANIZATION_ID, organizationId };
  }

  /**
   * Toggles the display of the modal component.
   *
   * @static
   * @returns {Action}
   * @memberof CheckoutActions
   */
  static setRaffleId(raffleId) {
    return { type: ActionTypes.SET_RAFFLE_ID, raffleId };
  }
}

export default CheckoutActions;
