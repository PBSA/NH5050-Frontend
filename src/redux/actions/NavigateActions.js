import { push } from 'connected-react-router';

/**
 * Handles all navigation within the application.
 *
 * @class NavigateActions
 */
class NavigateActions {
  /**
   * Redirect the browser to another path.
   *
   * @static
   * @param {string} path - Path to redirect to.
   * @returns {Dispatch}
   * @memberof NavigateActions
   */
  static navigate(path) {
    return (dispatch) => {
      dispatch(push(path));
    };
  }
}

export default NavigateActions;
