import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { CheckoutActions } from '../../redux/actions';
import Dashboard from '../Dashboard';
import OrderInfo from '../OrderInfo';
import PaymentInfo from '../PaymentInfo';
import ConfirmationPage from '../ConfirmationPage';
import GrowJackpot from '../GrowJackpot';
import { RouteConstants } from '../../constants';

class CheckoutContainer extends Component {
  
  componentDidUpdate(prevProps) {
    if(this.props !== prevProps) {
      if (this.props.location.pathname === RouteConstants.ORDER_INFO && this.props.route === RouteConstants.PAYMENT_INFO) {//catch browser back button press on /payment page
        this.props.setRoute(RouteConstants.ORDER_INFO);
      }
    }
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

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    setRoute: CheckoutActions.setCheckoutRoute,
  },
  dispatch,
);

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutContainer);
