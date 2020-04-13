import ActionTypes from './ActionTypes';
import { StorageUtil } from '../../utility';

/**
 * Handles all navigation within the application.
 *
 * @class NavigateActions
 */
class AppActions {
  /**
   * login/logout user into admin section.
   *
   * @static
   * @param {string} path - Path to redirect to.
   * @returns {Dispatch}
   * @memberof AppActions
   */
  static setLoggedIn(loggedIn) {
    StorageUtil.set('loggedIn', loggedIn);
    return { type: ActionTypes.SET_IS_LOGGED_IN, loggedIn };
  }
}

export default AppActions;
