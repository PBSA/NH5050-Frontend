import React, { Component } from 'react';
import { FormControl, FormHelperText } from '@material-ui/core';
import {
  CardElement,
  injectStripe,
} from 'react-stripe-elements';

const createOptions = () => ({
  style: {
    base: {
      fontSize: '16px',
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
            <CardElement
              onChange={this.props.handleChange}
              {...createOptions()}
            />
          </div>
        </FormHelperText>
        <FormHelperText className="stripe-header">
          Name on Card
          <div className="stripe">
            <input className="stripe-input" placeholder="Name" />
          </div>
        </FormHelperText>
        <div className="stripe">
          <input className="stripe-input" placeholder="Seller Password (Admin Only)" />
        </div>
      </FormControl>
    );
  }
}

export default injectStripe(StripeForm);
