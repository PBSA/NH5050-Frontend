import ActionTypes from './ActionTypes';
import { StorageUtil } from '../../utility';

/**
 * Handles all navigation within the application.
 *
 * @class NavigateActions
 */
class AdminActions {
  /**
   * login/logout user into admin section.
   *
   * @static
   * @param {string} path - Path to redirect to.
   * @returns {Dispatch}
   * @memberof AdminActions
   */
  static setLoggedIn(loggedIn) {
    StorageUtil.set('loggedIn', loggedIn);
    return { type: ActionTypes.SET_IS_LOGGED_IN, loggedIn };
  }

  static setTicketFilter(ticketFilter) {
    return { type: ActionTypes.SET_TICKET_FILTER, ticketFilter };
  }
}

export default AdminActions;
