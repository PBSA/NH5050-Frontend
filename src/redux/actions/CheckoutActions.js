import ActionTypes from './ActionTypes';
import { StorageUtil } from '../../utility';

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
    StorageUtil.set('organization_id', organizationId);
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
    StorageUtil.set('raffle_id', raffleId);
    return { type: ActionTypes.SET_RAFFLE_ID, raffleId };
  }
}

export default CheckoutActions;
