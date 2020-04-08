import { apiCall } from './api.helper';

export default class RaffleService {
  
  static getRaffle(organizationId) {
    return apiCall('get', 'raffles', { organizationId });
  }

  static getRaffleById(raffleId) {
    return apiCall('get', `raffles/${raffleId}`);
  }

  static createOrUpdateRaffle(raffleData) {
    return apiCall('post', 'raffles', raffleData);
  }

  static getTicketBundle(raffleId) {
    return apiCall('get', 'ticketbundles', { raffleId });
  }

  static createTicketBundle(bundleData) {
    return apiCall('post', 'raffles/ticketbundles', bundleData);
  }

  static getReportUrl(raffleId) {
    return apiCall('post', 'raffles/downloadreport', { raffleId });
  }

  static createPayment(bundleId) {
    return apiCall('get', 'createpayment', { bundleId });
  }

  static initStripePayment(ticketsale) {
    return apiCall('post', 'raffles/initpurchase', {
      ...ticketsale,
      payment_type: 'stripe',
    });
  }

  static ticketPurchase(ticketsale) {
    return apiCall('post', 'raffles/ticketpurchase', ticketsale);
  }

  static getTicketSalesForRaffle(raffleId) {
    return apiCall('get', `ticketsales/${raffleId}`);
  }

  static getTicketDetails(ticketId) {
    return apiCall('get', `ticketdetails/${ticketId}`);
  }
}
