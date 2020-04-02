import axios from 'axios';
import querystring from 'query-string';
import { Config } from '../utility';

const ApiHandler = axios.create({ withCredentials: true });

const apiRoot = Config.isDev
  ? Config.devApiRoute
  : Config.prodApiRoute;

class OrganizationService {
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
    const url = `${apiRoot}/users`;
    let response;
    return new Promise(async (resolve, reject) => {
      const headers = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      };

      try {
        response = await ApiHandler.post(url, querystring.stringify(player), headers);

        if (response.data.status !== 200) {
          return reject(response);
        }

        return resolve(response.data.result);
      } catch (err) {
        return reject(err.response);
      }
    });
  }

  static getPlayer(email, mobile) {
    const url = `${apiRoot}/users?email=${email}&mobile=${mobile}`;
    return new Promise(async (resolve, reject) => {
      try {
        const response = await ApiHandler.get(url);

        if (response.data.status !== 200) {
          return reject(response);
        }

        return resolve(response.data.result);
      } catch (err) {
        return reject(err.response);
      }
    });
  }
}

export default OrganizationService;
