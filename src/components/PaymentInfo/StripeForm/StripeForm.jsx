import React, { Component } from 'react';
import {FormControl, FormHelperText, Input, InputAdornment} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import {CardElement} from '@stripe/react-stripe-js';

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

  state = {
    showPassword: false,
  }

  handleClickShowPassword = () => {
    this.setState({showPassword: !this.state.showPassword});
  }

  render() {
    const {showPassword} = this.state;

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
        <div className="stripe-pw">
          <Input
            disableUnderline
            className="stripe-input"
            type={showPassword ? 'text' : 'password'}
            placeholder="Seller Password (Admin Only)"
            endAdornment={(
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={this.handleClickShowPassword}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            )}
          />
        </div>
      </FormControl>
    );
  }
}

export default StripeForm;
