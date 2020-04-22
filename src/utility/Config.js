const isDev = process.env.NODE_ENV === 'development';

const {
  DEV_API_ROUTE,
  PRODUCTION_API_ROUTE,
  DEV_BASE_ROUTE,
  PRODUCTION_BASE_ROUTE,
  STRIPE_DEV_PKEY,
  STRIPE_PROD_PKEY,
  GOOGLE_ANALYTICS_KEY,
} = process.env;

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
  devApiRoute: DEV_API_ROUTE,
  /**
   * @type {text}
   * @memberof Config
   */
  prodApiRoute: PRODUCTION_API_ROUTE,
  /**
   * Represents the base uri.
   *
   * @type {string}
   * @memberof Config
   */
  baseRoute: isDev ? DEV_BASE_ROUTE : PRODUCTION_BASE_ROUTE,
  /**
   * Represents the stripe publishable key.
   *
   * @type {string}
   * @memberof Config
   */
  stripePKey: isDev ? STRIPE_DEV_PKEY : STRIPE_PROD_PKEY,
  /**
   * Represents the stripe publishable key.
   *
   * @type {string}
   * @memberof Config
   */
  googleAnalyticsKey: GOOGLE_ANALYTICS_KEY,
};

export default Config;
