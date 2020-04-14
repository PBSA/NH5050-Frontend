const isDev = process.env.NODE_ENV === 'development';
/**
 * @namespace Config
 */
const Config = {
  /**
   * @type {boolean}
   * @memberof Config
   */
  isDev,
  /**
   * @type {text}
   * @memberof Config
   */
  devApiRoute: 'https://5050dev.peerplays.global/api/v1',
  /**
   * @type {text}
   * @memberof Config
   */
  prodApiRoute: 'https://5050staging.peerplays.global/api/v1',
  /**
   * Represents the base uri.
   *
   * @type {string}
   * @memberof Config
   */
  baseRoute: isDev ? 'https://5050dev.peerplays.global' : 'https://5050staging.peerplays.global',
  /**
   * Represents the stripe publishable key.
   *
   * @type {string}
   * @memberof Config
   */
  stripePKey: isDev ? 'pk_test_eXMu4Pj53sjl7Ff2pj3xYPh8' : 'pk_live_Mhn5hRbCTBBnskMabdeooiLh',
};

export default Config;
