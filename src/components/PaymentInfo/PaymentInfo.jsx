import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  StripeProvider,
  Elements,
} from 'react-stripe-elements';
import StripeForm from './StripeForm';

// import { Elements, CardElement } from '@stripe/react-stripe-js';
// import { loadStripe } from '@stripe/stripe-js';


import { NavigateActions } from '../../redux/actions';
import { RouteConstants } from '../../constants';

class PaymentInfo extends Component {
  state = {
    errorMessage: '',
  };

  handleChange = ({error}) => {
    if (error) {
      this.setState({errorMessage: error.message});
    } else {
      this.setState({errorMessage: ''})
    }
  };

  handleSubmit = (evt) => {
    evt.preventDefault();
    if (this.props.stripe) {
      this.props.stripe.createToken().then(this.props.handleResult);
    } else {
      console.log("Stripe.js hasn't loaded yet.");
    }
  };

  navigateBack = () => {
    this.props.navigate(RouteConstants.ORDER_INFO);
  }

  navigateToConfirmation = () => {
    this.props.navigate(RouteConstants.CONFIRMATION_PAGE);
  }

  render() {
    return (
      <div className="payment">
        <div className="payment-error">
          {this.state.errorMessage !== '' ? <Alert severity="error">{this.state.errorMessage}</Alert> : null}
        </div>
        <span className="payment-header">Payment Info</span>

        <div className="payment-wrapper">
          <div className="payment-info">
            <StripeProvider apiKey="pk_test_12345">
              <Elements>
                <StripeForm handleResult={this.props.handleResult} handleChange={this.handleChange} handleSubmit={this.handleSubmit}/>
              </Elements>
            </StripeProvider>
          </div>
          <div className="payment-ticket">
            <p className="payment-ticket-header">$20 Ticket</p>
            <span className="payment-ticket-subtext">Gets you</span>
            <span className="payment-ticket-subtext">10 entries in the 5050 draw on May 15, 2020.</span>
            <span className="payment-ticket-subtext">And</span>
            <span className="payment-ticket-subtext">10 entries in the Progressive Jackpoint on November 11, 2020.</span>
          </div>
        </div>
        <div className="payment-buttons">
          <Button className="payment-buttons-back" onClick={this.navigateBack}>Back</Button>
          <Button className="payment-buttons-buy" onClick={this.navigateToConfirmation} endIcon={<ArrowRightAltIcon />}>Buy Now</Button>
        </div>
      </div>

    );
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    navigate: NavigateActions.navigate,
  },
  dispatch,
);

export default connect(null, mapDispatchToProps)(PaymentInfo);
