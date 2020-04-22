import { RouteConstants } from '../constants';


class RouteUtil {
  static isKnownPath = (path) => {
    for (const route of Object.values(RouteConstants)) {
      if (path.startsWith(route)) {
        return true;
      }
    }

    return false;
  };

  static paymentRedirect = (paymentRes, navigate, setRoute) => {
    if (paymentRes.get('entries').length > 0) {//totalJackpot: state.getIn(['checkout','ticketPurchaseResponse','ticket_sales', 'total_jackpot']),
      setRoute(RouteConstants.ORDER_INFO);
      navigate(RouteConstants.ORDER_INFO);
    } else {
      navigate(RouteConstants.PAYMENT_INFO);
    }
  }

  static isCheckoutRoute = (path, checkoutRoute) => {
    return path === checkoutRoute && !path.includes('/admin');
  }
}

export default RouteUtil;
