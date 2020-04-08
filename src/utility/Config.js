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
  devApiRoute: 'http://localhost:3000/api/v1', // https://5050dev.peerplays.global/api/v1',
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
};

export default Config;

// https://5050dev.peerplays.global/api/v1/organization
// https://5050dev.peerplays.global/api/v1/organization
