import React, { Component } from 'react';
import { FormControl, FormHelperText } from '@material-ui/core';
import {
  CardElement,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  injectStripe,
  Elements,
} from 'react-stripe-elements';

const createOptions = () => ({
  style: {
    base: {
      fontSize: '16px',
      color: '#424770',
      fontFamily: 'Open Sans, sans-serif',
      letterSpacing: '0.025em',
      '::placeholder': {
        color: '#aab7c4',
      },
    },
    invalid: {
      color: '#c23d4b',
    },
  },
});

class StripeForm extends Component {
  render() {
    return (
      <FormControl onSubmit={this.props.handleSubmit}>
        <FormHelperText className="stripe-header">
          Card details
          <div className="stripe">
            <div>
              <CardNumberElement
                onChange={this.props.handleChange}
                {...createOptions()}
              />
            </div>
            <div className="stripe-expcvc">
              <CardExpiryElement
                className="stripe-expcvc-input"
                onChange={this.props.handleChange}
                {...createOptions()}
              />
              <CardCvcElement
                className="stripe-expcvc-input"
                onChange={this.props.handleChange}
                {...createOptions()}
              />
            </div>
          </div>

        </FormHelperText>
      </FormControl>
    );
  }
}

export default injectStripe(StripeForm);
