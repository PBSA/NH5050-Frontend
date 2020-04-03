import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dashboard from '../Dashboard';
import OrderInfo from '../OrderInfo';
import PaymentInfo from '../PaymentInfo';
import ConfirmationPage from '../ConfirmationPage';
import GrowJackpot from '../GrowJackpot';
import { RouteConstants } from '../../constants';

class CheckoutContainer extends Component {
  state = {
    loaded: false,
  }

  renderCheckoutPage = () => {
    switch(this.props.route) {
      case RouteConstants.DASHBOARD:
        return <Dashboard/>
      case RouteConstants.ORDER_INFO:
        return <OrderInfo/>
      case RouteConstants.PAYMENT_INFO:
        return <PaymentInfo/>
      case RouteConstants.CONFIRMATION_PAGE:
        return <ConfirmationPage/>
      case RouteConstants.GROW_JACKPOT:
        return <GrowJackpot/>
      default:
        return <Dashboard/>
    }
  }

  render() {
    return (
      <>
        {this.renderCheckoutPage()}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    route: state.getIn(['checkout', 'checkoutRoute'])
  };
};

export default connect(mapStateToProps, null)(CheckoutContainer);
