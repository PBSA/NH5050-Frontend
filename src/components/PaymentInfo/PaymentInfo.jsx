import React, { Component } from 'react';
import { Button, CardContent, Card } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import StripeForm from './StripeForm';
import ProgressBar from '../ProgressBar';

// import { Elements, CardElement } from '@stripe/react-stripe-js';
// import { loadStripe } from '@stripe/stripe-js';


import { NavigateActions } from '../../redux/actions';
import { RouteConstants } from '../../constants';

const stripePromise = loadStripe('pk_test_JJ1eMdKN0Hp4UFJ6kWXWO4ix00jtXzq5XG');
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
      <Card className="payment-card" variant="outlined">
      <CardContent>
        <ProgressBar activeStep={1}/>
        <div className="payment">
          <div className="payment-error">
            {this.state.errorMessage !== '' ? <Alert severity="error">{this.state.errorMessage}</Alert> : null}
          </div>
          <span className="payment-header">Payment Info</span>

          <div className="payment-wrapper">
            <div className="payment-info">
                <Elements stripe={stripePromise}>
                  <StripeForm handleResult={this.props.handleResult} handleChange={this.handleChange} handleSubmit={this.handleSubmit}/>
                </Elements>
            </div>
            <div className="payment-ticket">
              <p className="payment-ticket-header">$20 Ticket</p>
              <span className="payment-ticket-subtext">Gets you 10 entries in the 5050 draw on May 15, 2020. And 10 entries in the Progressive Jackpoint on November 11, 2020.</span>
            </div>
          </div>
          <div className="payment-buttons">
            <Button className="payment-buttons-back" onClick={this.navigateBack}>Back</Button>
            <Button className="payment-buttons-buy" onClick={this.navigateToConfirmation} endIcon={<ArrowRightAltIcon />}>Buy Now</Button>
          </div>
        </div>
        </CardContent>
      </Card>

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
