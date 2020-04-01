const isDev = process.env.NODE_ENV === 'development';
console.log('isDev: ', isDev);
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
};

export default Config;

// https://5050dev.peerplays.global/api/v1/organization
// https://5050dev.peerplays.global/api/v1/organization