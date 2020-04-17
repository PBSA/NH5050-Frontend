import { apiCall } from './api.helper';

export default class UserService {
  /**
   * Create or update a player
   *
   * @static
   * @param {object} player - Player object:
   * {
   *   firstname: 'firstname',
   *   lastname: 'lastname',
   *   email: 'email',
   *   mobile: 'mobile',
   *   password: 'password',
   *   is_email_allowed: true
   * }.
   * @returns {Promise}
   * @memberof PrivateAuthService
   */
  static createPlayer(player) {
    return apiCall('post', 'users', player);
  }

  static getPlayer(email, mobile) {
    return apiCall('get', 'users', { email, mobile });
  }

  static login(credentials) {
    return apiCall('post', 'users/login', credentials);
  }

  static getUserDetails(id) {
    return apiCall('get', `users/${id}`);
  }

  static logout() {
    return apiCall('post', 'users/logout');
  }
}
