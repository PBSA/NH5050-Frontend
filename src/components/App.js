import React, { Component } from 'react';
import { ConnectedRouter } from 'connected-react-router/immutable';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { hot } from 'react-hot-loader/root';
import { StylesProvider } from '@material-ui/core/styles';
import Header from './Header';
import routes from '../routes';
import { RouteConstants } from '../constants';
import { NavigateActions, CheckoutActions } from '../redux/actions';
import { RouteUtil } from '../utility';
import '../assets/styles/common.scss';

class App extends Component {
  componentDidMount() {
    const isKnownPath = RouteUtil.isKnownPath(this.props.path);

    if (this.props.path === RouteConstants.DASHBOARD || this.props.path === RouteConstants.ROOT) { // check if trying to access non checkout related route
      this.props.navigate(RouteConstants.DASHBOARD);
      this.props.resetCheckout();
    } else if (this.props.path !== this.props.checkoutRoute && !this.props.path.includes('/admin')) { // check if user is in checkout flow, and tries to access unauthorized page
      this.props.navigate(this.props.checkoutRoute);
    } else if (this.props.path === RouteConstants.PAYMENT_INFO) {
      RouteUtil.paymentRedirect(this.props.paymentResponse, this.props.navigate, this.props.setRoute);
    } else if (!isKnownPath) { // user tries to access undefined route
      this.props.navigate(RouteConstants.DASHBOARD);
    }
  }

  render() {
    return (
      <ConnectedRouter history={this.props.history}>
        <StylesProvider injectFirst>
          <Header />
          {routes}
        </StylesProvider>
      </ConnectedRouter>
    );
  }
}

const mapStateToProps = (state) => ({
  path: state.getIn(['router', 'location', 'pathname']),
  checkoutRoute: state.getIn(['checkout', 'checkoutRoute']),
  paymentResponse: state.getIn(['checkout', 'ticketPurchaseResponse']),
});

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    navigate: NavigateActions.navigate,
    setRoute: CheckoutActions.setCheckoutRoute,
    resetCheckout: CheckoutActions.resetCheckout,
  },
  dispatch,
);

export default hot(connect(mapStateToProps, mapDispatchToProps)(App));
