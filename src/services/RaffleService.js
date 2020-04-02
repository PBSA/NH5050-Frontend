import axios from 'axios';
import querystring from 'query-string';
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

  static getRaffleById(raffleId) {
    const query = `${apiRoot}/raffles/${raffleId}`;
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

  static getTicketBundle(raffleId) {
    const query = `${apiRoot}/ticketbundles?raffleId=${raffleId}`;
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

  static createPayment(bundleId) {
    const url = `${apiRoot}/createpayment?bundleId=${bundleId}`;
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

  static initStripePayment(ticketsale) {
    const url = `${apiRoot}/raffles/initpurchase`;
    let response;
    return new Promise(async (resolve, reject) => {
      const headers = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      };

      const body = {
        ...ticketsale,
        payment_type: 'stripe',
      };

      try {
        response = await ApiHandler.post(url, querystring.stringify(body), headers);

        if (response.data.status !== 200) {
          return reject(response);
        }

        return resolve(response.data.result);
      } catch (err) {
        return reject(err.response);
      }
    });
  }

  static ticketPurchase(ticketsale) {
    const url = `${apiRoot}/raffles/ticketpurchase`;
    let response;
    return new Promise(async (resolve, reject) => {
      const headers = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      };

      try {
        response = await ApiHandler.post(url, querystring.stringify(ticketsale), headers);

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
