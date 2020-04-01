import axios from 'axios';
import { Config } from '../utility';

const ApiHandler = axios.create({ withCredentials: true });

const apiRoot = Config.isDev
  ? Config.devApiRoute
  : Config.prodApiRoute;

class RaffleService {
  /**
   * Login via Username and Password.
   *
   * @static
   * @param {object} account - Account object:
   * {
      login: 'username',
      password: 'password
   * }.
   * @returns {Promise}
   * @memberof PrivateAuthService
   */
  static getRaffle(organizationId) {
    const query = `${apiRoot}/raffles?organizationId=${organizationId}`;
    return new Promise(async (resolve, reject) => {
      try {
        const response = await ApiHandler.get(query);

        if (response.data.status !== 200) {
          return reject(response);
        }

        return resolve(response.data.result);
      } catch (err) {
        return reject(err.response);
      }
    });
  }

  static getTicketBundle() {
    const query = `${apiRoot}/ticketbundles`;
    return new Promise(async (resolve, reject) => {
      try {
        const response = await ApiHandler.get(query);

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

export default RaffleService;
